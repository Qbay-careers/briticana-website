"""
Database models for Briticana API.
"""
from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base class providing created_at and updated_at timestamps."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class CertificateVerification(TimeStampedModel):
    """
    Stores verified learner certificate and internship completion records.
    Backed by PostgreSQL and queried by the public verification endpoint.
    """

    code = models.CharField(
        max_length=32,
        unique=True,
        db_index=True,
        help_text="Unique certificate access/verification code (e.g. BRT-2026-884).",
    )
    student_name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    duration = models.CharField(max_length=64)
    region = models.CharField(max_length=64)
    status = models.CharField(max_length=64, default="Completed")
    certificate_issued = models.BooleanField(default=True)
    mentor_evaluation = models.CharField(max_length=64, default="Excellent")
    issued_date = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "api_certificate_verification"
        ordering = ["code"]
        verbose_name = "Certificate Verification"
        verbose_name_plural = "Certificate Verifications"

    def save(self, *args, **kwargs):
        if self.code:
            self.code = self.code.strip().upper()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.code} - {self.student_name}"


class ApplicationSubmission(TimeStampedModel):
    """
    Stores candidate internship application submissions migrated from the
    production Google Sheets backup (and future direct submissions).
    """

    source_row_number = models.PositiveIntegerField(
        null=True,
        blank=True,
        db_index=True,
        help_text="Original 1-based data row number from the Google Sheets backup (1..59).",
    )
    submitted_at = models.DateTimeField(
        db_index=True,
        help_text="Original submission timestamp parsed from the backup.",
    )
    submitted_at_raw = models.CharField(
        max_length=64,
        unique=True,
        db_index=True,
        help_text="Exact original 'Submitted At' ISO timestamp string from the backup (idempotency key).",
    )

    # Applicant Identity & Contact
    full_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=150, blank=True, default="")
    last_name = models.CharField(max_length=150, blank=True, default="")
    email = models.EmailField(max_length=255, db_index=True)
    phone = models.CharField(max_length=64, blank=True, default="")
    country = models.CharField(max_length=128, blank=True, default="")

    # Academic & Professional Profile
    university = models.CharField(max_length=255, blank=True, default="")
    current_qualification = models.CharField(max_length=255, blank=True, default="")
    linkedin = models.CharField(max_length=500, blank=True, default="")

    # Program Selection
    duration = models.CharField(max_length=64, blank=True, default="")
    preferred_domain = models.TextField(blank=True, default="")
    program_region = models.CharField(max_length=128, blank=True, default="")
    internship_track = models.CharField(max_length=500, blank=True, default="")

    # Readiness, Experience & Background
    career_assistance = models.CharField(max_length=32, blank=True, default="")
    job_opportunities_after = models.CharField(max_length=32, blank=True, default="")
    previous_internship = models.CharField(max_length=32, blank=True, default="")
    previous_internship_details = models.TextField(blank=True, default="")
    relevant_work_experience = models.CharField(max_length=32, blank=True, default="")
    relevant_work_experience_details = models.TextField(blank=True, default="")
    current_status = models.CharField(max_length=64, blank=True, default="")
    relevant_skills = models.TextField(blank=True, default="")
    projects_certifications_courses = models.CharField(max_length=32, blank=True, default="")
    projects_certifications_details = models.TextField(blank=True, default="")

    # Visa & Legal
    visa_status = models.CharField(max_length=128, blank=True, default="")
    visa_details = models.TextField(blank=True, default="")

    # Motivational & Learning Responses
    industry_or_career_path = models.TextField(blank=True, default="")
    biggest_career_challenge = models.TextField(blank=True, default="")
    why_chose_internship = models.TextField(blank=True, default="")
    career_growth_help = models.TextField(blank=True, default="")
    why_chose_briticana = models.TextField(blank=True, default="")
    internship_expectations = models.TextField(blank=True, default="")
    impact_academic_professional_growth = models.TextField(blank=True, default="")
    specific_learning_outcomes = models.TextField(blank=True, default="")
    challenges_to_overcome = models.TextField(blank=True, default="")
    confidence_level = models.CharField(max_length=64, blank=True, default="")

    # Attachments & Metadata
    resume_url = models.CharField(max_length=1000, blank=True, default="")
    source = models.CharField(max_length=128, blank=True, default="")
    declaration_accepted = models.CharField(max_length=32, blank=True, default="")
    is_test_record = models.BooleanField(
        default=False,
        db_index=True,
        help_text="True for the 8 early test submissions (Rows 1-8), False for the 51 live applications (Rows 9-59).",
    )
    raw_backup_data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Verbatim 36-column dictionary from the original Google Sheets backup.",
    )

    class Meta:
        db_table = "api_application_submission"
        ordering = ["source_row_number", "submitted_at"]
        verbose_name = "Application Submission"
        verbose_name_plural = "Application Submissions"

    def __str__(self) -> str:
        return f"Row {self.source_row_number}: {self.full_name} ({self.email})"


class InternshipPageContent(TimeStampedModel):
    """
    Stores editable content for the public internship pages (/internships and /internships/[slug]).
    Backed by PostgreSQL and managed via the custom /admin Internship Page Content Editor.
    """

    page_key = models.CharField(
        max_length=255,
        unique=True,
        db_index=True,
        help_text="Unique identifier: 'internships-overview' for /internships or the track slug for /internships/[slug].",
    )
    page_type = models.CharField(
        max_length=32,
        default="track",
        db_index=True,
        help_text="'overview' for the main /internships page or 'track' for an individual internship program.",
    )
    title = models.CharField(max_length=500)
    heading = models.CharField(max_length=500)
    duration = models.CharField(max_length=255, blank=True, default="3 Months")
    description = models.TextField(blank=True, default="")
    introductory_text = models.TextField(blank=True, default="")
    program_details = models.TextField(blank=True, default="")
    learning_outcomes = models.JSONField(default=list, blank=True)
    responsibilities = models.JSONField(default=list, blank=True)
    skills_and_requirements = models.JSONField(default=list, blank=True)
    benefits_and_features = models.TextField(blank=True, default="")
    eligibility_information = models.TextField(blank=True, default="")
    application_instructions = models.TextField(blank=True, default="")
    cta_button_text = models.CharField(max_length=120, blank=True, default="Apply Now")

    # Optional track metadata preserved from Sanity/default definitions
    domain_title = models.CharField(max_length=255, blank=True, default="")
    domain_slug = models.CharField(max_length=255, blank=True, default="")
    application_status = models.CharField(max_length=64, blank=True, default="open")
    batch_start_date = models.CharField(max_length=64, blank=True, default="")

    class Meta:
        db_table = "api_internship_page_content"
        ordering = ["page_type", "title"]
        verbose_name = "Internship Page Content"
        verbose_name_plural = "Internship Page Contents"

    def __str__(self) -> str:
        return f"{self.page_key} ({self.title})"


