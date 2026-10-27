"""
Base Django settings for the Briticana backend.
Shared defense-in-depth configuration across local development and production environments.
All secrets and environment-specific settings are read exclusively from environment variables.
"""
import os
from pathlib import Path
import dj_database_url
from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load environment variables from backend/.env if present
load_dotenv(BASE_DIR / ".env")


def get_bool_env(name: str, default: bool = False) -> bool:
    """Parse a boolean environment variable safely."""
    raw = os.environ.get(name)
    if raw is None:
        return default
    return raw.strip().lower() in ("true", "1", "yes", "on")


def get_list_env(name: str, default: str = "") -> list[str]:
    """Parse a comma-separated environment variable into a clean list."""
    raw = os.environ.get(name, default)
    return [item.strip() for item in raw.split(",") if item.strip()]


# ============================================================================
# 1. CORE SECURITY SETTINGS (Controlled via Environment Variables)
# ============================================================================
SECRET_KEY = (os.environ.get("SECRET_KEY") or os.environ.get("DJANGO_SECRET_KEY") or "").strip()
if not SECRET_KEY:
    raise ImproperlyConfigured("The SECRET_KEY environment variable is required and must not be empty.")

DEBUG = get_bool_env("DEBUG", default=False)

ALLOWED_HOSTS = get_list_env("ALLOWED_HOSTS", default="localhost,127.0.0.1")
if not ALLOWED_HOSTS:
    raise ImproperlyConfigured("ALLOWED_HOSTS must contain at least one hostname.")

# ============================================================================
# 2. APPLICATION & MIDDLEWARE DEFINITION
# ============================================================================
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party apps
    "corsheaders",
    "rest_framework",
    # Local apps
    "apps.api.apps.ApiConfig",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "apps.api.middleware.APISecurityHardeningMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# ============================================================================
# 3. DATABASE SECURITY CONFIGURATION (PostgreSQL via Environment Variables)
# ============================================================================
# Credentials are NEVER hardcoded. Uses least-privilege application DB user.
DATABASE_URL = os.environ.get("DATABASE_URL", "").strip()
DB_CONN_MAX_AGE = int(os.environ.get("DB_CONN_MAX_AGE", "600"))

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=DB_CONN_MAX_AGE,
            conn_health_checks=True,
        ),
    }
else:
    db_name = os.environ.get("DB_NAME", "").strip()
    db_user = os.environ.get("DB_USER", "").strip()
    db_password = os.environ.get("DB_PASSWORD", "")
    db_host = os.environ.get("DB_HOST", "").strip()
    db_port = os.environ.get("DB_PORT", "").strip()

    if not all([db_name, db_user, db_host, db_port]):
        raise ImproperlyConfigured(
            "PostgreSQL environment variables (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT) must be configured."
        )

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": db_name,
            "USER": db_user,
            "PASSWORD": db_password,
            "HOST": db_host,
            "PORT": db_port,
            "CONN_MAX_AGE": DB_CONN_MAX_AGE,
            "CONN_HEALTH_CHECKS": True,
            "OPTIONS": {
                "connect_timeout": 5,
                "sslmode": os.environ.get("DB_SSLMODE", "prefer"),
            },
        }
    }

# ============================================================================
# 4. PASSWORD VALIDATION & AUTHENTICATION
# ============================================================================
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {"min_length": 12},
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# ============================================================================
# 5. COOKIE, SESSION, CSRF & HTTP HEADER SECURITY
# ============================================================================
# Cookie & Session flags (controlled via environment variables, enforced True in production.py)
SECURE_SSL_REDIRECT = get_bool_env("SECURE_SSL_REDIRECT", default=False)
SESSION_COOKIE_SECURE = get_bool_env("SESSION_COOKIE_SECURE", default=False)
CSRF_COOKIE_SECURE = get_bool_env("CSRF_COOKIE_SECURE", default=False)

SESSION_COOKIE_HTTPONLY = get_bool_env("SESSION_COOKIE_HTTPONLY", default=True)
# Note: CSRF_COOKIE_HTTPONLY defaults to False when frontend JS reads csrftoken cookie directly,
# or can be set to True via env when CSRF tokens are read from a dedicated endpoint/header.
CSRF_COOKIE_HTTPONLY = get_bool_env("CSRF_COOKIE_HTTPONLY", default=False)

SESSION_COOKIE_SAMESITE = os.environ.get("SESSION_COOKIE_SAMESITE", "Lax").strip()
CSRF_COOKIE_SAMESITE = os.environ.get("CSRF_COOKIE_SAMESITE", "Lax").strip()
SESSION_COOKIE_AGE = int(os.environ.get("SESSION_COOKIE_AGE", "28800"))  # 8 hours

# Browser / Header Hardening
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = os.environ.get("X_FRAME_OPTIONS", "DENY").strip()
SECURE_REFERRER_POLICY = os.environ.get(
    "SECURE_REFERRER_POLICY", "strict-origin-when-cross-origin"
).strip()
SECURE_CROSS_ORIGIN_OPENER_POLICY = os.environ.get(
    "SECURE_CROSS_ORIGIN_OPENER_POLICY", "same-origin"
).strip()

