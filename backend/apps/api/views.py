"""
Security-hardened API Views for the Briticana Backend.
Includes:
- Public Health Check (/api/v1/health/)
- Public Certificate Verification Check (/api/v1/verification/check/)
- Custom Admin Authentication (/api/v1/admin/auth/login/, /session/, /logout/)
- Admin Certificate Verification Management (/api/v1/admin/verifications/)
- Public & Admin Internship Page Content API (/api/v1/internships/content/)
"""
import logging
from django.contrib.auth import authenticate, login, logout
from django.contrib.sessions.models import Session
from django.db import DatabaseError, OperationalError, connection
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .authentication import issue_admin_session_token
from .middleware import get_client_ip
from .models import CertificateVerification, InternshipPageContent
from .permissions import (
    IsAdminOrReadOnly,
    PublicAuthLoginPermission,
    PublicHealthPermission,
    PublicVerificationPermission,
)
from .serializers import (
    AdminCertificateVerificationSerializer,
    AdminLoginInputSerializer,
    HealthCheckSerializer,
    InternshipPageContentSerializer,
    VerificationCodeInputSerializer,
    VerificationPublicResultSerializer,
)
from .throttling import (
    HealthCheckRateThrottle,
    VerificationBurstRateThrottle,
    VerificationSustainedRateThrottle,
)

security_logger = logging.getLogger("apps.security")
error_logger = logging.getLogger("apps.errors")


def _extract_first_error_message(errors) -> str:
    """Extract a human-readable validation message from DRF serializer.errors."""
    if isinstance(errors, dict):
        for field, msgs in errors.items():
            if isinstance(msgs, list) and msgs:
                first = str(msgs[0])
                if field == "non_field_errors":
                    return first
                return f"{field}: {first}" if field not in ("code", "title", "heading", "duration") else first
            if isinstance(msgs, str):
                return msgs
    if isinstance(errors, list) and errors:
        return str(errors[0])
    return "Please check the submitted fields and try again."


class HealthCheckAPIView(APIView):
    """
    Public read-only health check endpoint (/api/v1/health/).
    Explicitly marked with PublicHealthPermission and rate-limited.
    Never exposes database credentials, hostnames, or exception messages.
    """

    permission_classes = [PublicHealthPermission]
    throttle_classes = [HealthCheckRateThrottle]
    serializer_class = HealthCheckSerializer

    def get(self, request, *args, **kwargs):
        db_status = "connected"
        http_status = status.HTTP_200_OK

        try:
            connection.ensure_connection()
        except (OperationalError, DatabaseError):
            db_status = "unavailable"
            http_status = status.HTTP_503_SERVICE_UNAVAILABLE
            error_logger.error(
                "HEALTH_CHECK_DB_FAILURE ip=%s path=%s",
                get_client_ip(request),
                request.path,
            )

        payload = {
            "status": "ok" if db_status == "connected" else "unavailable",
            "service": "briticana-backend",
            "database": db_status,
        }
        serializer = self.serializer_class(payload)
        return Response(serializer.data, status=http_status)


