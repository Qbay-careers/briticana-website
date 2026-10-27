"""
File & Resume Upload Security Preparation Module (Section 11).
Provides strict validation utilities for future resume/CV handling so that
uploaded files are never automatically trusted.

NOTE: No file upload API endpoint is enabled in this security foundation step.
When file upload functionality is connected later, all file inputs must pass
through `validate_resume_upload` and `generate_safe_storage_filename`.
"""
from pathlib import Path
import re
import uuid
from django.core.exceptions import ValidationError

# Maximum resume size: 5 MB (5,242,880 bytes)
MAX_RESUME_FILE_SIZE_BYTES = 5 * 1024 * 1024

# Strict allowlist of file extensions
ALLOWED_RESUME_EXTENSIONS = frozenset({".pdf", ".doc", ".docx"})

# Explicit blocklist of executable / script extensions (checked across all dot segments)
BLOCKED_EXECUTABLE_EXTENSIONS = frozenset(
    {
        ".exe",
        ".dll",
        ".so",
        ".dylib",
        ".bat",
        ".cmd",
        ".ps1",
        ".vbs",
        ".js",
        ".mjs",
        ".cjs",
        ".ts",
        ".py",
        ".pyc",
        ".sh",
        ".bash",
        ".php",
        ".phtml",
        ".asp",
        ".aspx",
        ".jsp",
        ".jar",
        ".war",
        ".msi",
        ".com",
        ".scr",
        ".hta",
        ".html",
        ".htm",
        ".xhtml",
        ".svg",
        ".xml",
    }
)

# Strict allowlist of Content-Type / MIME types
ALLOWED_RESUME_MIME_TYPES = frozenset(
    {
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }
)

# Magic-byte file header signatures for content verification
MAGIC_SIGNATURES = {
    ".pdf": (b"%PDF-",),
    ".doc": (b"\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1",),
    ".docx": (b"PK\x03\x04",),
}

SAFE_FILENAME_CHARS_REGEX = re.compile(r"[^A-Za-z0-9_-]+")


def sanitize_filename_stem(raw_name: str, max_length: int = 48) -> str:
    """
    Strip directory paths, null bytes, and special characters from a filename stem.
    Prevents path traversal and shell/header injection.
    """
    if not raw_name or "\x00" in raw_name:
        return "document"
    # Extract only the final basename component
    clean_base = Path(raw_name.replace("\\", "/")).name
    stem = clean_base.split(".")[0]
    sanitized = SAFE_FILENAME_CHARS_REGEX.sub("_", stem).strip("_")
    if not sanitized:
        return "document"
    return sanitized[:max_length]


def generate_safe_storage_filename(original_filename: str) -> str:
    """
    Generate a randomized, non-guessable, path-safe filename for private storage.
    """
    ext = Path(original_filename.replace("\\", "/")).suffix.lower()
    if ext not in ALLOWED_RESUME_EXTENSIONS:
        raise ValidationError("Unsupported file extension.")
    safe_stem = sanitize_filename_stem(original_filename)
    unique_prefix = uuid.uuid4().hex
    return f"{unique_prefix}_{safe_stem}{ext}"


def validate_resume_upload(uploaded_file) -> None:
    """
    Validate an uploaded resume/CV file object for:
    1. Non-empty file and size <= 5 MB
    2. No path traversal or null bytes in filename
    3. Extension in ALLOWED_RESUME_EXTENSIONS (.pdf, .doc, .docx)
    4. No double-extension executable tricks (e.g. resume.php.pdf or resume.pdf.exe)
    5. Declared MIME type in ALLOWED_RESUME_MIME_TYPES
    6. Magic-byte file header matches the declared extension
    """
    if uploaded_file is None:
        raise ValidationError("No file was provided.")

    raw_name = getattr(uploaded_file, "name", "") or ""
    if not raw_name or "\x00" in raw_name or ".." in raw_name:
        raise ValidationError("Invalid filename.")

    clean_name = Path(raw_name.replace("\\", "/")).name
    suffixes = [s.lower() for s in Path(clean_name).suffixes]
    if not suffixes:
        raise ValidationError("File must have a valid extension (.pdf, .doc, or .docx).")

    # Block any file containing an executable or script extension in any suffix position
    for suffix in suffixes:
        if suffix in BLOCKED_EXECUTABLE_EXTENSIONS:
            raise ValidationError("Executable or script files are strictly prohibited.")

    final_ext = suffixes[-1]
    if final_ext not in ALLOWED_RESUME_EXTENSIONS:
        raise ValidationError("Only PDF, DOC, and DOCX files are allowed.")

    # Validate file size
    file_size = getattr(uploaded_file, "size", 0) or 0
    if file_size <= 0:
        raise ValidationError("Uploaded file cannot be empty.")
    if file_size > MAX_RESUME_FILE_SIZE_BYTES:
        raise ValidationError("File size exceeds the 5 MB maximum limit.")

    # Validate MIME type if available on the upload object
    content_type = (getattr(uploaded_file, "content_type", "") or "").split(";")[0].strip().lower()
    if content_type and content_type not in ALLOWED_RESUME_MIME_TYPES:
        raise ValidationError("File MIME type is not permitted.")

    # Validate magic bytes (file signature) from the first 8 bytes
    if hasattr(uploaded_file, "read") and hasattr(uploaded_file, "seek"):
        current_pos = uploaded_file.tell() if hasattr(uploaded_file, "tell") else 0
        header_bytes = uploaded_file.read(8)
        uploaded_file.seek(current_pos)

        expected_signatures = MAGIC_SIGNATURES.get(final_ext, ())
        if expected_signatures and not any(header_bytes.startswith(sig) for sig in expected_signatures):
            raise ValidationError("File content signature does not match the declared file type.")
