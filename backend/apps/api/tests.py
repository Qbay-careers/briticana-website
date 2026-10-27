"""
Comprehensive Security Hardening & Verification Integration Test Suite (Sections 8 & 9).
Verifies defense-in-depth protections and real PostgreSQL verification record lookup:
1. Invalid verification codes (SQLi, XSS, special chars, non-existent codes)
2. Empty verification codes
3. Extremely long verification codes
4. Malformed API requests (non-object JSON payloads)
5. Repeated verification attempts (rate limiting / brute-force throttling)
6. Unauthorized API access (restrictive default permissions)
7. Invalid HTTP methods
8. Invalid / corrupt JSON payloads
9. Oversized request payloads (HTTP 413 protection)
10. Invalid / unexpected fields & invalid data types
11. CORS from unauthorized vs authorized origins
12. CSRF protection enforcement
13. Database connection failures (zero credential/internal leakage)
14. Unhandled server errors (zero traceback/path leakage)
15. Security headers, log redaction filter, and file upload preparation validators
16. Real backed-up verification code lookup (POST and GET)
17. Lowercase / mixed-case / whitespace code normalization
18. Idempotent backup import command verification
"""
import io
import json
import logging
from unittest.mock import patch

from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import call_command
from django.db import OperationalError
from django.test import Client, TestCase
from django.urls import reverse
from rest_framework import status

from .file_security import generate_safe_storage_filename, validate_resume_upload
from .logging_filters import SensitiveDataRedactionFilter
from .models import ApplicationSubmission, CertificateVerification, InternshipPageContent
from .views import VerificationSecurityCheckAPIView


