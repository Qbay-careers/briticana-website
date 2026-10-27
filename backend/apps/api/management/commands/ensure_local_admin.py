"""
Safely creates the local administrator user (`Aswin`) for `/admin` dashboard testing
if it does not already exist, using Django's PBKDF2 password hashing and without
resetting an existing user's password unexpectedly.
"""
import os
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Safely ensure the local admin user exists without overwriting an existing password."

    def add_arguments(self, parser):
        parser.add_argument(
            "--username",
            type=str,
            default=os.environ.get("LOCAL_ADMIN_USERNAME", "Aswin"),
            help="Admin username to ensure (default: Aswin).",
        )
        parser.add_argument(
            "--password",
            type=str,
            default=os.environ.get("LOCAL_ADMIN_PASSWORD", "aswin@1234"),
            help="Initial password if the user does not exist yet.",
        )

    def handle(self, *args, **options):
        UserModel = get_user_model()
        username = options["username"].strip()
        password = options["password"]

        existing = UserModel.objects.filter(username=username).first()
        if existing is not None:
            updated_flags = False
            if not existing.is_staff:
                existing.is_staff = True
                updated_flags = True
            if not existing.is_active:
                existing.is_active = True
                updated_flags = True
            if updated_flags:
                existing.save(update_fields=["is_staff", "is_active"])
            self.stdout.write(
                self.style.SUCCESS(
                    f"Admin user '{username}' already exists (password preserved)."
                )
            )
            return

        user = UserModel(
            username=username,
            is_staff=True,
            is_superuser=True,
            is_active=True,
        )
        user.set_password(password)
        user.save()
        self.stdout.write(
            self.style.SUCCESS(
                f"Created local admin user '{username}' with hashed password."
            )
        )
