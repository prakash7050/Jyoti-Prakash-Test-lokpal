from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.deps import get_current_user, verify_csrf
from app.limiter import limiter
from app.models import RefreshToken, User
from app.schemas import MessageResponse, UserLogin, UserRegister
from app.security import (
    create_access_token,
    generate_csrf_token,
    generate_refresh_token,
    hash_password,
    hash_refresh_token,
    sign_csrf_token,
    verify_password,
)

router = APIRouter(tags=["auth"])


def _set_auth_cookies(
    response: Response,
    access_token: str,
    refresh_token_raw: str,
    csrf_signed: str,
):
    # Auth cookies
    auth_cookie_options = {
        "httponly": True,
        "secure": settings.COOKIE_SECURE,
        "samesite": settings.COOKIE_SAMESITE,
        "path": "/",
    }

    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        **auth_cookie_options,
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token_raw,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        **auth_cookie_options,
    )

    # CSRF cookie must be readable by frontend JavaScript
    response.set_cookie(
        key="csrf_token",
        value=csrf_signed,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        httponly=False,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        path="/",
    )


# ============================================================
# REGISTER
# ============================================================

@router.post(
    "/register",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
)
@limiter.limit(settings.RATE_LIMIT_REGISTER)
def register(
    request: Request,
    payload: UserRegister,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(User)
        .filter(
            or_(
                User.email == payload.email,
                User.mobile == payload.mobile,
            )
        )
        .first()
    )

    if existing:
        field = (
            "email"
            if existing.email == payload.email
            else "mobile"
        )

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"An account with this {field} already exists",
        )

    user = User(
        name=payload.name,
        email=payload.email,
        mobile=payload.mobile,
        password_hash=hash_password(payload.password),
    )

    db.add(user)
    db.commit()

    return MessageResponse(
        message="Registration successful. Please log in."
    )


# ============================================================
# LOGIN
# ============================================================

@router.post(
    "/login",
    response_model=MessageResponse,
)
@limiter.limit(settings.RATE_LIMIT_LOGIN)
def login(
    request: Request,
    response: Response,
    payload: UserLogin,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == payload.email)
        .first()
    )

    if not user or not verify_password(
        payload.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled",
        )

    # Access JWT
    access_token = create_access_token(str(user.id))

    # Refresh token
    refresh_raw, refresh_hash, expires_at = (
        generate_refresh_token()
    )

    db.add(
        RefreshToken(
            user_id=user.id,
            token_hash=refresh_hash,
            expires_at=expires_at,
        )
    )

    db.commit()

    # CSRF
    csrf_raw = generate_csrf_token()
    csrf_signed = sign_csrf_token(csrf_raw)

    _set_auth_cookies(
        response=response,
        access_token=access_token,
        refresh_token_raw=refresh_raw,
        csrf_signed=csrf_signed,
    )

    return MessageResponse(
        message="Login successful",
        csrf_token=csrf_signed,
    )


# ============================================================
# REFRESH
# ============================================================

@router.post(
    "/refresh",
    response_model=MessageResponse,
)
def refresh(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    raw = request.cookies.get("refresh_token")

    if not raw:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No refresh token",
        )

    token_hash = hash_refresh_token(raw)

    record = (
        db.query(RefreshToken)
        .filter(
            RefreshToken.token_hash == token_hash,
            RefreshToken.revoked.is_(False),
        )
        .first()
    )

    if not record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token invalid",
        )

    expires_at = record.expires_at

    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token expired",
        )

    # Revoke old refresh token
    record.revoked = True

    # Generate new refresh token
    new_raw, new_hash, new_expiry = (
        generate_refresh_token()
    )

    db.add(
        RefreshToken(
            user_id=record.user_id,
            token_hash=new_hash,
            expires_at=new_expiry,
        )
    )

    db.commit()

    # New access token
    access_token = create_access_token(
        str(record.user_id)
    )

    # New CSRF token
    csrf_raw = generate_csrf_token()
    csrf_signed = sign_csrf_token(csrf_raw)

    _set_auth_cookies(
        response=response,
        access_token=access_token,
        refresh_token_raw=new_raw,
        csrf_signed=csrf_signed,
    )

    return MessageResponse(
        message="Token refreshed",
        csrf_token=csrf_signed,
    )


# ============================================================
# LOGOUT
# ============================================================

@router.post(
    "/logout",
    response_model=MessageResponse,
    dependencies=[Depends(verify_csrf)],
)
def logout(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    raw = request.cookies.get("refresh_token")

    if raw:
        token_hash = hash_refresh_token(raw)

        (
            db.query(RefreshToken)
            .filter(
                RefreshToken.token_hash == token_hash
            )
            .update({"revoked": True})
        )

        db.commit()

    response.delete_cookie(
        key="access_token",
        path="/",
    )

    response.delete_cookie(
        key="refresh_token",
        path="/",
    )

    response.delete_cookie(
        key="csrf_token",
        path="/",
    )

    return MessageResponse(
        message="Logged out"
    )