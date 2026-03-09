# Phase 2 Step 1 — Status ✅ COMPLETE

> **No new files to download.** No backend code has changed since your last download.
> If files change in the future, this guide will say **⬇️ NEW FILES — download required** at the top.

---

## Current status

| Item | Status |
|------|--------|
| Database **curia** | ✅ Created and running |
| `.env` file | ✅ Configured with your password |
| Pre-flight check | ✅ All checks passed |
| Server (`npm start`) | ✅ Running on `localhost:3001` |
| Health check | ✅ `"status": "ok"`, `"database": "connected"` |
| PGAdmin | ✅ Database visible and green |

---

## Daily use — starting the server

If you closed Terminal or restarted your Mac, start the server again:

```bash
cd ~/Desktop/curia/backend && npm start
```

⚠️ **Leave this Terminal open.** The server runs in it.

---

## Health check — verify everything works

Open a **new Terminal tab** (Cmd+T) and paste:

```bash
curl -s http://localhost:3001/health | python3 -m json.tool
```

**✅ Expected output:**

```json
{
    "status": "ok",
    "message": "CURIA Backend is running",
    "timestamp": "...",
    "environment": "development",
    "uptime": 12.345,
    "database": "connected"
}
```

- `"status": "ok"` → server is running
- `"database": "connected"` → PostgreSQL + curia database working

---

## 🔧 Quick fixes

| Error | Fix |
|-------|-----|
| `password authentication failed` | Wrong password in `.env`. Open `.env`, fix `DB_PASSWORD`, restart. |
| `connection refused` | PostgreSQL not running. Open PGAdmin, click on **PostgreSQL 18** to connect. |
| `role "postgres" does not exist` | Run `whoami` in Terminal. Set `DB_USER` to that value in `.env`. |
| `pg_isready: command not found` | Normal with official installer. Ignore — use `npm run check` instead. |

---

<details>
<summary>What was added in Phase 2 Step 1 (technical details)</summary>

### New files (5)

| File | What it does |
|------|-------------|
| `src/config/dbInit.js` | Auto-creates database, runs migrations, wires repositories. Falls back to in-memory if unavailable. |
| `src/repositories/userRepository.js` | User CRUD — works with both in-memory and PostgreSQL. |
| `src/repositories/sessionRepository.js` | Session management — token blacklist, refresh tokens. |
| `src/checkSetup.js` | Pre-flight check — validates .env and PostgreSQL connection before starting. |
| `tests/repositories.test.js` | 24 tests for both repositories. |

### Updated files (3)

| File | What changed |
|------|-------------|
| `src/server.js` | Calls `initializeDatabase()` on startup. |
| `src/routes/auth.js` | Uses `userRepository` instead of in-memory array. |
| `src/middleware/auth.js` | Uses `sessionRepository` for token blacklist. |

**Test count:** 124 tests across 4 suites.

</details>
