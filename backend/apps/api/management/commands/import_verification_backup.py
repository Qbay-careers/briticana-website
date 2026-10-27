"""
Idempotent management command to import backed-up certificate verification records
from briticana-full-backup/student-data/verification/verification-records.json into PostgreSQL.
"""
import json
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from apps.api.models import CertificateVerification


class Command(BaseCommand):
    help = "Idempotently import certificate verification records from the project backup into PostgreSQL."

    def add_arguments(self, parser):
        default_backup_path = (
            Path(settings.BASE_DIR).parent
            / "briticana-full-backup"
            / "student-data"
            / "verification"
            / "verification-records.json"
        )
        parser.add_argument(
            "--source",
            type=str,
            default=str(default_backup_path),
            help="Path to the verification-records.json backup file.",
        )

    def handle(self, *args, **options):
        source_path = Path(options["source"]).resolve()
        if not source_path.exists():
            raise CommandError(f"Backup file not found at: {source_path}")

        try:
            raw_records = json.loads(source_path.read_text(encoding="utf-8"))
        except Exception as exc:
            raise CommandError(f"Failed to parse JSON backup file: {exc}") from exc

        if not isinstance(raw_records, list):
            raise CommandError("Expected backup JSON root to be a list of verification records.")

        created_count = 0
        updated_count = 0

        with transaction.atomic():
            for item in raw_records:
                code = str(item.get("code", "")).strip().upper()
                if not code:
                    raise CommandError("Encountered a backup verification record without a code.")

                defaults = {
                    "student_name": str(item.get("name", "")).strip(),
                    "domain": str(item.get("domain", "")).strip(),
                    "duration": str(item.get("duration", "")).strip(),
                    "region": str(item.get("region", "")).strip(),
                    "status": str(item.get("status", "Completed")).strip(),
                    "certificate_issued": bool(item.get("certificateIssued", True)),
                    "mentor_evaluation": str(item.get("mentorEvaluation", "Excellent")).strip(),
                }

                _, created = CertificateVerification.objects.update_or_create(
                    code=code,
                    defaults=defaults,
                )
                if created:
                    created_count += 1
                else:
                    updated_count += 1

        total_db_count = CertificateVerification.objects.count()
        self.stdout.write(
            self.style.SUCCESS(
                f"Import complete from {source_path.name}: "
                f"created={created_count}, updated={updated_count}, total_in_db={total_db_count}"
            )
        )
