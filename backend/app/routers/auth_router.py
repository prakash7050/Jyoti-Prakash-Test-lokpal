from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db
from app.config import settings
from app.limiter import limiter
from app.models import User, RefreshToken
from app.schemas import UserRegister, UserLogin, MessageResponse
from app.security import (
    hash_password,
    verify_password,
    create_access_token,
    generate_refresh_token,
    hash_refresh_token,
    generate_csrf_token,
    sign_csrf_token,
)
from app.deps import get_current_user, verify_csrf

router = APIRouter(tags=["auth"])


def _set_auth_cookies(response: Response, access_token: str, refresh_token_raw: str, csrf_signed: str):
    common = dict(
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        path="/",
    )
    response.set_cookie("access_token", access_token, max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60, **common)
    response.set_cookie(
        "refresh_token", refresh_token_raw, max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400, **common
    )
    # csrf_token cookie is intentionally NOT httponly -- the frontend JS reads it
    # and echoes it in the X-CSRF-Token header (double-submit pattern).
    response.set_cookie(
        "csrf_token",
        csrf_signed,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        httponly=False,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        path="/",
    )


@router.post("/register", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.RATE_LIMIT_REGISTER)
def register(request: Request, payload: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(or_(User.email == payload.email, User.mobile == payload.mobile)).first()
    if existing:
        field = "email" if existing.email == payload.email else "mobile"
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"An account with this {field} already exists")

    user = User(
        name=payload.name,
        email=payload.email,
        mobile=payload.mobile,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    return MessageResponse(message="Registration successful. Please log in.")


@router.post("/login", response_model=MessageResponse)
@limiter.limit(settings.RATE_LIMIT_LOGIN)
def login(request: Request, response: Response, payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    # Same generic error whether email or password is wrong -- avoids user enumeration.
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is disabled")

    access_token = create_access_token(str(user.id))
    refresh_raw, refresh_hash, expires_at = generate_refresh_token()
    db.add(RefreshToken(user_id=user.id, token_hash=refresh_hash, expires_at=expires_at))
    db.commit()

    csrf_raw = generate_csrf_token()
    _set_auth_cookies(response, access_token, refresh_raw, sign_csrf_token(csrf_raw))
    return MessageResponse(message="Login successful")


@router.post("/refresh", response_model=MessageResponse)
def refresh(request: Request, response: Response, db: Session = Depends(get_db)):
    raw = request.cookies.get("refresh_token")
    if not raw:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh token")

    token_hash = hash_refresh_token(raw)
    record = db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash, RefreshToken.revoked.is_(False)).first()
    if not record or record.expires_at.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token invalid or expired")

    # Rotate: revoke old, issue new (mitigates replay if a refresh token is ever stolen)
    record.revoked = True
    new_raw, new_hash, new_expiry = generate_refresh_token()
    db.add(RefreshToken(user_id=record.user_id, token_hash=new_hash, expires_at=new_expiry))
    db.commit()

    access_token = create_access_token(str(record.user_id))
    csrf_raw = generate_csrf_token()
    _set_auth_cookies(response, access_token, new_raw, sign_csrf_token(csrf_raw))
    return MessageResponse(message="Token refreshed")


@router.post("/logout", response_model=MessageResponse, dependencies=[Depends(verify_csrf)])
def logout(request: Request, response: Response, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    raw = request.cookies.get("refresh_token")
    if raw:
        token_hash = hash_refresh_token(raw)
        db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash).update({"revoked": True})
        db.commit()

    for cookie_name in ("access_token", "refresh_token", "csrf_token"):
        response.delete_cookie(cookie_name, path="/")
    return MessageResponse(message="Logged out")
