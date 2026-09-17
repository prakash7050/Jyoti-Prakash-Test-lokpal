from tests.conftest import VALID_USER


def _login(client):
    client.post("/api/register", json=VALID_USER)
    client.post("/api/login", json={"email": VALID_USER["email"], "password": VALID_USER["password"]})
    raw_csrf = client.cookies.get("csrf_token").split(".")[0]
    return {"X-CSRF-Token": raw_csrf}


def test_notifications_requires_auth(client):
    resp = client.get("/api/notifications")
    assert resp.status_code == 401


def test_cursor_pagination_pages_through_all_items(client):
    headers = _login(client)
    client.post("/api/notifications/seed-demo?count=45", headers=headers)

    seen_ids = set()
    cursor = None
    pages = 0
    while True:
        resp = client.get("/api/notifications", params={"cursor": cursor} if cursor else {})
        assert resp.status_code == 200
        body = resp.json()
        for item in body["items"]:
            assert item["id"] not in seen_ids  # no duplicates across pages
            seen_ids.add(item["id"])
        pages += 1
        cursor = body["next_cursor"]
        if not cursor:
            break

    assert len(seen_ids) == 45
    assert pages == 3  # 20 + 20 + 5
