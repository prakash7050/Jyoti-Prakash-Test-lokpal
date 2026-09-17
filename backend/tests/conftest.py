import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient

from app.database import Base, get_db
from app.main import app

# Fast, isolated SQLite DB per test run (UUID columns work fine via SQLAlchemy's
# generic UUID type fallback on SQLite for the purposes of these tests).
TEST_DATABASE_URL = "sqlite:///:memory:"


@pytest.fixture()
def client():
    engine = create_engine(
        TEST_DATABASE_URL, connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.state.limiter.reset()  # isolate each test from shared in-process rate-limit counters
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


VALID_USER = {
    "name": "Test User",
    "email": "test.user@example.com",
    "mobile": "9876543210",
    "password": "StrongPass1!",
    "confirm_password": "StrongPass1!",
}
