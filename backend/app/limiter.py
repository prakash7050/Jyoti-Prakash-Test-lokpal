from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import settings

# Single shared instance -- routers import this (for @limiter.limit(...)) and
# main.py attaches the same object to app.state.limiter, so there is exactly
# one rate-limit counter store for the whole app (and one to reset in tests).
limiter = Limiter(key_func=get_remote_address, default_limits=[settings.RATE_LIMIT_DEFAULT])
