"""
Idempotent management command to import the 59 backed-up internship application
submissions from briticana-full-backup/google-sheets/live-data/applications-live.json
into PostgreSQL (ApplicationSubmission model).

Preserves all 36 columns from the Google Sheets backup accurately without modifying
CertificateVerification or inventing verification codes.
"""
import csv
import json
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils.dateparse import parse_datetime

from apps.api.models import ApplicationSubmission


def map_backup_row_to_defaults(item: dict, row_number: int) -> tuple[str, dict]:
    """
    Map a single 36-column dictionary from applications-live.json (or CSV)
    to ApplicationSubmission model fields while preserving the raw 36-column
    dictionary in raw_backup_data.

    Handles both historical cohorts documented in GOOGLE-SHEET-BACKUP-REPORT.md:
    - Rows 1-7 (June 19, 2026): Early 12-column integration test submissions
      where Column_36 is empty.
    - Rows 8-59 (June 30 - Sept 29, 2026): 36-column submissions matching
      APPLICATION_SHEET_HEADERS in src/lib/applications/applicationTypes.ts
      (Row 8 = schema transition test; Rows 9-59 = 51 live student applications).
    """
    submitted_at_raw = str(item.get("Submitted At", "")).strip()
    if not submitted_at_raw:
        raise CommandError(f"Row {row_number} is missing 'Submitted At'.")

    submitted_at = parse_datetime(submitted_at_raw)
    if submitted_at is None:
        raise CommandError(
            f"Row {row_number} has unparseable 'Submitted At' timestamp: {submitted_at_raw!r}"
        )

    is_36_col_schema = bool(str(item.get("Column_36", "")).strip())

    if is_36_col_schema:
        first_name = str(item.get("Full Name", ""))
        last_name = str(item.get("Last Name", ""))
        full_name = f"{first_name.strip()} {last_name.strip()}".strip()
        defaults = {
            "source_row_number": row_number,
            "submitted_at": submitted_at,
            "full_name": full_name,
            "first_name": first_name,
            "last_name": last_name,
            "email": str(item.get("Email", "")).strip(),
            "phone": str(item.get("Phone Number", "")),
            "country": str(item.get("Country", "")),
            "university": str(item.get("LinkedIn Profile URL", "")),
            "current_qualification": str(item.get("University / Institution Name", "")),
            "linkedin": str(item.get("Course / Degree Program", "")),
            "duration": str(item.get("Year of Onboarding", "")),
            "career_assistance": str(
                item.get("Current Status (Studying / Working / Both)", "")
            ),
            "job_opportunities_after": str(item.get("Preferred Domain", "")),
            "previous_internship": str(item.get("Program Region", "")),
            "previous_internship_details": str(item.get("Internship Duration", "")),
            "relevant_work_experience": str(
                item.get("Career Assistance Required (Yes/No)", "")
            ),
            "relevant_work_experience_details": str(
                item.get("Areas of Career Assistance Needed", "")
            ),
            "current_status": str(
                item.get("Previous Internship Experience (Yes/No)", "")
            ),
            "relevant_skills": str(item.get("Previous Internship Details", "")),
            "projects_certifications_courses": str(
                item.get("Relevant Domain Experience (Yes/No)", "")
            ),
            "projects_certifications_details": str(
                item.get("Duration of Relevant Experience", "")
            ),
            "visa_status": str(
                item.get("Other Projects / Certifications / Courses (Yes/No)", "")
            ),
            "visa_details": str(item.get("Project / Course Details", "")),
            "industry_or_career_path": str(item.get("Domain Skills", "")),
            "preferred_domain": str(item.get("Domain Skills", "")),
            "program_region": "",
            "biggest_career_challenge": str(item.get("Visa Status", "")),
            "why_chose_internship": str(item.get("Visa Country", "")),
            "career_growth_help": str(item.get("Visa Details", "")),
            "why_chose_briticana": str(
                item.get("Reason for Choosing the Internship", "")
            ),
            "internship_expectations": str(item.get("Expected Career Impact", "")),
            "impact_academic_professional_growth": str(
                item.get("Resume / CV URL", "")
            ),
            "specific_learning_outcomes": str(
                item.get("Internship Applied For (Prefilled)", "")
            ),
            "challenges_to_overcome": str(item.get("Application Source", "")),
            "confidence_level": str(item.get("Column_32", "")),
            "resume_url": str(item.get("Column_33", "")),
            "internship_track": str(item.get("Column_34", "")),
            "source": str(item.get("Column_35", "")),
            "declaration_accepted": str(item.get("Column_36", "")),
            "is_test_record": row_number <= 8,
            "raw_backup_data": dict(item),
        }
    else:
        raw_name = str(item.get("Full Name", "")).strip()
        name_parts = raw_name.split(" ", 1)
        first_name = name_parts[0] if name_parts else ""
        last_name = name_parts[1] if len(name_parts) > 1 else ""
        defaults = {
            "source_row_number": row_number,
            "submitted_at": submitted_at,
            "full_name": raw_name,
            "first_name": first_name,
            "last_name": last_name,
            "email": str(item.get("Last Name", "")).strip(),
            "phone": str(item.get("Email", "")),
            "country": str(item.get("Phone Number", "")),
            "university": "",
            "current_qualification": str(item.get("Course / Degree Program", "")),
            "linkedin": "",
            "duration": str(item.get("LinkedIn Profile URL", "")),
            "career_assistance": "",
            "job_opportunities_after": "",
            "previous_internship": "",
            "previous_internship_details": "",
            "relevant_work_experience": "",
            "relevant_work_experience_details": "",
            "current_status": "",
            "relevant_skills": "",
            "projects_certifications_courses": "",
            "projects_certifications_details": "",
            "visa_status": "",
            "visa_details": "",
            "industry_or_career_path": "",
            "preferred_domain": str(item.get("Country", "")),
            "program_region": str(item.get("University / Institution Name", "")),
            "biggest_career_challenge": "",
            "why_chose_internship": str(item.get("Year of Onboarding", "")),
            "career_growth_help": "",
            "why_chose_briticana": "",
            "internship_expectations": "",
            "impact_academic_professional_growth": "",
            "specific_learning_outcomes": "",
            "challenges_to_overcome": "",
            "confidence_level": "",
            "resume_url": "",
            "internship_track": str(
                item.get("Current Status (Studying / Working / Both)", "")
            ),
            "source": str(item.get("Preferred Domain", "")),
            "declaration_accepted": "",
            "is_test_record": True,
            "raw_backup_data": dict(item),
        }

    return submitted_at_raw, defaults


