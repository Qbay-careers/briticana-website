"""
Explicit DRF Permission classes for the Briticana API.
Default global permission is restrictive (IsAdminUser).
Every public endpoint must explicitly declare one of the scoped permission classes below.
"""
from rest_framework.permissions import BasePermission, SAFE_METHODS


class PublicHealthPermission(BasePermission):
    """
    Explicitly marks the health check endpoint as publicly readable (GET, HEAD, OPTIONS only).
    Denies all write methods (POST, PUT, PATCH, DELETE).
    """

    def has_permission(self, request, view) -> bool:
        return request.method in SAFE_METHODS


class PublicVerificationPermission(BasePermission):
    """
    Explicitly marks the certificate verification check endpoint as public
    for verification code submission (POST, GET, HEAD, OPTIONS only).
    Denies modification/deletion methods (PUT, PATCH, DELETE).
    """

    ALLOWED_METHODS = ("GET", "POST", "HEAD", "OPTIONS")

    def has_permission(self, request, view) -> bool:
        return request.method in self.ALLOWED_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    Allows public read-only access (GET, HEAD, OPTIONS) when explicitly attached to a view,
    and restricts write operations to authenticated staff/admin users.
    """

    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class PublicAuthLoginPermission(BasePermission):
    """
    Allows POST/OPTIONS/HEAD requests to the admin login endpoint so an
    administrator can exchange credentials for an authenticated session.
    """

    ALLOWED_METHODS = ("POST", "OPTIONS", "HEAD")

    def has_permission(self, request, view) -> bool:
        return request.method in self.ALLOWED_METHODS

