import uuid

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.security import decode_access_token


def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
) -> User:
    # Read JWT from httpOnly cookie
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    # Decode and validate JWT
    user_id = decode_access_token(token)

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    # Validate UUID before querying database
    try:
        user_uuid = uuid.UUID(user_id)
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user token",
        )

    # Find active user
    user = (
        db.query(User)
        .filter(
            User.id == user_uuid,
            User.is_active.is_(True),
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user


def verify_csrf(request: Request):
    """
    Validate double-submit CSRF token.

    The backend sets:
        csrf_token=<signed token>

    Frontend sends:
        X-CSRF-Token=<raw token>
    """

    from app.security import verify_csrf_token

    cookie_token = request.cookies.get("csrf_token")
    header_token = request.headers.get("X-CSRF-Token")

    if not cookie_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="CSRF cookie missing",
        )

    if not header_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="CSRF header missing",
        )

    if not verify_csrf_token(
        cookie_token,
        header_token,
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="CSRF validation failed",
        )