"""
Local development settings for Briticana Django backend.
Preserves full API security, validation, CORS allowlisting, CSRF protection,
and rate limiting while avoiding HTTPS/HSTS locks that would break local HTTP development.
"""
from .base import *  # noqa: F401, F403

# Keep local HTTP development functional without browser HSTS pinning
SECURE_SSL_REDIRECT = get_bool_env("LOCAL_SSL_REDIRECT", default=False)  # noqa: F405
SESSION_COOKIE_SECURE = get_bool_env("LOCAL_SESSION_COOKIE_SECURE", default=False)  # noqa: F405
CSRF_COOKIE_SECURE = get_bool_env("LOCAL_CSRF_COOKIE_SECURE", default=False)  # noqa: F405
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False

# Only enable the HTML Browsable API if explicitly requested in local dev
if DEBUG and get_bool_env("ENABLE_BROWSABLE_API", default=False):  # noqa: F405
    REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = [  # noqa: F405
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ]
