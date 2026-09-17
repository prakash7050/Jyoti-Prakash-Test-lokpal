from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.database import Base, engine
from app.limiter import limiter
from app.routers import auth_router, user_router, notifications_router

app = FastAPI(title="Secure Auth API", version="1.0.0")


@app.on_event("startup")
def on_startup():
    # Table creation runs against the real configured DB at server startup only --
    # kept out of module import time so tests (which override get_db with their own
    # in-memory engine and create their own tables in conftest.py) aren't affected
    # even if the real DATABASE_URL isn't reachable in the test environment.
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as exc:  # pragma: no cover
        import logging

        logging.getLogger("uvicorn.error").warning("Skipping create_all: %s", exc)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,  # required so the browser sends/receives auth cookies
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "X-CSRF-Token"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    # Baseline XSS / MIME-sniffing / clickjacking hardening
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    return response


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Normalize pydantic's verbose error shape into a flat, frontend-friendly list
    errors = [{"field": ".".join(str(x) for x in e["loc"][1:]), "message": e["msg"]} for e in exc.errors()]
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content={"detail": errors})


app.include_router(auth_router.router, prefix="/api")
app.include_router(user_router.router, prefix="/api")
app.include_router(notifications_router.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}
