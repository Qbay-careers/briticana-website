"""
Security hardening middleware for the Briticana API.
Enforces strict request payload size limits and applies defense-in-depth HTTP headers.
"""
import logging
from django.conf import settings
from django.core.exceptions import RequestDataTooBig, TooManyFieldsSent
from django.http import HttpRequest, HttpResponse, JsonResponse

security_logger = logging.getLogger("apps.security")


def get_client_ip(request: HttpRequest) -> str:
    """Extract client IP address safely."""
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "unknown")


class APISecurityHardeningMiddleware:
    """
    1. Rejects oversized request bodies on /api/ endpoints with HTTP 413 JSON before parsing.
    2. Catches RequestDataTooBig / TooManyFieldsSent safely without leaking tracebacks.
    3. Attaches strict HTTP security headers to all responses.
    """

    def __init__(self, get_response):
        self.get_response = get_response
        self.max_body_bytes = int(getattr(settings, "MAX_API_REQUEST_BODY_BYTES", 65536))

    def __call__(self, request: HttpRequest) -> HttpResponse:
        is_api_request = request.path.startswith("/api/")

        if is_api_request:
            # 1. Check Content-Length header early
            content_length_raw = request.META.get("CONTENT_LENGTH")
            if content_length_raw:
                try:
                    content_length = int(content_length_raw)
                except (TypeError, ValueError):
                    security_logger.warning(
                        "SECURITY_EVENT event=malformed_content_length method=%s path=%s ip=%s",
                        request.method,
                        request.path,
                        get_client_ip(request),
                    )
                    response = JsonResponse(
                        {
                            "error": {
                                "code": "invalid_request",
                                "message": "Invalid Content-Length header.",
                            }
                        },
                        status=400,
                    )
                    return self._apply_security_headers(request, response)

                if content_length > self.max_body_bytes:
                    security_logger.warning(
                        "SECURITY_EVENT event=payload_too_large size=%d limit=%d method=%s path=%s ip=%s",
                        content_length,
                        self.max_body_bytes,
                        request.method,
                        request.path,
                        get_client_ip(request),
                    )
                    response = JsonResponse(
                        {
                            "error": {
                                "code": "payload_too_large",
                                "message": "Request payload exceeds the maximum allowed size.",
                            }
                        },
                        status=413,
                    )
                    return self._apply_security_headers(request, response)

            # 2. Check actual body bytes in case Transfer-Encoding or missing Content-Length is used
            try:
                if request.method in ("POST", "PUT", "PATCH") and len(request.body) > self.max_body_bytes:
                    security_logger.warning(
                        "SECURITY_EVENT event=payload_too_large_body limit=%d method=%s path=%s ip=%s",
                        self.max_body_bytes,
                        request.method,
                        request.path,
                        get_client_ip(request),
                    )
                    response = JsonResponse(
                        {
                            "error": {
                                "code": "payload_too_large",
                                "message": "Request payload exceeds the maximum allowed size.",
                            }
                        },
                        status=413,
                    )
                    return self._apply_security_headers(request, response)
            except RequestDataTooBig:
                security_logger.warning(
                    "SECURITY_EVENT event=request_data_too_big limit=%d method=%s path=%s ip=%s",
                    self.max_body_bytes,
                    request.method,
                    request.path,
                    get_client_ip(request),
                )
                response = JsonResponse(
                    {
                        "error": {
                            "code": "payload_too_large",
                            "message": "Request payload exceeds the maximum allowed size.",
                        }
                    },
                    status=413,
                )
                return self._apply_security_headers(request, response)
            except TooManyFieldsSent:
                security_logger.warning(
                    "SECURITY_EVENT event=too_many_fields method=%s path=%s ip=%s",
                    request.method,
                    request.path,
                    get_client_ip(request),
                )
                response = JsonResponse(
                    {
                        "error": {
                            "code": "too_many_fields",
                            "message": "Request contains too many fields.",
                        }
                    },
                    status=400,
                )
                return self._apply_security_headers(request, response)

        response = self.get_response(request)
        return self._apply_security_headers(request, response)

    def process_exception(self, request: HttpRequest, exception: Exception):
        """Handle Django upload size / field limit exceptions before default HTML handlers run."""
        if isinstance(exception, RequestDataTooBig):
            security_logger.warning(
                "SECURITY_EVENT event=request_data_too_big method=%s path=%s ip=%s",
                request.method,
                request.path,
                get_client_ip(request),
            )
            response = JsonResponse(
                {
                    "error": {
                        "code": "payload_too_large",
                        "message": "Request payload exceeds the maximum allowed size.",
                    }
                },
                status=413,
            )
            return self._apply_security_headers(request, response)

        if isinstance(exception, TooManyFieldsSent):
            security_logger.warning(
                "SECURITY_EVENT event=too_many_fields method=%s path=%s ip=%s",
                request.method,
                request.path,
                get_client_ip(request),
            )
            response = JsonResponse(
                {
                    "error": {
                        "code": "too_many_fields",
                        "message": "Request contains too many fields.",
                    }
                },
                status=400,
            )
            return self._apply_security_headers(request, response)

        return None

    def _apply_security_headers(self, request: HttpRequest, response: HttpResponse) -> HttpResponse:
        """Attach defense-in-depth HTTP security headers."""
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", getattr(settings, "X_FRAME_OPTIONS", "DENY"))
        response.headers.setdefault(
            "Referrer-Policy",
            getattr(settings, "SECURE_REFERRER_POLICY", "strict-origin-when-cross-origin"),
        )
        response.headers.setdefault(
            "Permissions-Policy",
            "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
        )

        # Apply strict API-specific CSP and cache control on /api/ endpoints
        if request.path.startswith("/api/"):
            response.headers.setdefault(
                "Content-Security-Policy",
                "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
            )
            response.headers.setdefault("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            response.headers.setdefault("Pragma", "no-cache")

        return response
