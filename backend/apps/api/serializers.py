"""
DRF Serializers with strict input validation and schema enforcement.
Protects against unexpected fields, invalid data types, oversized strings,
XSS payloads, and SQL injection patterns.
"""
from collections.abc import Mapping
from rest_framework import serializers

from .models import CertificateVerification, InternshipPageContent
from .validators import validate_safe_text_input, validate_verification_code_format


class StrictCharField(serializers.CharField):
    """
    CharField that strictly requires a Python `str` input and refuses to coerce
    booleans, numbers, lists, or dicts into strings.
    """

    def to_internal_value(self, data):
        if not isinstance(data, str):
            raise serializers.ValidationError("Invalid data type: expected a string.")
        return super().to_internal_value(data)


class StrictSchemaSerializer(serializers.Serializer):
    """
    Base serializer that rejects non-object JSON payloads and rejects any
    unexpected / unknown fields not explicitly declared on the serializer.
    """

    def to_internal_value(self, data):
        if not isinstance(data, Mapping):
            raise serializers.ValidationError(
                {"non_field_errors": ["Invalid payload format: expected a JSON object."]}
            )

        allowed_fields = set(self.fields.keys())
        incoming_fields = {str(k) for k in data.keys()}
        unexpected_fields = sorted(incoming_fields - allowed_fields)
        if unexpected_fields:
            raise serializers.ValidationError(
                {"non_field_errors": ["Request contains unexpected or unsupported fields."]}
            )

        return super().to_internal_value(data)


class HealthCheckSerializer(serializers.Serializer):
    """Serializer for the public API and database health check response."""

    status = serializers.CharField(read_only=True)
    service = serializers.CharField(read_only=True)
    database = serializers.CharField(read_only=True)


class VerificationCodeInputSerializer(StrictSchemaSerializer):
    """
    Strict input validator for certificate verification requests.
    Enforces:
    - Only the `code` field is accepted (unexpected fields rejected)
    - `code` must be a non-empty string
    - Length between 3 and 32 characters
    - Allowed characters: uppercase alphanumeric and single internal hyphens
    """

    code = StrictCharField(
        required=True,
        allow_blank=False,
        trim_whitespace=False,
        error_messages={
            "required": "Verification code is required.",
            "blank": "Verification code cannot be empty.",
            "null": "Verification code cannot be null.",
        },
    )

    def validate_code(self, value: str) -> str:
        return validate_verification_code_format(value)


class VerificationPublicResultSerializer(serializers.ModelSerializer):
    """
    Output serializer restricted strictly to the minimum public certificate
    verification fields required by the frontend VerificationResult component.
    Excludes internal database IDs, timestamps, and any sensitive student data.
    """

    name = serializers.CharField(source="student_name", read_only=True)
    certificateIssued = serializers.BooleanField(source="certificate_issued", read_only=True)
    mentorEvaluation = serializers.CharField(source="mentor_evaluation", read_only=True)

    class Meta:
        model = CertificateVerification
        fields = (
            "code",
            "name",
            "domain",
            "duration",
            "region",
            "status",
            "certificateIssued",
            "mentorEvaluation",
        )
        read_only_fields = fields


class AdminLoginInputSerializer(StrictSchemaSerializer):
    """Strict input serializer for custom /admin authentication."""

    username = StrictCharField(
        required=True,
        allow_blank=False,
        max_length=150,
        trim_whitespace=True,
        error_messages={
            "required": "Username is required.",
            "blank": "Username cannot be empty.",
        },
    )
    password = StrictCharField(
        required=True,
        allow_blank=False,
        max_length=255,
        trim_whitespace=False,
        error_messages={
            "required": "Password is required.",
            "blank": "Password cannot be empty.",
        },
    )


