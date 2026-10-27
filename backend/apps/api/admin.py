"""
Django Admin registrations for Briticana API models.
"""
from django.contrib import admin
from .models import ApplicationSubmission, CertificateVerification, InternshipPageContent


@admin.register(CertificateVerification)
class CertificateVerificationAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "student_name",
        "domain",
        "duration",
        "region",
        "status",
        "certificate_issued",
        "mentor_evaluation",
    )
    list_filter = ("status", "certificate_issued", "region")
    search_fields = ("code", "student_name", "domain")
    readonly_fields = ("created_at", "updated_at")


@admin.register(ApplicationSubmission)
class ApplicationSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "source_row_number",
        "submitted_at",
        "full_name",
        "email",
        "country",
        "duration",
        "internship_track",
        "is_test_record",
    )
    list_filter = ("is_test_record", "duration", "country", "current_status")
    search_fields = ("full_name", "email", "phone", "university", "internship_track")
    readonly_fields = ("created_at", "updated_at", "submitted_at_raw", "raw_backup_data")


@admin.register(InternshipPageContent)
class InternshipPageContentAdmin(admin.ModelAdmin):
    list_display = (
        "page_key",
        "page_type",
        "title",
        "heading",
        "duration",
        "updated_at",
    )
    list_filter = ("page_type", "application_status")
    search_fields = ("page_key", "title", "heading", "description")
    readonly_fields = ("created_at", "updated_at")


