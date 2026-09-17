from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/authdb"

    # JWT
    JWT_SECRET_KEY: str = "change-this-in-production-to-a-random-64-char-string"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CSRF
    CSRF_SECRET_KEY: str = "change-this-csrf-secret-too"

    # Cookies
    COOKIE_SECURE: bool = False  # set True in production (HTTPS only)
    COOKIE_SAMESITE: str = "lax"

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    # Rate limiting
    RATE_LIMIT_LOGIN: str = "5/minute"
    RATE_LIMIT_REGISTER: str = "3/minute"
    RATE_LIMIT_DEFAULT: str = "100/minute"

    class Config:
        env_file = ".env"


settings = Settings()
