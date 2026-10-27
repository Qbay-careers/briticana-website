"""
URL configuration for apps.api.
"""
from django.urls import path
from .views import (
    AdminLoginAPIView,
    AdminLogoutAPIView,
    AdminProtectedStatusAPIView,
    AdminSessionAPIView,
    AdminVerificationDetailAPIView,
    AdminVerificationListCreateAPIView,
    HealthCheckAPIView,
    InternshipContentDetailAPIView,
    InternshipContentListAPIView,
    VerificationSecurityCheckAPIView,
)

app_name = "api"

urlpatterns = [
    path("health/", HealthCheckAPIView.as_view(), name="health-check"),
    path(
        "verification/check/",
        VerificationSecurityCheckAPIView.as_view(),
        name="verification-check",
    ),
    path(
        "admin/status/",
        AdminProtectedStatusAPIView.as_view(),
        name="admin-status",
    ),
    # Custom Admin Authentication Endpoints
    path(
        "admin/auth/login/",
        AdminLoginAPIView.as_view(),
        name="admin-auth-login",
    ),
    path(
        "admin/auth/session/",
        AdminSessionAPIView.as_view(),
        name="admin-auth-session",
    ),
    path(
        "admin/auth/logout/",
        AdminLogoutAPIView.as_view(),
        name="admin-auth-logout",
    ),
    # Admin Certificate Verification Management Endpoints
    path(
        "admin/verifications/",
        AdminVerificationListCreateAPIView.as_view(),
        name="admin-verifications",
    ),
    path(
        "admin/verifications/<int:pk>/",
        AdminVerificationDetailAPIView.as_view(),
        name="admin-verification-detail",
    ),
    # Public & Admin Internship Page Content Endpoints
    path(
        "internships/content/",
        InternshipContentListAPIView.as_view(),
        name="internships-content-list",
    ),
    path(
        "internships/content/<str:page_key>/",
        InternshipContentDetailAPIView.as_view(),
        name="internships-content-detail",
    ),
]
