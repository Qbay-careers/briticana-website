"""
DRF Rate Limiting and Throttling classes for the Briticana backend.
Protects public endpoints (especially certificate verification) against
brute-force guessing, enumeration, scraping, and DoS abuse.
"""
import logging
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

from .middleware import get_client_ip

security_logger = logging.getLogger("apps.security")


class AnonAPIRateThrottle(AnonRateThrottle):
    """General anonymous API rate limit (controlled via THROTTLE_RATE_ANON)."""

    scope = "anon"


class UserAPIRateThrottle(UserRateThrottle):
    """General authenticated user rate limit (controlled via THROTTLE_RATE_USER)."""

    scope = "user"


class HealthCheckRateThrottle(AnonRateThrottle):
    """Dedicated rate limit for the public health endpoint."""

    scope = "health"


class VerificationBurstRateThrottle(AnonRateThrottle):
    """
    Strict short-window rate limit for certificate verification attempts
    (5/min per IP) to stop rapid automated brute-force guessing.
    """

    scope = "verification_burst"

    def allow_request(self, request, view) -> bool:
        if request.method in ("OPTIONS", "HEAD"):
            return True
        allowed = super().allow_request(request, view)
        if not allowed:
            security_logger.warning(
                "SECURITY_EVENT event=excessive_verification_attempts_burst ip=%s path=%s",
                get_client_ip(request),
                request.path,
            )
        return allowed


class VerificationSustainedRateThrottle(AnonRateThrottle):
    """
    Sustained hourly rate limit for certificate verification attempts
    (20/hour per IP) to deter slow enumeration and scraping.
    """

    scope = "verification_sustained"

    def allow_request(self, request, view) -> bool:
        if request.method in ("OPTIONS", "HEAD"):
            return True
        allowed = super().allow_request(request, view)
        if not allowed:
            security_logger.warning(
                "SECURITY_EVENT event=excessive_verification_attempts_sustained ip=%s path=%s",
                get_client_ip(request),
                request.path,
            )
        return allowed