# HSTS settings (0 in local HTTP development so localhost is not pinned to HTTPS;
# enforced to 31536000 in production.py)
SECURE_HSTS_SECONDS = int(os.environ.get("SECURE_HSTS_SECONDS", "0"))
SECURE_HSTS_INCLUDE_SUBDOMAINS = get_bool_env("SECURE_HSTS_INCLUDE_SUBDOMAINS", default=False)
SECURE_HSTS_PRELOAD = get_bool_env("SECURE_HSTS_PRELOAD", default=False)

# ============================================================================
# 6. CORS & CSRF ALLOWLIST CONFIGURATION
# ============================================================================
# NEVER allow all origins. Explicit allowlist only.
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = get_list_env(
    "CORS_ALLOWED_ORIGINS",
    default="http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173",
)
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
    "HEAD",
]
CORS_ALLOW_HEADERS = [
    "accept",
    "authorization",
    "content-type",
    "origin",
    "x-csrftoken",
    "x-requested-with",
]
CORS_PREFLIGHT_MAX_AGE = 86400

CSRF_TRUSTED_ORIGINS = get_list_env(
    "CSRF_TRUSTED_ORIGINS",
    default="http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173",
)
CSRF_FAILURE_VIEW = "apps.api.exceptions.csrf_failure_view"

# ============================================================================
# 7. REQUEST PAYLOAD & UPLOAD PROTECTION LIMITS
# ============================================================================
# Limit JSON/form request bodies to 64 KB by default to prevent memory exhaustion DoS
MAX_API_REQUEST_BODY_BYTES = int(os.environ.get("MAX_API_REQUEST_BODY_BYTES", "65536"))
DATA_UPLOAD_MAX_MEMORY_SIZE = int(os.environ.get("DATA_UPLOAD_MAX_MEMORY_SIZE", "65536"))
DATA_UPLOAD_MAX_NUMBER_FIELDS = int(os.environ.get("DATA_UPLOAD_MAX_NUMBER_FIELDS", "100"))
FILE_UPLOAD_MAX_MEMORY_SIZE = int(os.environ.get("FILE_UPLOAD_MAX_MEMORY_SIZE", "2621440"))
FILE_UPLOAD_PERMISSIONS = 0o640

# ============================================================================
# 8. DJANGO REST FRAMEWORK SECURITY CONFIGURATION
# ============================================================================
REST_FRAMEWORK = {
    # Restrictive by default: every public endpoint must explicitly declare a scoped permission class
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAdminUser",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "apps.api.authentication.AdminSessionTokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    # JSONRenderer only by default to prevent accidental HTML template exposure
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    # Strict JSONParser by default; multipart/form parsers must be explicitly enabled per view
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
    ],
    # Global and scoped rate limiting
    "DEFAULT_THROTTLE_CLASSES": [
        "apps.api.throttling.AnonAPIRateThrottle",
        "apps.api.throttling.UserAPIRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": os.environ.get("THROTTLE_RATE_ANON", "60/min"),
        "user": os.environ.get("THROTTLE_RATE_USER", "300/min"),
        "health": os.environ.get("THROTTLE_RATE_HEALTH", "30/min"),
        "verification_burst": os.environ.get("THROTTLE_RATE_VERIFICATION_BURST", "5/min"),
        "verification_sustained": os.environ.get("THROTTLE_RATE_VERIFICATION_SUSTAINED", "20/hour"),
    },
    # Bounded pagination to prevent unbounded database queries
    "DEFAULT_PAGINATION_CLASS": "apps.api.pagination.StandardBoundedPagination",
    "PAGE_SIZE": 20,
    # Safe custom exception handler that never exposes tracebacks or DB internals
    "EXCEPTION_HANDLER": "apps.api.exceptions.custom_api_exception_handler",
    # Disable URL format suffixes (e.g. .api, .html)
    "URL_FORMAT_OVERRIDE": None,
}

# ============================================================================
# 9. INTERNATIONALIZATION, STATIC & MEDIA FILES
# ============================================================================
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATIC_ROOT.mkdir(parents=True, exist_ok=True)

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ============================================================================
# 10. STRUCTURED & REDACTED SECURITY LOGGING
# ============================================================================
LOG_DIR = BASE_DIR / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "redact_sensitive": {
            "()": "apps.api.logging_filters.SensitiveDataRedactionFilter",
        },
    },
    "formatters": {
        "security_structured": {
            "format": "{asctime} [{levelname}] {name}: {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "filters": ["redact_sensitive"],
            "formatter": "security_structured",
        },
        "security_file": {
            "level": "INFO",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": str(LOG_DIR / "security.log"),
            "maxBytes": 5 * 1024 * 1024,  # 5 MB per file
            "backupCount": 5,
            "encoding": "utf-8",
            "filters": ["redact_sensitive"],
            "formatter": "security_structured",
        },
    },
    "loggers": {
        "apps.security": {
            "handlers": ["console", "security_file"],
            "level": "INFO",
            "propagate": False,
        },
        "apps.errors": {
            "handlers": ["console", "security_file"],
            "level": "ERROR",
            "propagate": False,
        },
        "django.security": {
            "handlers": ["console", "security_file"],
            "level": "WARNING",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["console", "security_file"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}
