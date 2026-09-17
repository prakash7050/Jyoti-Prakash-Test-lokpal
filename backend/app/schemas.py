import re
import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, field_validator, model_validator, ConfigDict

MOBILE_RE = re.compile(r"^[6-9]\d{9}$")  # Indian 10-digit mobile, adjust as needed
PASSWORD_RE = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$")


def strip_html(value: str) -> str:
    """Basic XSS hardening: strip tags/angle-brackets from free-text input before it is stored."""
    return re.sub(r"<[^>]*>", "", value).strip()


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    password: str
    confirm_password: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v):
        v = strip_html(v)
        if len(v) < 2 or len(v) > 100:
            raise ValueError("Name must be between 2 and 100 characters")
        return v

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, v):
        if not MOBILE_RE.match(v):
            raise ValueError("Enter a valid 10-digit mobile number")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if not PASSWORD_RE.match(v):
            raise ValueError(
                "Password must be 8+ chars with an uppercase, lowercase, digit and special character"
            )
        return v

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Password and Confirm Password do not match")
        return self


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserProfile(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: EmailStr
    mobile: str
    created_at: datetime
    updated_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    csrf_token: str


class MessageResponse(BaseModel):
    message: str
    csrf_token: str | None = None


class NotificationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    message: str
    is_read: bool
    created_at: datetime


class NotificationPage(BaseModel):
    """Cursor pagination envelope: next_cursor is opaque (base64 of created_at+id), null when exhausted."""
    items: List[NotificationOut]
    next_cursor: Optional[str] = None