class VerificationSecurityCheckAPIView(APIView):
    """
    Public Certificate Verification API (/api/v1/verification/check/).
    Queries the PostgreSQL CertificateVerification model while enforcing:
    - Brute-force code guessing protection (dual-window burst + sustained rate limiting)
    - Automated scraping & DoS defense (strict payload & character validation)
    - Anti-enumeration (uniform generic failure responses)
    - SQL injection & XSS defense (strict allowlist serializer + ORM-only queries)
    - Sensitive data protection (never logs verification codes or student PII)
    """

    permission_classes = [PublicVerificationPermission]
    throttle_classes = [VerificationBurstRateThrottle, VerificationSustainedRateThrottle]
    serializer_class = VerificationCodeInputSerializer

    GENERIC_NOT_VERIFIED_RESPONSE = {
        "verified": False,
        "error": {
            "code": "verification_failed",
            "message": "Unable to verify certificate with the provided code.",
        },
    }

    GENERIC_INVALID_INPUT_RESPONSE = {
        "verified": False,
        "error": {
            "code": "invalid_verification_request",
            "message": "Invalid verification code format or request parameters.",
        },
    }

    def post(self, request, *args, **kwargs):
        return self._handle_verification_request(request, data=request.data)

    def get(self, request, *args, **kwargs):
        query_dict = {k: request.query_params.get(k) for k in request.query_params.keys()}
        return self._handle_verification_request(request, data=query_dict)

    def _handle_verification_request(self, request, data) -> Response:
        serializer = self.serializer_class(data=data)
        if not serializer.is_valid():
            # Log security event WITHOUT logging the submitted verification code
            security_logger.warning(
                "SECURITY_EVENT event=invalid_verification_input method=%s path=%s ip=%s",
                request.method,
                request.path,
                get_client_ip(request),
            )
            return Response(
                self.GENERIC_INVALID_INPUT_RESPONSE,
                status=status.HTTP_400_BAD_REQUEST,
            )

        normalized_code = serializer.validated_data["code"]

        try:
            connection.ensure_connection()
            record = CertificateVerification.objects.filter(code=normalized_code).first()
        except (OperationalError, DatabaseError):
            error_logger.error(
                "DATABASE_ERROR event=verification_db_unavailable method=%s path=%s ip=%s",
                request.method,
                request.path,
                get_client_ip(request),
            )
            return Response(
                {
                    "verified": False,
                    "error": {
                        "code": "service_unavailable",
                        "message": "Verification service is temporarily unavailable.",
                    },
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        if record is None:
            security_logger.info(
                "SECURITY_EVENT event=verification_lookup_unmatched method=%s path=%s ip=%s",
                request.method,
                request.path,
                get_client_ip(request),
            )
            return Response(
                self.GENERIC_NOT_VERIFIED_RESPONSE,
                status=status.HTTP_404_NOT_FOUND,
            )

        security_logger.info(
            "SECURITY_EVENT event=verification_lookup_matched method=%s path=%s ip=%s",
            request.method,
            request.path,
            get_client_ip(request),
        )
        public_data = VerificationPublicResultSerializer(record).data
        return Response(
            {
                "verified": True,
                "record": public_data,
            },
            status=status.HTTP_200_OK,
        )


class AdminProtectedStatusAPIView(APIView):
    """
    Restricted staff-only endpoint (/api/v1/admin/status/).
    Demonstrates and verifies that default API permissions are restrictive (IsAdminUser)
    and deny unauthenticated or non-staff requests.
    """

    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        return Response(
            {"status": "authorized", "scope": "admin"},
            status=status.HTTP_200_OK,
        )


class AdminLoginAPIView(APIView):
    """
    Custom Admin Login endpoint (/api/v1/admin/auth/login/).
    Authenticates against Django's password-hashed User model and requires is_staff=True.
    """

    permission_classes = [PublicAuthLoginPermission]
    serializer_class = AdminLoginInputSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "authenticated": False,
                    "error": {
                        "code": "invalid_login_request",
                        "message": _extract_first_error_message(serializer.errors),
                    },
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = authenticate(request, username=username, password=password)
        if user is None or not user.is_active or not user.is_staff:
            security_logger.warning(
                "SECURITY_EVENT event=admin_login_failed method=%s path=%s ip=%s",
                request.method,
                request.path,
                get_client_ip(request),
            )
            return Response(
                {
                    "authenticated": False,
                    "error": {
                        "code": "invalid_credentials",
                        "message": "Invalid administrator username or password.",
                    },
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        login(request, user)
        if not request.session.session_key:
            request.session.save()

        token = issue_admin_session_token(user, request.session.session_key)
        security_logger.info(
            "SECURITY_EVENT event=admin_login_success method=%s path=%s ip=%s",
            request.method,
            request.path,
            get_client_ip(request),
        )
        return Response(
            {
                "authenticated": True,
                "token": token,
                "user": {
                    "username": user.get_username(),
                    "isStaff": user.is_staff,
                },
            },
            status=status.HTTP_200_OK,
        )


class AdminSessionAPIView(APIView):
    """
    Checks whether the current administrator session/token is authenticated (/api/v1/admin/auth/session/).
    """

    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        return Response(
            {
                "authenticated": True,
                "user": {
                    "username": request.user.get_username(),
                    "isStaff": request.user.is_staff,
                },
            },
            status=status.HTTP_200_OK,
        )


class AdminLogoutAPIView(APIView):
    """
    Logs out the current administrator and revokes their server-side session (/api/v1/admin/auth/logout/).
    """

    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        if isinstance(request.auth, dict):
            sid = request.auth.get("sid")
            if sid:
                Session.objects.filter(session_key=sid).delete()
        logout(request)
        security_logger.info(
            "SECURITY_EVENT event=admin_logout method=%s path=%s ip=%s",
            request.method,
            request.path,
            get_client_ip(request),
        )
        return Response(
            {
                "authenticated": False,
                "message": "Logged out successfully.",
            },
            status=status.HTTP_200_OK,
        )


class AdminVerificationListCreateAPIView(APIView):
    """
    Protected Admin API for listing, searching, and adding CertificateVerification
    records in PostgreSQL (/api/v1/admin/verifications/).
    """

    permission_classes = [IsAdminUser]
    serializer_class = AdminCertificateVerificationSerializer

    def get(self, request, *args, **kwargs):
        search = (request.query_params.get("search") or "").strip()
        queryset = CertificateVerification.objects.all().order_by("code")
        if search:
            queryset = queryset.filter(
                Q(code__icontains=search)
                | Q(student_name__icontains=search)
                | Q(domain__icontains=search)
            )
        serializer = self.serializer_class(queryset, many=True)
        return Response(
            {
                "count": len(serializer.data),
                "results": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "error": {
                        "code": "validation_error",
                        "message": _extract_first_error_message(serializer.errors),
                        "fields": serializer.errors,
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        record = serializer.save()
        security_logger.info(
            "SECURITY_EVENT event=admin_verification_created id=%s ip=%s",
            record.pk,
            get_client_ip(request),
        )
        return Response(
            {
                "message": "Verification record added and saved to PostgreSQL.",
                "record": self.serializer_class(record).data,
            },
            status=status.HTTP_201_CREATED,
        )


class AdminVerificationDetailAPIView(APIView):
    """
    Protected Admin API for viewing, updating, and deleting an existing CertificateVerification
    record in PostgreSQL (/api/v1/admin/verifications/<int:pk>/).
    """

    permission_classes = [IsAdminUser]
    serializer_class = AdminCertificateVerificationSerializer

    def _get_object(self, pk: int):
        return CertificateVerification.objects.filter(pk=pk).first()

    def get(self, request, pk: int, *args, **kwargs):
        record = self._get_object(pk)
        if record is None:
            return Response(
                {
                    "error": {
                        "code": "not_found",
                        "message": "Verification record not found.",
                    }
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(
            {"record": self.serializer_class(record).data},
            status=status.HTTP_200_OK,
        )

    def put(self, request, pk: int, *args, **kwargs):
        return self._update(request, pk, partial=False)

    def patch(self, request, pk: int, *args, **kwargs):
        return self._update(request, pk, partial=True)

    def delete(self, request, pk: int, *args, **kwargs):
        record = self._get_object(pk)
        if record is None:
            return Response(
                {
                    "error": {
                        "code": "not_found",
                        "message": "Verification record not found.",
                    }
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        deleted_id = record.pk
        deleted_code = record.code
        deleted_student = record.student_name
        record.delete()

        security_logger.info(
            "SECURITY_EVENT event=admin_verification_deleted id=%s ip=%s",
            deleted_id,
            get_client_ip(request),
        )
        return Response(
            {
                "deleted": True,
                "id": deleted_id,
                "code": deleted_code,
                "message": f"Verification record {deleted_code} ({deleted_student}) deleted from PostgreSQL.",
            },
            status=status.HTTP_200_OK,
        )

    def _update(self, request, pk: int, partial: bool) -> Response:
        record = self._get_object(pk)
        if record is None:
            return Response(
                {
                    "error": {
                        "code": "not_found",
                        "message": "Verification record not found.",
                    }
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.serializer_class(record, data=request.data, partial=partial)
        if not serializer.is_valid():
            return Response(
                {
                    "error": {
                        "code": "validation_error",
                        "message": _extract_first_error_message(serializer.errors),
                        "fields": serializer.errors,
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        updated = serializer.save()
        security_logger.info(
            "SECURITY_EVENT event=admin_verification_updated id=%s ip=%s",
            updated.pk,
            get_client_ip(request),
        )
        return Response(
            {
                "message": "Verification record updated in PostgreSQL.",
                "record": self.serializer_class(updated).data,
            },
            status=status.HTTP_200_OK,
        )


class InternshipContentListAPIView(APIView):
    """
    Lists published InternshipPageContent records from PostgreSQL (/api/v1/internships/content/).
    - Public users: read-only (GET/HEAD/OPTIONS).
    - Non-admin write attempts are rejected with 401/403.
    """

    permission_classes = [IsAdminOrReadOnly]
    serializer_class = InternshipPageContentSerializer

    def get(self, request, *args, **kwargs):
        page_type = (request.query_params.get("page_type") or "").strip()
        page_key = (request.query_params.get("page_key") or "").strip()
        search = (request.query_params.get("search") or "").strip()

        queryset = InternshipPageContent.objects.all().order_by("page_type", "title")
        if page_type:
            queryset = queryset.filter(page_type=page_type)
        if page_key:
            queryset = queryset.filter(page_key=page_key)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search)
                | Q(heading__icontains=search)
                | Q(page_key__icontains=search)
                | Q(domain_title__icontains=search)
            )

        serializer = self.serializer_class(queryset, many=True)
        return Response(
            {
                "count": len(serializer.data),
                "results": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class InternshipContentDetailAPIView(APIView):
    """
    Retrieves or updates a specific InternshipPageContent record by `page_key`
    (/api/v1/internships/content/<str:page_key>/).
    - GET: Publicly readable so `/internships` and `/internships/[slug]` always load
      the latest saved PostgreSQL content.
    - PUT / PATCH: Restricted strictly to authenticated staff administrators (`IsAdminOrReadOnly`).
    """

    permission_classes = [IsAdminOrReadOnly]
    serializer_class = InternshipPageContentSerializer

    def _get_object(self, page_key: str):
        return InternshipPageContent.objects.filter(page_key=page_key).first()

    def get(self, request, page_key: str, *args, **kwargs):
        content = self._get_object(page_key)
        if content is None:
            return Response(
                {
                    "error": {
                        "code": "not_found",
                        "message": "Internship page content not found.",
                    }
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(
            {"content": self.serializer_class(content).data},
            status=status.HTTP_200_OK,
        )

    def put(self, request, page_key: str, *args, **kwargs):
        return self._update(request, page_key, partial=False)

    def patch(self, request, page_key: str, *args, **kwargs):
        return self._update(request, page_key, partial=True)

    def _update(self, request, page_key: str, partial: bool) -> Response:
        content = self._get_object(page_key)
        if content is None:
            return Response(
                {
                    "error": {
                        "code": "not_found",
                        "message": "Internship page content not found.",
                    }
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.serializer_class(content, data=request.data, partial=partial)
        if not serializer.is_valid():
            return Response(
                {
                    "error": {
                        "code": "validation_error",
                        "message": _extract_first_error_message(serializer.errors),
                        "fields": serializer.errors,
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        updated = serializer.save()
        security_logger.info(
            "SECURITY_EVENT event=admin_internship_content_updated page_key=%s ip=%s",
            updated.page_key,
            get_client_ip(request),
        )
        return Response(
            {
                "message": "Internship page content saved to PostgreSQL.",
                "content": self.serializer_class(updated).data,
            },
            status=status.HTTP_200_OK,
        )
