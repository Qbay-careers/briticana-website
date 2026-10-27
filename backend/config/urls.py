"""
URL configuration for Briticana backend project.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(("apps.api.urls", "api"), namespace="api")),
    path("api/v1/", include(("apps.api.urls", "api"), namespace="api_v1")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Safe JSON error handlers for root-level 400, 403, 404, and 500 errors
handler400 = "apps.api.exceptions.json_bad_request_view"
handler403 = "apps.api.exceptions.json_permission_denied_view"
handler404 = "apps.api.exceptions.json_not_found_view"
handler500 = "apps.api.exceptions.json_server_error_view"
