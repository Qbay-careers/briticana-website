"""
Settings entry point.
Selects local or production settings based on DJANGO_ENV (default: local).
"""
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

DJANGO_ENV = os.environ.get("DJANGO_ENV", "local").strip().lower()

if DJANGO_ENV == "production":
    from .production import *  # noqa: F401, F403
else:
    from .local import *  # noqa: F401, F403
