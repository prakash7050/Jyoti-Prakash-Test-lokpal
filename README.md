# Secure Auth App — React (TypeScript) + FastAPI + PostgreSQL

A production-style user registration, login and profile module built for the
Lokpal of India practical test, extended with the additional requirements
(Redux + Context, cursor pagination, chunked batch writes, CSRF/XSS hardening,
responsive animated UI, pytest + Cypress tests).

## ⚠️ One deliberate deviation from the request

You asked for **localStorage** to hold user/auth data. The test brief itself
(section 6, Security) requires **"HttpOnly cookie token handling"** — and
storing a JWT in localStorage is readable by any injected script, which
directly undermines the CSRF/XSS protections also required. So:

- The JWT **access token** and **refresh token** live in `httpOnly`, `SameSite`
  cookies. JavaScript never reads or writes them.
- A separate, non-httpOnly `csrf_token` cookie implements the **double-submit
  CSRF pattern**: the frontend reads it and echoes it in an `X-CSRF-Token`
  header on every state-changing request; the backend checks the two match.
- `localStorage` is used only for a genuinely non-sensitive value: the
  light/dark theme preference.

## Project layout

```
backend/     FastAPI + SQLAlchemy + PostgreSQL, JWT/CSRF auth, pytest suite
frontend/    React 18 + TypeScript + Vite, Redux Toolkit + Context, Tailwind,
             Framer Motion, Cypress e2e tests
```

## Backend — setup

```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # then edit DATABASE_URL, JWT_SECRET_KEY, CSRF_SECRET_KEY
uvicorn app.main:app --reload --port 8000
```

Requires a running PostgreSQL instance matching `DATABASE_URL`. Tables are
created automatically on startup (`Base.metadata.create_all`).

Run tests (uses an isolated in-memory SQLite DB, no PostgreSQL needed):

```bash
pytest -q
```

### API endpoints

| Method | Path                        | Auth | Purpose                                  |
|--------|-----------------------------|------|-------------------------------------------|
| POST   | `/api/register`             | —    | Create account                            |
| POST   | `/api/login`                | —    | Authenticate, sets auth cookies           |
| POST   | `/api/refresh`              | —    | Rotate access token via refresh cookie    |
| POST   | `/api/logout`               | ✓ + CSRF | Revoke session, clear cookies         |
| GET    | `/api/user/profile`         | ✓    | Current user's profile                    |
| GET    | `/api/notifications`        | ✓    | Cursor-paginated notification list        |
| POST   | `/api/notifications/seed-demo` | ✓ + CSRF | Chunked batch insert (demo data)  |

### Security implemented

- Password hashing with bcrypt (passlib)
- JWT access tokens (15 min) + opaque, hashed, rotating refresh tokens (7 days), both in httpOnly cookies
- CSRF double-submit token on all mutating requests
- Rate limiting on `/register` and `/login` (slowapi)
- Input validation (Pydantic v2: email, 10-digit mobile, password complexity)
- Duplicate email/mobile rejected with a 409
- SQL injection protection via SQLAlchemy ORM (no raw string queries)
- Basic XSS hardening: HTML-tag stripping on free-text input, `Content-Security-Policy`,
  `X-Content-Type-Options`, `X-Frame-Options` response headers
- CORS restricted to configured origins with credentials support

## Frontend — setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev          # http://localhost:5173, proxies /api to :8000
```

Build for production: `npm run build` (type-checks with `tsc -b`, then bundles with Vite).

### What's inside

- **Redux Toolkit** (`src/store`) — auth session state (`user`, status, error) via async thunks
- **React Context** (`src/context`) — theme (light/dark, localStorage) and a global toast/notification system
- **Pages**: Home, About (profile), Contact, Login, Register, Dashboard (protected)
- **react-hook-form + zod** — client-side validation mirroring the backend rules exactly
- **Axios client** (`src/api/axiosClient.ts`) — `withCredentials`, auto CSRF header injection,
  automatic silent-refresh-and-retry on a 401
- **Cursor pagination UI** — Dashboard's notification feed calls `/api/notifications` with a
  `cursor` param and a "Load more" button, matching the backend's keyset pagination
- **Responsive, animated UI** — Tailwind CSS (mobile/tablet/desktop breakpoints), Framer Motion
  page/element transitions, a hero background image loaded from a public URL

### Tests — Cypress

```bash
npm run cypress:run   # headless; needs both dev servers running (:5173 and :8000)
# or
npm run cypress:open  # interactive
```

Covers: unauthenticated dashboard redirect, weak-password rejection, full
register → login → dashboard flow, and logout.

## Notes on scope

- **"Big data chunk/batch processing"**: demonstrated via `POST /notifications/seed-demo`,
  which inserts in bounded batches (500 rows/commit) rather than one giant transaction —
  the same pattern you'd use for a real bulk import or export.
- **Cursor pagination**: implemented on the notifications list as the "related data" example
  from your requirements; the same `(created_at, id)` keyset pattern extends to any other
  paginated resource you add later.
- Everything above was written, installed, and verified in this environment: `pytest` (15/15
  passing), `tsc -b`, `vite build`, and `eslint` all run clean, plus a full manual
  register → login → profile → seed → paginate → logout smoke test against the live API.
# Jyoti-Prakash-Test-lokpal