class AdminCertificateVerificationSerializer(serializers.ModelSerializer):
    """
    Serializer for Admin Verification Management CRUD operations.
    Enforces unique verification codes and server-side validation.
    """

    code = StrictCharField(
        required=True,
        max_length=32,
        trim_whitespace=False,
        validators=[],  # Handled explicitly in validate_code for clean duplicate messaging
    )
    student_name = StrictCharField(required=True, max_length=255)
    domain = StrictCharField(required=True, max_length=255)
    duration = StrictCharField(required=True, max_length=64)
    region = StrictCharField(required=True, max_length=64)
    status = StrictCharField(required=False, default="Completed", max_length=64)
    certificate_issued = serializers.BooleanField(required=False, default=True)
    mentor_evaluation = StrictCharField(
        required=False, allow_blank=True, default="Excellent", max_length=64
    )

    class Meta:
        model = CertificateVerification
        fields = (
            "id",
            "code",
            "student_name",
            "domain",
            "duration",
            "region",
            "status",
            "certificate_issued",
            "mentor_evaluation",
            "issued_date",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_code(self, value: str) -> str:
        normalized = validate_verification_code_format(value)
        qs = CertificateVerification.objects.filter(code__iexact=normalized)
        if self.instance is not None:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError(
                "A verification record with this verification code already exists."
            )
        return normalized

    def validate_student_name(self, value: str) -> str:
        return validate_safe_text_input(value, max_length=255)

    def validate_domain(self, value: str) -> str:
        return validate_safe_text_input(value, max_length=255)

    def validate_duration(self, value: str) -> str:
        return validate_safe_text_input(value, max_length=64)

    def validate_region(self, value: str) -> str:
        return validate_safe_text_input(value, max_length=64)

    def validate_status(self, value: str) -> str:
        return validate_safe_text_input(value, max_length=64)

    def validate_mentor_evaluation(self, value: str) -> str:
        if not value or not value.strip():
            return "Pending"
        return validate_safe_text_input(value, max_length=64)


class StringListField(serializers.Field):
    """
    Accepts either a list of strings or a newline-separated string and
    normalizes to a clean list of non-empty strings.
    """

    def to_representation(self, value):
        if isinstance(value, list):
            return [str(item) for item in value if str(item).strip()]
        return []

    def to_internal_value(self, data):
        if isinstance(data, str):
            raw_items = data.splitlines()
        elif isinstance(data, list):
            raw_items = data
        else:
            raise serializers.ValidationError(
                "Expected a list of strings or newline-separated text."
            )

        cleaned = []
        for item in raw_items:
            if not isinstance(item, str):
                raise serializers.ValidationError("All list items must be strings.")
            text = item.strip()
            if not text:
                continue
            if "\x00" in text:
                raise serializers.ValidationError("Input contains invalid null bytes.")
            if len(text) > 500:
                raise serializers.ValidationError(
                    "Each list item must be at most 500 characters."
                )
            cleaned.append(text)
        return cleaned


class InternshipPageContentSerializer(serializers.ModelSerializer):
    """
    Serializer for reading and updating Internship Page Content in PostgreSQL.
    Validates all text and list fields server-side.
    """

    learning_outcomes = StringListField(required=False, default=list)
    responsibilities = StringListField(required=False, default=list)
    skills_and_requirements = StringListField(required=False, default=list)

    class Meta:
        model = InternshipPageContent
        fields = (
            "id",
            "page_key",
            "page_type",
            "title",
            "heading",
            "duration",
            "description",
            "introductory_text",
            "program_details",
            "learning_outcomes",
            "responsibilities",
            "skills_and_requirements",
            "benefits_and_features",
            "eligibility_information",
            "application_instructions",
            "cta_button_text",
            "domain_title",
            "domain_slug",
            "application_status",
            "batch_start_date",
            "updated_at",
        )
        read_only_fields = ("id", "page_key", "page_type", "updated_at")

    def validate_title(self, value: str) -> str:
        return validate_safe_text_input(value, max_length=500)

    def validate_heading(self, value: str) -> str:
        return validate_safe_text_input(value, max_length=500)

    def validate_duration(self, value: str) -> str:
        if not value or not value.strip():
            raise serializers.ValidationError("Internship duration cannot be empty.")
        return validate_safe_text_input(value, max_length=255)

    def validate_cta_button_text(self, value: str) -> str:
        if not value or not value.strip():
            return "Apply Now"
        return validate_safe_text_input(value, max_length=120)

