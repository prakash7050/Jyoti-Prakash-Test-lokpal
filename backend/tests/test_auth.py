from tests.conftest import VALID_USER


def test_register_success(client):
    resp = client.post("/api/register", json=VALID_USER)
    assert resp.status_code == 201
    assert "successful" in resp.json()["message"].lower()


def test_register_duplicate_email_rejected(client):
    client.post("/api/register", json=VALID_USER)
    resp = client.post("/api/register", json={**VALID_USER, "mobile": "9999999999"})
    assert resp.status_code == 409


def test_register_duplicate_mobile_rejected(client):
    client.post("/api/register", json=VALID_USER)
    resp = client.post("/api/register", json={**VALID_USER, "email": "other@example.com"})
    assert resp.status_code == 409


def test_register_password_mismatch_rejected(client):
    resp = client.post("/api/register", json={**VALID_USER, "confirm_password": "Different1!"})
    assert resp.status_code == 422


def test_register_weak_password_rejected(client):
    resp = client.post("/api/register", json={**VALID_USER, "password": "weak", "confirm_password": "weak"})
    assert resp.status_code == 422


def test_register_invalid_mobile_rejected(client):
    resp = client.post("/api/register", json={**VALID_USER, "mobile": "12345"})
    assert resp.status_code == 422


def test_login_success_sets_cookies(client):
    client.post("/api/register", json=VALID_USER)
    resp = client.post("/api/login", json={"email": VALID_USER["email"], "password": VALID_USER["password"]})
    assert resp.status_code == 200
    assert "access_token" in resp.cookies
    assert "refresh_token" in resp.cookies
    assert "csrf_token" in resp.cookies


def test_login_wrong_password_rejected(client):
    client.post("/api/register", json=VALID_USER)
    resp = client.post("/api/login", json={"email": VALID_USER["email"], "password": "WrongPass1!"})
    assert resp.status_code == 401


def test_login_unknown_email_rejected(client):
    resp = client.post("/api/login", json={"email": "nobody@example.com", "password": "StrongPass1!"})
    assert resp.status_code == 401


def test_profile_requires_auth(client):
    resp = client.get("/api/user/profile")
    assert resp.status_code == 401


def test_profile_returns_logged_in_user(client):
    client.post("/api/register", json=VALID_USER)
    client.post("/api/login", json={"email": VALID_USER["email"], "password": VALID_USER["password"]})
    resp = client.get("/api/user/profile")
    assert resp.status_code == 200
    body = resp.json()
    assert body["email"] == VALID_USER["email"]
    assert "password" not in body


def test_logout_requires_csrf_header(client):
    client.post("/api/register", json=VALID_USER)
    client.post("/api/login", json={"email": VALID_USER["email"], "password": VALID_USER["password"]})
    resp = client.post("/api/logout")  # no X-CSRF-Token header
    assert resp.status_code == 403


def test_logout_success_with_csrf(client):
    client.post("/api/register", json=VALID_USER)
    client.post("/api/login", json={"email": VALID_USER["email"], "password": VALID_USER["password"]})
    signed_csrf = client.cookies.get("csrf_token")
    raw_csrf = signed_csrf.split(".")[0]
    resp = client.post("/api/logout", headers={"X-CSRF-Token": raw_csrf})
    assert resp.status_code == 200

    profile_resp = client.get("/api/user/profile")
    assert profile_resp.status_code == 401
