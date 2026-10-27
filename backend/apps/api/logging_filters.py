"""
Security logging filters and formatters for the Briticana backend.
Ensures sensitive values (passwords, secrets, tokens, verification codes, PII)
are redacted before log records are emitted.
"""
import logging
import re
from typing import Any

# Keys whose values must always be redacted in structured log dictionaries
SENSITIVE_KEY_NAMES = frozenset(
    {
        "password",
        "passwd",
        "db_password",
        "secret",
        "secret_key",
        "django_secret_key",
        "token",
        "access_token",
        "refresh_token",
        "csrfmiddlewaretoken",
        "x-csrftoken",
        "authorization",
        "cookie",
        "set-cookie",
        "api_key",
        "private_key",
        "code",
        "verification_code",
        "email",
        "phone",
        "phone_number",
        "resume",
        "cv",
    }
)

# Regex patterns scrubbed from free-text log messages
SENSITIVE_TEXT_PATTERNS = (
    # Briticana verification codes (e.g. BRT-2026-884)
    (re.compile(r"\bBRT-[A-Z0-9-]{2,28}\b", re.IGNORECASE), "[REDACTED_CODE]"),
    # Bearer / Basic / Token Authorization headers
    (
        re.compile(r"\b(Bearer|Basic|Token)\s+[A-Za-z0-9._~+/=-]+\b", re.IGNORECASE),
        r"\1 [REDACTED_TOKEN]",
    ),
    # Database connection URLs containing credentials
    (
        re.compile(r"(postgres(?:ql)?://[^:\s]+:)([^@\s]+)(@)", re.IGNORECASE),
        r"\1[REDACTED_DB_PASSWORD]\3",
    ),
    # Key=value pairs for secrets/passwords/codes
    (
        re.compile(
            r"(?i)\b(password|passwd|secret|secret_key|token|api_key|verification_code|code)\s*([:=])\s*([^\s,;\"']+)"
        ),
        r"\1\2[REDACTED]",
    ),
    # Email addresses in log strings
    (
        re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"),
        "[REDACTED_EMAIL]",
    ),
)


def scrub_string(value: str) -> str:
    """Redact sensitive patterns from a string."""
    scrubbed = value
    for pattern, replacement in SENSITIVE_TEXT_PATTERNS:
        scrubbed = pattern.sub(replacement, scrubbed)
    return scrubbed


def scrub_value(value: Any) -> Any:
    """Recursively redact sensitive keys and string patterns in dicts/lists/tuples."""
    if isinstance(value, str):
        return scrub_string(value)
    if isinstance(value, dict):
        sanitized = {}
        for k, v in value.items():
            key_lower = str(k).strip().lower()
            if key_lower in SENSITIVE_KEY_NAMES or "password" in key_lower or "secret" in key_lower or "token" in key_lower:
                sanitized[k] = "[REDACTED]"
            else:
                sanitized[k] = scrub_value(v)
        return sanitized
    if isinstance(value, list):
        return [scrub_value(item) for item in value]
    if isinstance(value, tuple):
        return tuple(scrub_value(item) for item in value)
    return value


class SensitiveDataRedactionFilter(logging.Filter):
    """
    Logging filter that scrubs passwords, tokens, database credentials,
    verification codes, and personal information from all log records.
    """

    def filter(self, record: logging.LogRecord) -> bool:
        if isinstance(record.msg, str):
            record.msg = scrub_string(record.msg)
        if record.args:
            record.args = scrub_value(record.args)
        # Clear exc_info traceback objects from security/public log formatters if flagged
        if getattr(record, "suppress_traceback", False):
            record.exc_info = None
            record.exc_text = None
        return True
