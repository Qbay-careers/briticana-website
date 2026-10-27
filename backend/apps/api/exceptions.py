"""
Safe API error and exception handling for the Briticana backend.
Guarantees that API responses never leak Python tracebacks, SQL queries,
database credentials, filesystem paths, or internal settings.
"""
import logging
from django.db import DatabaseError, OperationalError
from django.http import HttpRequest, JsonResponse
from rest_framework import status
from rest_framework.exceptions import (
    AuthenticationFailed,
    MethodNotAllowed,
    NotAcceptable,
    NotAuthenticated,
    NotFound,
    ParseError,
    PermissionDenied,
    Throttled,
    UnsupportedMediaType,
    ValidationError,
)
from rest_framework.response import Response
from rest_framework.views import exception_handler

from .middleware import get_client_ip

security_logger = logging.getLogger("apps.security")
error_logger = logging.getLogger("apps.errors")


def custom_api_exception_handler(exc: Exception, context: dict) -> Response:
    """
    Custom DRF exception handler providing uniform, non-leaky JSON error responses.
    """
    request = context.get("request")
    client_ip = get_client_ip(request) if request else "unknown"
    method = getattr(request, "method", "UNKNOWN")
    path = getattr(request, "path", "unknown")

    # 1. Database operational / connectivity errors -> HTTP 503 without leaking DB details
    if isinstance(exc, (OperationalError, DatabaseError)):
        error_logger.error(
            "DATABASE_ERROR event=db_operational_error method=%s path=%s ip=%s",
            method,
            path,
            client_ip,
        )
        return Response(
            {
                "error": {
                    "code": "service_unavailable",
                    "message": "Service temporarily unavailable. Please try again later.",
                }
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    # Call DRF's default handler first to get standard status code if recognized
    response = exception_handler(exc, context)

    # 2. Unhandled server exceptions -> HTTP 500 controlled JSON (no stack trace to client)
    if response is None:
        error_logger.error(
            "INTERNAL_SERVER_ERROR event=unhandled_exception exc_type=%s method=%s path=%s ip=%s",
            type(exc).__name__,
            method,
            path,
            client_ip,
        )
        return Response(
            {
                "error": {
                    "code": "internal_error",
                    "message": "An unexpected server error occurred.",
                }
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    # 3. Map standard DRF exceptions to controlled, non-enumerating error structures
    if isinstance(exc, Throttled):
        security_logger.warning(
            "SECURITY_EVENT event=rate_limit_exceeded status=429 method=%s path=%s ip=%s",
            method,
            path,
            client_ip,
        )
        retry_after = int(exc.wait) if exc.wait else None
        error_payload = {
            "code": "rate_limit_exceeded",
            "message": "Too many requests. Please slow down and try again later.",
        }
        if retry_after is not None:
            error_payload["retry_after_seconds"] = retry_after
        response.data = {"error": error_payload}
        return response

    if isinstance(exc, (NotAuthenticated, AuthenticationFailed)):
        security_logger.warning(
            "SECURITY_EVENT event=authentication_failed status=%d method=%s path=%s ip=%s",
            response.status_code,
            method,
            path,
            client_ip,
        )
        response.data = {
            "error": {
                "code": "authentication_required",
                "message": "Authentication credentials were not provided or are invalid.",
            }
        }
        return response

    if isinstance(exc, PermissionDenied):
        security_logger.warning(
            "SECURITY_EVENT event=permission_denied status=403 method=%s path=%s ip=%s",
            method,
            path,
            client_ip,
        )
        response.data = {
            "error": {
                "code": "permission_denied",
                "message": "You do not have permission to perform this action.",
            }
        }
        return response

    if isinstance(exc, MethodNotAllowed):
        security_logger.info(
            "SECURITY_EVENT event=method_not_allowed status=405 method=%s path=%s ip=%s",
            method,
            path,
            client_ip,
        )
        response.data = {
            "error": {
                "code": "method_not_allowed",
                "message": "HTTP method not allowed for this endpoint.",
            }
        }
        return response

    if isinstance(exc, ParseError):
        security_logger.warning(
            "SECURITY_EVENT event=malformed_json_or_body status=400 method=%s path=%s ip=%s",
            method,
            path,
            client_ip,
        )
        response.data = {
            "error": {
                "code": "malformed_request",
                "message": "Malformed request body or invalid JSON payload.",
            }
        }
        return response

    if isinstance(exc, (UnsupportedMediaType, NotAcceptable)):
        response.data = {
            "error": {
                "code": "unsupported_media_type",
                "message": "Unsupported Content-Type or Accept header.",
            }
        }
        return response

    if isinstance(exc, NotFound):
        response.data = {
            "error": {
                "code": "not_found",
                "message": "The requested resource was not found.",
            }
        }
        return response

    if isinstance(exc, ValidationError):
        security_logger.info(
            "SECURITY_EVENT event=validation_failed status=400 method=%s path=%s ip=%s",
            method,
            path,
            client_ip,
        )
        response.data = {
            "error": {
                "code": "invalid_input",
                "message": "The submitted request data is invalid.",
                "details": _sanitize_validation_details(response.data),
            }
        }
        return response

    # Fallback for any other DRF APIException
    response.data = {
        "error": {
            "code": "request_error",
            "message": "Unable to process the request.",
        }
    }
    return response


def _sanitize_validation_details(data) -> dict | list:
    """Return safe field-level validation messages without echoing raw user input."""
    if isinstance(data, dict):
        cleaned = {}
        for field, messages in data.items():
            if isinstance(messages, list):
                cleaned[str(field)] = [str(m) for m in messages]
            else:
                cleaned[str(field)] = [str(messages)]
        return cleaned
    if isinstance(data, list):
        return [str(m) for m in data]
    return {"non_field_errors": ["Invalid input."]}


def csrf_failure_view(request: HttpRequest, reason: str = "") -> JsonResponse:
    """Custom CSRF failure view that returns safe JSON instead of Django's default HTML page."""
    security_logger.warning(
        "SECURITY_EVENT event=csrf_verification_failed method=%s path=%s ip=%s",
        request.method,
        request.path,
        get_client_ip(request),
    )
    return JsonResponse(
        {
            "error": {
                "code": "csrf_failed",
                "message": "CSRF verification failed. Request aborted.",
            }
        },
        status=403,
    )


def json_bad_request_view(request: HttpRequest, exception=None) -> JsonResponse:
    return JsonResponse(
        {"error": {"code": "bad_request", "message": "Bad request."}},
        status=400,
    )


def json_permission_denied_view(request: HttpRequest, exception=None) -> JsonResponse:
    return JsonResponse(
        {"error": {"code": "permission_denied", "message": "Permission denied."}},
        status=403,
    )


def json_not_found_view(request: HttpRequest, exception=None) -> JsonResponse:
    return JsonResponse(
        {"error": {"code": "not_found", "message": "Resource not found."}},
        status=404,
    )


def json_server_error_view(request: HttpRequest) -> JsonResponse:
    return JsonResponse(
        {"error": {"code": "internal_error", "message": "An unexpected server error occurred."}},
        status=500,
    )
