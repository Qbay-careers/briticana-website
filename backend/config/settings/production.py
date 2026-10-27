"""
Production settings for Briticana Django backend.
Cloud-agnostic defense-in-depth security hardening controlled via environment variables.
"""
import os
from django.core.exceptions import ImproperlyConfigured
from .base import *  # noqa: F401, F403

# 1. Force DEBUG=False in production unless explicitly overridden in a controlled staging check
DEBUG = get_bool_env("PRODUCTION_DEBUG_OVERRIDE", default=False)  # noqa: F405
if DEBUG:
    raise ImproperlyConfigured("DEBUG must be False in production.")

# 2. Enforce strong cryptographic SECRET_KEY in production
if (
    len(SECRET_KEY) < 50  # noqa: F405
    or SECRET_KEY.startswith("django-insecure-")  # noqa: F405
    or SECRET_KEY.startswith("replace-with-")  # noqa: F405
    or len(set(SECRET_KEY)) < 10  # noqa: F405
):
    raise ImproperlyConfigured(
        "Production SECRET_KEY must be at least 50 characters long with high entropy."
    )

# 3. Disallow wildcard ALLOWED_HOSTS in production
if "*" in ALLOWED_HOSTS:  # noqa: F405
    raise ImproperlyConfigured("Wildcard '*' is not permitted in production ALLOWED_HOSTS.")

# 4. Disallow PostgreSQL superuser in production
_prod_db_user = (DATABASES["default"].get("USER") or "").strip().lower()  # noqa: F405
if _prod_db_user == "postgres":
    raise ImproperlyConfigured(
        "Production database configuration must use a dedicated least-privilege PostgreSQL user, not 'postgres'."
    )

# 5. HTTPS, HSTS, Cookie & Header Hardening
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = get_bool_env("SECURE_SSL_REDIRECT", default=True)  # noqa: F405

SESSION_COOKIE_SECURE = get_bool_env("SESSION_COOKIE_SECURE", default=True)  # noqa: F405
CSRF_COOKIE_SECURE = get_bool_env("CSRF_COOKIE_SECURE", default=True)  # noqa: F405
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = get_bool_env("CSRF_COOKIE_HTTPONLY", default=False)  # noqa: F405
SESSION_COOKIE_SAMESITE = os.environ.get("SESSION_COOKIE_SAMESITE", "Lax").strip()
CSRF_COOKIE_SAMESITE = os.environ.get("CSRF_COOKIE_SAMESITE", "Lax").strip()

SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = os.environ.get("X_FRAME_OPTIONS", "DENY").strip()
SECURE_REFERRER_POLICY = os.environ.get(
    "SECURE_REFERRER_POLICY", "strict-origin-when-cross-origin"
).strip()

SECURE_HSTS_SECONDS = int(os.environ.get("SECURE_HSTS_SECONDS", "31536000"))
SECURE_HSTS_INCLUDE_SUBDOMAINS = get_bool_env("SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True)  # noqa: F405
SECURE_HSTS_PRELOAD = get_bool_env("SECURE_HSTS_PRELOAD", default=True)  # noqa: F405

# 6. Static files storage with WhiteNoise compression
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}
