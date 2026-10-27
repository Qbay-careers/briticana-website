"""
ASGI config for Briticana backend project.
Exposes the ASGI callable as a module-level variable named ``application``.
"""
import os
from pathlib import Path
from django.core.asgi import get_asgi_application
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

application = get_asgi_application()
