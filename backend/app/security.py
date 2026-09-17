import base64
import hashlib
import hmac
import secrets
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple

from jose import jwt, JWTError
from passlib.context import CryptContext

from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ---------- Password hashing ----------
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


# ---------- JWT (access token) ----------
def create_access_token(user_id: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),
        "iat": now,
        "exp": now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        "type": "access",
    }
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        if payload.get("type") != "access":
            return None
        return payload.get("sub")
    except JWTError:
        return None


# ---------- Refresh token (opaque, stored hashed in DB so a DB leak doesn't leak usable tokens) ----------
def generate_refresh_token() -> Tuple[str, str, datetime]:
    raw = secrets.token_urlsafe(48)
    token_hash = hashlib.sha256(raw.encode()).hexdigest()
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    return raw, token_hash, expires_at


def hash_refresh_token(raw: str) -> str:
    return hashlib.sha256(raw.encode()).hexdigest()


# ---------- CSRF (double-submit cookie pattern) ----------
def generate_csrf_token() -> str:
    return secrets.token_urlsafe(32)


def sign_csrf_token(token: str) -> str:
    sig = hmac.new(settings.CSRF_SECRET_KEY.encode(), token.encode(), hashlib.sha256).hexdigest()
    return f"{token}.{sig}"


def verify_csrf_token(signed_token: str, header_token: str) -> bool:
    """Cookie carries the signed token; the client must echo the raw token in a header.
    A page under XSS could read localStorage, but this cookie is NOT httpOnly by necessity
    (JS must read it to set the header) -- the real protection is that it's checked against
    the header on every state-changing request, defeating simple cross-site form/image CSRF."""
    try:
        token, sig = signed_token.rsplit(".", 1)
    except ValueError:
        return False
    expected_sig = hmac.new(settings.CSRF_SECRET_KEY.encode(), token.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected_sig, sig) and hmac.compare_digest(token, header_token)


# ---------- Cursor pagination ----------
def encode_cursor(created_at: datetime, item_id: uuid.UUID) -> str:
    raw = f"{created_at.isoformat()}|{item_id}"
    return base64.urlsafe_b64encode(raw.encode()).decode()


def decode_cursor(cursor: str) -> Tuple[datetime, uuid.UUID]:
    raw = base64.urlsafe_b64decode(cursor.encode()).decode()
    ts_str, id_str = raw.split("|")
    return datetime.fromisoformat(ts_str), uuid.UUID(id_str)
