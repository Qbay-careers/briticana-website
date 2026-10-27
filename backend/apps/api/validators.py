"""
Strict input validation utilities for the Briticana API.
Protects against malformed inputs, oversized strings, XSS markers,
SQL injection payloads, and control-character injection.
"""
import re
from rest_framework import serializers

MIN_VERIFICATION_CODE_LENGTH = 3
MAX_VERIFICATION_CODE_LENGTH = 32

# Strict character allowlist: uppercase letters, digits, and single internal hyphens
# Matches Briticana certificate codes such as BRT-2026-884
VERIFICATION_CODE_ALLOWLIST_REGEX = re.compile(r"^[A-Z0-9]+(?:-[A-Z0-9]+)*$")

# Disallowed control characters (ASCII 0-31 except \t, \n, \r, plus DEL 127)
CONTROL_CHAR_REGEX = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")

# Dangerous HTML / XSS patterns rejected in plain text API fields
XSS_DANGER_REGEX = re.compile(
    r"(<\s*/?\s*(script|iframe|object|embed|svg|img|style|link|meta)\b|javascript\s*:|vbscript\s*:|on\w+\s*=)",
    re.IGNORECASE,
)


def validate_verification_code_format(value: str) -> str:
    """
    Validate and normalize a certificate verification code.
    Enforces:
    - Non-empty string
    - Length between MIN_VERIFICATION_CODE_LENGTH (3) and MAX_VERIFICATION_CODE_LENGTH (32)
    - Strict allowlist of uppercase alphanumeric characters and single internal hyphens
    """
    if not isinstance(value, str):
        raise serializers.ValidationError("Verification code must be a string.")

    if "\x00" in value or CONTROL_CHAR_REGEX.search(value):
        raise serializers.ValidationError("Verification code contains invalid characters.")

    normalized = value.strip().upper()
    if not normalized:
        raise serializers.ValidationError("Verification code cannot be empty.")

    if len(normalized) < MIN_VERIFICATION_CODE_LENGTH:
        raise serializers.ValidationError(
            f"Verification code must be at least {MIN_VERIFICATION_CODE_LENGTH} characters."
        )

    if len(normalized) > MAX_VERIFICATION_CODE_LENGTH:
        raise serializers.ValidationError(
            f"Verification code must not exceed {MAX_VERIFICATION_CODE_LENGTH} characters."
        )

    if not VERIFICATION_CODE_ALLOWLIST_REGEX.match(normalized):
        raise serializers.ValidationError(
            "Verification code may only contain letters, numbers, and hyphens."
        )

    return normalized


def validate_safe_text_input(value: str, *, max_length: int = 500) -> str:
    """
    General-purpose string validator rejecting null bytes, control chars,
    HTML/XSS script markers, and strings exceeding max_length.
    """
    if not isinstance(value, str):
        raise serializers.ValidationError("Value must be a valid string.")

    if "\x00" in value or CONTROL_CHAR_REGEX.search(value):
        raise serializers.ValidationError("Input contains disallowed control characters.")

    cleaned = value.strip()
    if len(cleaned) > max_length:
        raise serializers.ValidationError(f"Input must not exceed {max_length} characters.")

    if XSS_DANGER_REGEX.search(cleaned):
        raise serializers.ValidationError("Input contains disallowed HTML or script content.")

    return cleaned
