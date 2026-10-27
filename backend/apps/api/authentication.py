"""
Server-backed signed session token authentication for the custom /admin dashboard.
Pairs cryptographic signing (django.core.signing) with active server-side session
verification in PostgreSQL (django_session) so logout immediately revokes tokens.
"""
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from django.core import signing
from django.utils import timezone
from rest_framework.authentication import BaseAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed

ADMIN_TOKEN_SALT = "briticana.admin.session.token.v1"


def issue_admin_session_token(user, session_key: str) -> str:
    """Issue a cryptographically signed token bound to an active Django session."""
    payload = {
        "uid": user.pk,
        "uname": user.get_username(),
        "sid": session_key,
    }
    return signing.dumps(payload, salt=ADMIN_TOKEN_SALT)


class AdminSessionTokenAuthentication(BaseAuthentication):
    """
    Authenticates requests bearing `Authorization: Bearer <signed-session-token>`.
    Falls through (returns None) when no Bearer header is present so DRF's
    SessionAuthentication continues to handle cookie-authenticated requests.
    """

    keyword = b"bearer"

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if not auth or auth[0].lower() != self.keyword:
            return None

        if len(auth) != 2:
            raise AuthenticationFailed("Invalid authorization header format.")

        try:
            raw_token = auth[1].decode("utf-8")
        except UnicodeError as exc:
            raise AuthenticationFailed("Invalid token encoding.") from exc

        max_age = getattr(settings, "SESSION_COOKIE_AGE", 28800)
        try:
            payload = signing.loads(
                raw_token,
                salt=ADMIN_TOKEN_SALT,
                max_age=max_age,
            )
        except signing.SignatureExpired as exc:
            raise AuthenticationFailed("Admin session has expired. Please log in again.") from exc
        except signing.BadSignature as exc:
            raise AuthenticationFailed("Invalid admin authentication token.") from exc

        user_id = payload.get("uid")
        session_key = payload.get("sid")
        if not user_id or not session_key:
            raise AuthenticationFailed("Malformed authentication token payload.")

        active_session = Session.objects.filter(
            session_key=session_key,
            expire_date__gt=timezone.now(),
        ).first()
        if active_session is None:
            raise AuthenticationFailed("Session has been logged out or expired.")

        UserModel = get_user_model()
        user = UserModel.objects.filter(pk=user_id, is_active=True, is_staff=True).first()
        if user is None:
            raise AuthenticationFailed("Authorized administrator account not found.")

        return (user, payload)