def load_backup_rows(source_path: Path) -> list[dict]:
    """Load rows from either applications-live.json or applications-live.csv."""
    suffix = source_path.suffix.lower()
    if suffix == ".json":
        data = json.loads(source_path.read_text(encoding="utf-8"))
        if not isinstance(data, list):
            raise CommandError("Expected JSON root to be a list of application records.")
        return data
    if suffix == ".csv":
        with source_path.open(encoding="utf-8", newline="") as fh:
            reader = list(csv.reader(fh))
        if not reader:
            return []
        headers = [
            h if h else f"Column_{idx + 1}" for idx, h in enumerate(reader[0])
        ]
        return [
            {headers[i]: (row[i] if i < len(row) else "") for i in range(len(headers))}
            for row in reader[1:]
        ]
    raise CommandError(f"Unsupported backup file format: {suffix}")


class Command(BaseCommand):
    help = (
        "Idempotently import the 59 Google Sheets internship application records "
        "from briticana-full-backup into PostgreSQL (ApplicationSubmission)."
    )

    def add_arguments(self, parser):
        default_backup_path = (
            Path(settings.BASE_DIR).parent
            / "briticana-full-backup"
            / "google-sheets"
            / "live-data"
            / "applications-live.json"
        )
        parser.add_argument(
            "--source",
            type=str,
            default=str(default_backup_path),
            help="Path to applications-live.json or applications-live.csv.",
        )

    def handle(self, *args, **options):
        source_path = Path(options["source"]).resolve()
        if not source_path.exists():
            raise CommandError(f"Backup file not found at: {source_path}")

        try:
            raw_records = load_backup_rows(source_path)
        except CommandError:
            raise
        except Exception as exc:
            raise CommandError(f"Failed to read backup file: {exc}") from exc

        created_count = 0
        updated_count = 0

        with transaction.atomic():
            for idx, item in enumerate(raw_records, start=1):
                submitted_at_raw, defaults = map_backup_row_to_defaults(item, idx)
                _, created = ApplicationSubmission.objects.update_or_create(
                    submitted_at_raw=submitted_at_raw,
                    defaults=defaults,
                )
                if created:
                    created_count += 1
                else:
                    updated_count += 1

        total_db_count = ApplicationSubmission.objects.count()
        self.stdout.write(
            self.style.SUCCESS(
                f"Application import complete from {source_path.name}: "
                f"created={created_count}, updated={updated_count}, total_in_db={total_db_count}"
            )
        )