class BriticanaSecurityTestSuite(TestCase):
    """End-to-end security and verification test suite."""

    def setUp(self):
        cache.clear()
        self.client = Client()
        self.health_url = reverse("api_v1:health-check")
        self.verify_url = reverse("api_v1:verification-check")
        self.admin_status_url = reverse("api_v1:admin-status")

    def _assert_no_sensitive_leakage(self, response):
        """Confirm response never leaks tracebacks, SQL, credentials, or internal paths."""
        raw_text = response.content.decode("utf-8", errors="ignore")
        forbidden_markers = [
            "Traceback (most recent call last)",
            "psycopg2",
            "briticana_local_app_db_pw",
            "SECRET_KEY",
            "settings.py",
            "SELECT ",
            "INSERT INTO",
            "C:\\Users\\",
            "/var/secrets",
        ]
        for marker in forbidden_markers:
            self.assertNotIn(marker, raw_text)

    # ------------------------------------------------------------------------
    # 1. Invalid Verification Code (SQLi, XSS, Special Chars, Non-Existent)
    # ------------------------------------------------------------------------
    def test_01_invalid_verification_codes_and_injection_payloads(self):
        malicious_codes = [
            "' OR '1'='1' --",
            "BRT-2026-884; DROP TABLE auth_user;--",
            "<script>void(0)</script>",
            "../../etc/config",
            "BRT-2026-884\x00",
            "BRT_2026_884!",
            "BRT--2026--884",
            "-BRT-2026-884-",
        ]
        for payload in malicious_codes:
            cache.clear()
            response = self.client.post(
                self.verify_url,
                data=json.dumps({"code": payload}),
                content_type="application/json",
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            body = response.json()
            self.assertFalse(body["verified"])
            self.assertEqual(body["error"]["code"], "invalid_verification_request")
            self.assertNotIn(payload, response.content.decode("utf-8"))
            self._assert_no_sensitive_leakage(response)

    def test_01b_syntactically_valid_unmatched_code_returns_generic_response(self):
        for unmatched in ("BRT-2026-999", "GTR94TY17"):
            cache.clear()
            response = self.client.post(
                self.verify_url,
                data=json.dumps({"code": unmatched}),
                content_type="application/json",
            )
            self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
            body = response.json()
            self.assertEqual(
                body,
                {
                    "verified": False,
                    "error": {
                        "code": "verification_failed",
                        "message": "Unable to verify certificate with the provided code.",
                    },
                },
            )
            self._assert_no_sensitive_leakage(response)

    # ------------------------------------------------------------------------
    # 2. Empty Verification Code
    # ------------------------------------------------------------------------
    def test_02_empty_verification_code(self):
        for payload in [{"code": ""}, {"code": "    "}, {}, {"code": None}]:
            cache.clear()
            response = self.client.post(
                self.verify_url,
                data=json.dumps(payload),
                content_type="application/json",
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertFalse(response.json()["verified"])
            self._assert_no_sensitive_leakage(response)

    # ------------------------------------------------------------------------
    # 3. Extremely Long Verification Code
    # ------------------------------------------------------------------------
    def test_03_extremely_long_verification_code(self):
        for length in (33, 256, 5000):
            cache.clear()
            long_code = "BRT-" + ("A" * length)
            response = self.client.post(
                self.verify_url,
                data=json.dumps({"code": long_code}),
                content_type="application/json",
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertFalse(response.json()["verified"])
            self._assert_no_sensitive_leakage(response)

    # ------------------------------------------------------------------------
    # 4. Malformed API Requests (Top-Level Array / Primitive JSON)
    # ------------------------------------------------------------------------
    def test_04_malformed_api_requests(self):
        for payload in ["[1, 2, 3]", '"just-a-string"', "12345"]:
            cache.clear()
            response = self.client.post(
                self.verify_url,
                data=payload,
                content_type="application/json",
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self._assert_no_sensitive_leakage(response)

    # ------------------------------------------------------------------------
    # 5. Repeated Verification Attempts (Rate Limiting / Brute-Force Defense)
    # ------------------------------------------------------------------------
    def test_05_repeated_verification_attempts_rate_limited(self):
        cache.clear()
        for i in range(5):
            resp = self.client.post(
                self.verify_url,
                data=json.dumps({"code": f"BRT-2026-10{i}"}),
                content_type="application/json",
            )
            self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

        throttled_resp = self.client.post(
            self.verify_url,
            data=json.dumps({"code": "BRT-2026-109"}),
            content_type="application/json",
        )
        self.assertEqual(throttled_resp.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
        body = throttled_resp.json()
        self.assertEqual(body["error"]["code"], "rate_limit_exceeded")
        self._assert_no_sensitive_leakage(throttled_resp)

    # ------------------------------------------------------------------------
    # 6. Unauthorized API Access (Restrictive Default Permissions)
    # ------------------------------------------------------------------------
    def test_06_unauthorized_api_access_blocked(self):
        response = self.client.get(self.admin_status_url)
        self.assertIn(
            response.status_code,
            (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN),
        )
        self.assertIn(
            response.json()["error"]["code"],
            ("authentication_required", "permission_denied"),
        )
        self._assert_no_sensitive_leakage(response)

        regular_user = User.objects.create_user(
            username="student_test", password="StrongTestPassword123!"
        )
        self.client.force_login(regular_user)
        resp_non_staff = self.client.get(self.admin_status_url)
        self.assertEqual(resp_non_staff.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(resp_non_staff.json()["error"]["code"], "permission_denied")

    # ------------------------------------------------------------------------
    # 7. Invalid HTTP Methods
    # ------------------------------------------------------------------------
    def test_07_invalid_http_methods_rejected(self):
        for method_call in (self.client.delete, self.client.put, self.client.patch):
            cache.clear()
            resp = method_call(
                self.verify_url,
                data=json.dumps({"code": "BRT-2026-884"}),
                content_type="application/json",
            )
            self.assertIn(
                resp.status_code,
                (status.HTTP_403_FORBIDDEN, status.HTTP_405_METHOD_NOT_ALLOWED),
            )
            self._assert_no_sensitive_leakage(resp)

        resp_health_post = self.client.post(
            self.health_url,
            data=json.dumps({"status": "hacked"}),
            content_type="application/json",
        )
        self.assertIn(
            resp_health_post.status_code,
            (status.HTTP_403_FORBIDDEN, status.HTTP_405_METHOD_NOT_ALLOWED),
        )

    # ------------------------------------------------------------------------
    # 8. Invalid / Corrupt JSON
    # ------------------------------------------------------------------------
    def test_08_invalid_corrupt_json_rejected(self):
        response = self.client.post(
            self.verify_url,
            data='{"code": "BRT-2026-884", invalid_json',
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()["error"]["code"], "malformed_request")
        self._assert_no_sensitive_leakage(response)

    # ------------------------------------------------------------------------
    # 9. Oversized Request Payload (HTTP 413 Protection)
    # ------------------------------------------------------------------------
    def test_09_oversized_request_payload_rejected_with_413(self):
        oversized_body = json.dumps({"code": "A" * 70000})  # > 64 KB limit
        response = self.client.post(
            self.verify_url,
            data=oversized_body,
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 413)
        self.assertEqual(response.json()["error"]["code"], "payload_too_large")
        self._assert_no_sensitive_leakage(response)

    # ------------------------------------------------------------------------
    # 10. Invalid / Unexpected Fields & Invalid Data Types
    # ------------------------------------------------------------------------
    def test_10_unexpected_fields_and_invalid_types_rejected(self):
        invalid_payloads = [
            {"code": "BRT-2026-884", "isAdmin": True},
            {"code": "BRT-2026-884", "$gt": ""},
            {"code": 2026884},
            {"code": True},
            {"code": ["BRT-2026-884"]},
            {"code": {"nested": "BRT-2026-884"}},
        ]
        for payload in invalid_payloads:
            cache.clear()
            response = self.client.post(
                self.verify_url,
                data=json.dumps(payload),
                content_type="application/json",
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertFalse(response.json()["verified"])
            self._assert_no_sensitive_leakage(response)

    # ------------------------------------------------------------------------
    # 11. CORS from Unauthorized vs Authorized Origin
    # ------------------------------------------------------------------------
    def test_11_cors_allowlist_enforcement(self):
        unauth_resp = self.client.get(
            self.health_url,
            HTTP_ORIGIN="https://malicious-attacker.example.com",
        )
        self.assertEqual(unauth_resp.status_code, status.HTTP_200_OK)
        self.assertNotIn("Access-Control-Allow-Origin", unauth_resp.headers)

        auth_resp = self.client.get(
            self.health_url,
            HTTP_ORIGIN="http://localhost:3000",
        )
        self.assertEqual(auth_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(
            auth_resp.headers.get("Access-Control-Allow-Origin"),
            "http://localhost:3000",
        )

    # ------------------------------------------------------------------------
    # 12. CSRF Protection Enforcement
    # ------------------------------------------------------------------------
    def test_12_csrf_protection_enforced_for_session_authenticated_requests(self):
        csrf_client = Client(enforce_csrf_checks=True)
        staff_user = User.objects.create_user(
            username="admin_csrf_test",
            password="StrongAdminPassword123!",
            is_staff=True,
        )
        csrf_client.force_login(staff_user)
        resp = csrf_client.post(
            self.verify_url,
            data=json.dumps({"code": "BRT-2026-884"}),
            content_type="application/json",
        )
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        self._assert_no_sensitive_leakage(resp)

    # ------------------------------------------------------------------------
    # 13. Database Connection Failures (Zero Credential Leakage)
    # ------------------------------------------------------------------------
    def test_13_database_connection_failure_returns_safe_503(self):
        simulated_db_error = OperationalError(
            "FATAL: password authentication failed for user 'briticana_app' at host 127.0.0.1:5432"
        )
        with patch("apps.api.views.connection.ensure_connection", side_effect=simulated_db_error):
            health_resp = self.client.get(self.health_url)
            self.assertEqual(health_resp.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)
            self.assertEqual(health_resp.json()["database"], "unavailable")
            self._assert_no_sensitive_leakage(health_resp)

            verify_resp = self.client.post(
                self.verify_url,
                data=json.dumps({"code": "BRT-2026-884"}),
                content_type="application/json",
            )
            self.assertEqual(verify_resp.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)
            self.assertEqual(verify_resp.json()["error"]["code"], "service_unavailable")
            self._assert_no_sensitive_leakage(verify_resp)

    # ------------------------------------------------------------------------
    # 14. Unhandled Server Errors (Zero Traceback Leakage)
    # ------------------------------------------------------------------------
    def test_14_unhandled_server_error_returns_safe_500(self):
        simulated_bug = RuntimeError(
            "Internal failure reading /var/secrets/private.key with SECRET_KEY"
        )
        with patch.object(
            VerificationSecurityCheckAPIView,
            "_handle_verification_request",
            side_effect=simulated_bug,
        ):
            resp = self.client.post(
                self.verify_url,
                data=json.dumps({"code": "BRT-2026-884"}),
                content_type="application/json",
            )
            self.assertEqual(resp.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
            self.assertEqual(
                resp.json(),
                {
                    "error": {
                        "code": "internal_error",
                        "message": "An unexpected server error occurred.",
                    }
                },
            )
            self._assert_no_sensitive_leakage(resp)

    # ------------------------------------------------------------------------
    # 15. Security Headers, Log Redaction & File Upload Security Preparation
    # ------------------------------------------------------------------------
    def test_15_security_headers_present_on_api_responses(self):
        resp = self.client.get(self.health_url)
        self.assertEqual(resp.headers.get("X-Content-Type-Options"), "nosniff")
        self.assertEqual(resp.headers.get("X-Frame-Options"), "DENY")
        self.assertEqual(
            resp.headers.get("Referrer-Policy"),
            "strict-origin-when-cross-origin",
        )
        self.assertIn("default-src 'none'", resp.headers.get("Content-Security-Policy", ""))
        self.assertIn("no-store", resp.headers.get("Cache-Control", ""))

    def test_16_log_redaction_filter_scrubs_codes_passwords_and_pii(self):
        redactor = SensitiveDataRedactionFilter()
        record = logging.LogRecord(
            name="apps.security",
            level=logging.WARNING,
            pathname=__file__,
            lineno=1,
            msg="Attempt with code=BRT-2026-884 email=student@example.com password=supersecret Bearer eyJhbGciOi",
            args=(),
            exc_info=None,
        )
        redactor.filter(record)
        self.assertNotIn("BRT-2026-884", record.msg)
        self.assertNotIn("student@example.com", record.msg)
        self.assertNotIn("supersecret", record.msg)
        self.assertNotIn("eyJhbGciOi", record.msg)
        self.assertIn("[REDACTED", record.msg)

    def test_17_file_upload_security_validators(self):
        valid_pdf = SimpleUploadedFile(
            "Jane_Doe_Resume.pdf",
            b"%PDF-1.7\n%valid pdf content",
            content_type="application/pdf",
        )
        validate_resume_upload(valid_pdf)
        safe_name = generate_safe_storage_filename(valid_pdf.name)
        self.assertTrue(safe_name.endswith(".pdf"))
        self.assertNotIn("..", safe_name)

        double_ext = SimpleUploadedFile(
            "resume_script.sh.pdf",
            b"%PDF-1.7\n%benign test bytes",
            content_type="application/pdf",
        )
        with self.assertRaises(DjangoValidationError):
            validate_resume_upload(double_ext)

        spoofed_pdf = SimpleUploadedFile(
            "resume.pdf",
            b"INVALID_HEADER_BYTES_1234",
            content_type="application/pdf",
        )
        with self.assertRaises(DjangoValidationError):
            validate_resume_upload(spoofed_pdf)

    # ------------------------------------------------------------------------
    # 18. Real Backed-Up Verification Records & Normalization Tests
    # ------------------------------------------------------------------------
    def test_18_backed_up_verification_records_import_and_lookup(self):
        out = io.StringIO()
        call_command("import_verification_backup", stdout=out)
        self.assertEqual(CertificateVerification.objects.count(), 4)

        # Idempotent second run must not create duplicates
        call_command("import_verification_backup", stdout=out)
        self.assertEqual(CertificateVerification.objects.count(), 4)

        # Lookup BRT-2026-884 via POST
        cache.clear()
        resp = self.client.post(
            self.verify_url,
            data=json.dumps({"code": "BRT-2026-884"}),
            content_type="application/json",
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        body = resp.json()
        self.assertTrue(body["verified"])
        self.assertEqual(
            body["record"],
            {
                "code": "BRT-2026-884",
                "name": "Priya Nair",
                "domain": "Data Analysis & Business Intelligence",
                "duration": "3 months",
                "region": "Germany",
                "status": "Completed",
                "certificateIssued": True,
                "mentorEvaluation": "Excellent",
            },
        )
        # Ensure internal fields (id, created_at, updated_at) are NOT exposed
        self.assertNotIn("id", body["record"])
        self.assertNotIn("created_at", body["record"])
        self.assertNotIn("updated_at", body["record"])

    def test_19_lowercase_and_whitespace_input_normalization(self):
        call_command("import_verification_backup", stdout=io.StringIO())
        cache.clear()
        resp = self.client.post(
            self.verify_url,
            data=json.dumps({"code": "  brt-2026-001  "}),
            content_type="application/json",
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        body = resp.json()
        self.assertTrue(body["verified"])
        self.assertEqual(body["record"]["code"], "BRT-2026-001")
        self.assertEqual(body["record"]["name"], "John Doe")
        self.assertEqual(body["record"]["region"], "United Kingdom")

    def test_20_backed_up_applications_import_and_idempotency(self):
        call_command("import_verification_backup", stdout=io.StringIO())
        call_command("import_applications_backup", stdout=io.StringIO())
        self.assertEqual(ApplicationSubmission.objects.count(), 59)
        self.assertEqual(
            ApplicationSubmission.objects.filter(is_test_record=False).count(), 51
        )
        self.assertEqual(
            ApplicationSubmission.objects.filter(is_test_record=True).count(), 8
        )
        self.assertEqual(CertificateVerification.objects.count(), 4)

        # Idempotent second run must not create duplicate records
        call_command("import_applications_backup", stdout=io.StringIO())
        self.assertEqual(ApplicationSubmission.objects.count(), 59)
        self.assertEqual(CertificateVerification.objects.count(), 4)

        row_9 = ApplicationSubmission.objects.get(source_row_number=9)
        self.assertEqual(row_9.full_name, "Muhammad Babaji")
        self.assertEqual(row_9.email, "babajimuhammad6860@gmail.com")
        self.assertEqual(row_9.country, "Nigeria")
        self.assertEqual(row_9.university, "Yobe State University")
        self.assertEqual(row_9.duration, "3 Months")
        self.assertTrue(row_9.resume_url.startswith("https://"))
        self.assertEqual(len(row_9.raw_backup_data), 36)

    def test_21_admin_auth_login_session_logout_and_protected_access(self):
        call_command("ensure_local_admin", stdout=io.StringIO())
        # Second call preserves existing password
        call_command("ensure_local_admin", stdout=io.StringIO())

        login_url = reverse("api_v1:admin-auth-login")
        session_url = reverse("api_v1:admin-auth-session")
        logout_url = reverse("api_v1:admin-auth-logout")
        verifications_url = reverse("api_v1:admin-verifications")

        # Unauthenticated access is blocked
        unauth = self.client.get(verifications_url)
        self.assertIn(
            unauth.status_code,
            (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN),
        )

        # Wrong password rejected with 401
        bad_login = self.client.post(
            login_url,
            data=json.dumps({"username": "Aswin", "password": "wrongpassword"}),
            content_type="application/json",
        )
        self.assertEqual(bad_login.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(bad_login.json()["authenticated"])

        # Valid login succeeds and returns signed token
        ok_login = self.client.post(
            login_url,
            data=json.dumps({"username": "Aswin", "password": "aswin@1234"}),
            content_type="application/json",
        )
        self.assertEqual(ok_login.status_code, status.HTTP_200_OK)
        body = ok_login.json()
        self.assertTrue(body["authenticated"])
        token = body["token"]
        self.assertTrue(token)

        # Session check with Bearer token succeeds
        sess_resp = self.client.get(
            session_url,
            HTTP_AUTHORIZATION=f"Bearer {token}",
        )
        self.assertEqual(sess_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(sess_resp.json()["user"]["username"], "Aswin")

        # Logout revokes the server-side session & token
        fresh_client = Client()
        logout_resp = fresh_client.post(
            logout_url,
            content_type="application/json",
            HTTP_AUTHORIZATION=f"Bearer {token}",
        )
        self.assertEqual(logout_resp.status_code, status.HTTP_200_OK)

        after_logout = fresh_client.get(
            session_url,
            HTTP_AUTHORIZATION=f"Bearer {token}",
        )
        self.assertIn(
            after_logout.status_code,
            (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN),
        )

    def test_22_admin_verification_crud_duplicate_rejection_and_public_lookup(self):
        call_command("ensure_local_admin", stdout=io.StringIO())
        call_command("import_verification_backup", stdout=io.StringIO())

        login_resp = self.client.post(
            reverse("api_v1:admin-auth-login"),
            data=json.dumps({"username": "Aswin", "password": "aswin@1234"}),
            content_type="application/json",
        )
        token = login_resp.json()["token"]
        auth_header = f"Bearer {token}"
        verifications_url = reverse("api_v1:admin-verifications")

        # 1. Create new verification record (GTR94TY17 / Abhinand K)
        create_resp = self.client.post(
            verifications_url,
            data=json.dumps(
                {
                    "code": "GTR94TY17",
                    "student_name": "Abhinand K",
                    "domain": "Web Development",
                    "duration": "3 Months",
                    "region": "United Kingdom",
                    "status": "Completed",
                    "certificate_issued": True,
                    "mentor_evaluation": "Excellent",
                }
            ),
            content_type="application/json",
            HTTP_AUTHORIZATION=auth_header,
        )
        self.assertEqual(create_resp.status_code, status.HTTP_201_CREATED)
        created_record = create_resp.json()["record"]
        self.assertEqual(created_record["code"], "GTR94TY17")
        record_id = created_record["id"]

        # 2. Public verification lookup immediately finds GTR94TY17
        cache.clear()
        pub_resp = self.client.post(
            self.verify_url,
            data=json.dumps({"code": "GTR94TY17"}),
            content_type="application/json",
        )
        self.assertEqual(pub_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(
            pub_resp.json()["record"],
            {
                "code": "GTR94TY17",
                "name": "Abhinand K",
                "domain": "Web Development",
                "duration": "3 Months",
                "region": "United Kingdom",
                "status": "Completed",
                "certificateIssued": True,
                "mentorEvaluation": "Excellent",
            },
        )

        # 3. Duplicate code is rejected with 400 and clear message
        dup_resp = self.client.post(
            verifications_url,
            data=json.dumps(
                {
                    "code": "gtr94ty17",
                    "student_name": "Another Student",
                    "domain": "Data Science",
                    "duration": "3 Months",
                    "region": "Ireland",
                    "status": "Completed",
                }
            ),
            content_type="application/json",
            HTTP_AUTHORIZATION=auth_header,
        )
        self.assertEqual(dup_resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            "already exists",
            dup_resp.json()["error"]["message"].lower(),
        )

        # 4. Edit existing record and verify public endpoint reflects updated data
        detail_url = reverse("api_v1:admin-verification-detail", kwargs={"pk": record_id})
        update_resp = self.client.put(
            detail_url,
            data=json.dumps(
                {
                    "code": "GTR94TY17",
                    "student_name": "Abhinand K",
                    "domain": "Full-Stack Web Development",
                    "duration": "6 Months",
                    "region": "United Kingdom",
                    "status": "Completed",
                    "certificate_issued": True,
                    "mentor_evaluation": "Distinction",
                }
            ),
            content_type="application/json",
            HTTP_AUTHORIZATION=auth_header,
        )
        self.assertEqual(update_resp.status_code, status.HTTP_200_OK)

        cache.clear()
        pub_updated = self.client.post(
            self.verify_url,
            data=json.dumps({"code": "GTR94TY17"}),
            content_type="application/json",
        )
        self.assertEqual(pub_updated.status_code, status.HTTP_200_OK)
        self.assertEqual(pub_updated.json()["record"]["domain"], "Full-Stack Web Development")
        self.assertEqual(pub_updated.json()["record"]["duration"], "6 Months")
        self.assertEqual(pub_updated.json()["record"]["mentorEvaluation"], "Distinction")

        # 5. Search by student name or code works
        search_resp = self.client.get(
            f"{verifications_url}?search=Abhinand",
            HTTP_AUTHORIZATION=auth_header,
        )
        self.assertEqual(search_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(search_resp.json()["count"], 1)

        # 6. Unauthenticated DELETE is rejected, authenticated DELETE removes the record
        unauth_client = Client()
        unauth_del = unauth_client.delete(detail_url)
        self.assertIn(
            unauth_del.status_code,
            (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN),
        )

        del_resp = self.client.delete(
            detail_url,
            HTTP_AUTHORIZATION=auth_header,
        )
        self.assertEqual(del_resp.status_code, status.HTTP_200_OK)
        self.assertTrue(del_resp.json()["deleted"])
        self.assertEqual(del_resp.json()["code"], "GTR94TY17")

        cache.clear()
        pub_deleted = self.client.post(
            self.verify_url,
            data=json.dumps({"code": "GTR94TY17"}),
            content_type="application/json",
        )
        self.assertEqual(pub_deleted.status_code, status.HTTP_404_NOT_FOUND)
        self.assertFalse(pub_deleted.json()["verified"])
        self.assertIsNone(pub_deleted.json()["record"])

    def test_23_internship_page_content_editor_and_public_protection(self):
        call_command("ensure_local_admin", stdout=io.StringIO())
        call_command("seed_internship_content", stdout=io.StringIO())

        overview_url = reverse(
            "api_v1:internships-content-detail",
            kwargs={"page_key": "internships-overview"},
        )

        # 1. Public user can GET internship page content
        pub_get = self.client.get(overview_url)
        self.assertEqual(pub_get.status_code, status.HTTP_200_OK)
        initial_content = pub_get.json()["content"]
        self.assertEqual(initial_content["heading"], "Browse Internships")
        self.assertEqual(initial_content["duration"], "3 Months")

        # 2. Public user CANNOT modify internship page content
        unauth_client = Client()
        pub_put = unauth_client.put(
            overview_url,
            data=json.dumps(
                {
                    "title": "Hacked",
                    "heading": "Hacked",
                    "duration": "99 Months",
                }
            ),
            content_type="application/json",
        )
        self.assertIn(
            pub_put.status_code,
            (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN),
        )

        # 3. Authenticated admin updates heading and duration -> saved in PostgreSQL
        login_resp = self.client.post(
            reverse("api_v1:admin-auth-login"),
            data=json.dumps({"username": "Aswin", "password": "aswin@1234"}),
            content_type="application/json",
        )
        token = login_resp.json()["token"]

        admin_put = self.client.put(
            overview_url,
            data=json.dumps(
                {
                    "title": initial_content["title"],
                    "heading": "Explore Global Internships",
                    "duration": "3 Months Internship",
                    "description": "Updated internship overview description from admin editor.",
                    "introductory_text": initial_content["introductory_text"],
                    "program_details": initial_content["program_details"],
                    "learning_outcomes": initial_content["learning_outcomes"],
                    "responsibilities": initial_content["responsibilities"],
                    "skills_and_requirements": initial_content["skills_and_requirements"],
                    "benefits_and_features": initial_content["benefits_and_features"],
                    "eligibility_information": initial_content["eligibility_information"],
                    "application_instructions": initial_content["application_instructions"],
                    "cta_button_text": "Apply Today",
                }
            ),
            content_type="application/json",
            HTTP_AUTHORIZATION=f"Bearer {token}",
        )
        self.assertEqual(admin_put.status_code, status.HTTP_200_OK)

        # Verify persisted in PostgreSQL and immediately returned on public GET
        db_obj = InternshipPageContent.objects.get(page_key="internships-overview")
        self.assertEqual(db_obj.heading, "Explore Global Internships")
        self.assertEqual(db_obj.duration, "3 Months Internship")
        self.assertEqual(db_obj.cta_button_text, "Apply Today")

        pub_get_after = unauth_client.get(overview_url)
        self.assertEqual(pub_get_after.status_code, status.HTTP_200_OK)
        self.assertEqual(pub_get_after.json()["content"]["heading"], "Explore Global Internships")
        self.assertEqual(pub_get_after.json()["content"]["duration"], "3 Months Internship")


