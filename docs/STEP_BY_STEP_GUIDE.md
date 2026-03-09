# Phase 2 Step 1 — COMPLETE ✅

## ⬇️ NEW FILES — download required

| # | File | What changed | Download to |
|---|------|-------------|-------------|
| 1 | `sessionRepository.js` | **Session persistence:** logout blacklist + refresh tokens now save to PostgreSQL | `backend/src/repositories/sessionRepository.js` |
| 2 | `migrations.js` | **New table:** `revoked_tokens` added for token blacklist persistence | `backend/src/config/migrations.js` |
| 3 | `dbInit.js` | **Async init:** session cache loads from DB on startup | `backend/src/config/dbInit.js` |

> **What changed?** Sessions and token blacklists were only in memory — lost on every server restart. Now they persist to PostgreSQL (`user_sessions` + `revoked_tokens` tables). The in-memory stores act as a fast cache.

---

## Step 1 — Download the 3 updated files

Download these files from the PR and replace your local copies:

```
backend/src/repositories/sessionRepository.js
backend/src/config/migrations.js
backend/src/config/dbInit.js
```

(Your local paths: `~/Desktop/curia/backend/src/repositories/sessionRepository.js`, etc.)

---

## Step 2 — Stop the server if running

Go to the Terminal where the server is running and press **Ctrl+C**.

---

## Step 3 — Start the server

```bash
cd ~/Desktop/curia/backend && npm start
```

You should see:
- `✅ revoked_tokens table created` (new table!)
- `✅ Database initialised — repositories connected to PostgreSQL`

⚠️ **Leave this Terminal open.**

---

## Step 4 — Open a new Terminal tab

Press **Cmd+T** to open a new tab. All curl commands go here.

---

## Step 5 — Login (your existing user still works)

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@curia.com","password":"MyPass123!"}' \
  | python3 -m json.tool
```

**✅ Expected:** `"success": true` and `"Login successful"`.

**Save the `accessToken` and `refreshToken` from the output** — you'll need them for the next steps.

---

## Step 6 — Test logout (token gets blacklisted in DB)

Replace `YOUR_ACCESS_TOKEN` with the `accessToken` from Step 5:

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  | python3 -m json.tool
```

**✅ Expected:** `"success": true` and `"Logout successful"`.

---

## Step 7 — Verify the token is blacklisted

Try using the same token again:

```bash
curl -s -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  | python3 -m json.tool
```

**✅ Expected:** Error message — the token was revoked and cannot be used.

---

## Step 8 — Test refresh token rotation

Use the `refreshToken` from Step 5:

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}' \
  | python3 -m json.tool
```

**✅ Expected:** New `accessToken` and `refreshToken` pair. The old refresh token is now invalid.

---

## Step 9 — Check PGAdmin for session data

1. Open **PGAdmin** → **PostgreSQL 18** → **Databases** → **curia**
2. **Schemas** → **public** → **Tables** → right-click **user_sessions** → **View/Edit Data** → **All Rows**
3. You should see session rows with `is_valid` = `true` (active) and `false` (revoked)
4. Also check **revoked_tokens** table — right-click → **View/Edit Data** → **All Rows**
5. You should see the blacklisted token hash from Step 6

---

## Step 10 — Stop and restart the server

1. Go to the **first Terminal tab** and press **Ctrl+C**
2. Start again: `npm start`
3. Wait for `✅ Database initialised — repositories connected to PostgreSQL`

---

## Step 11 — Login again (proves everything survives restart)

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@curia.com","password":"MyPass123!"}' \
  | python3 -m json.tool
```

**✅ Expected:** `"success": true` — user, sessions, and blacklist all survived the restart.

---

## ✅ Phase 2 Step 1 — COMPLETE!

Everything persists to PostgreSQL:
- ✅ Users (register/login survive restart)
- ✅ Sessions (refresh tokens tracked in `user_sessions` table)
- ✅ Token blacklist (revoked tokens in `revoked_tokens` table)
- ✅ Refresh token rotation (old tokens invalidated in DB)

**Next up: Step 2 — Gealan PVC Integration** (no downloads needed yet — will announce when files change)

---

## 🔧 Quick fixes

| Error | Fix |
|-------|-----|
| `"A user with this email already exists"` | Good — you already registered. Just login (Step 5). |
| `password authentication failed` | Wrong password in `.env`. Open `.env`, fix `DB_PASSWORD`, restart. |
| `connection refused` | PostgreSQL not running. Open PGAdmin, click on **PostgreSQL 18** to connect. |
| `Cannot POST /api/v1/auth/login` | Server not running. Go to first tab, run `npm start`. |

---

## 🖥️ Daily-use commands

```bash
# Start server (Terminal 1)
cd ~/Desktop/curia/backend && npm start

# Health check (Terminal 2)
curl -s http://localhost:3001/health | python3 -m json.tool

# Login
curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@curia.com","password":"MyPass123!"}' \
  | python3 -m json.tool
```
