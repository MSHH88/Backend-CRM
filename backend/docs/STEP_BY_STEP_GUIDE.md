# Phase 2 Step 1 — COMPLETE ✅

> **No new files to download.** When future steps change files, we'll say: "⬇️ NEW FILES — download required"

---

## 🖥️ Daily-use commands

```bash
# Start server (Terminal 1)
cd ~/Desktop/curia/backend && npm start

# Stop server
# Press Ctrl+C in the server Terminal — it stops immediately
# If it doesn't stop: press Ctrl+C again (forces exit)

# Health check (Terminal 2)
curl -s http://localhost:3001/health | python3 -m json.tool

# Login
curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@curia.com","password":"MyPass123!"}' \
  | python3 -m json.tool
```

---

## ✅ What's working

| Feature | Status |
|---------|--------|
| PostgreSQL connection | ✅ Connected |
| User registration | ✅ Persists to DB |
| Login | ✅ Returns JWT tokens |
| Logout (token blacklist) | ✅ Persists to DB |
| Refresh token rotation | ✅ Persists to DB |
| Session tracking | ✅ `user_sessions` table |
| Token revocation | ✅ `revoked_tokens` table |
| Data survives restart | ✅ Verified |
| Rate limiting on auth | ✅ 5 attempts/min per IP+email |
| Failed login tracking | ✅ Account locks after 5 failures (30 min) |
| Name validation | ✅ Trimmed, max 100 chars |
| Error handling | ✅ All endpoints have try-catch |
| Ctrl+C stops server | ✅ Fixed (double Ctrl+C = force exit) |
| 128 tests passing | ✅ All green |

---

## 🔧 Quick fixes

| Error | Fix |
|-------|-----|
| `password authentication failed` | Wrong password in `.env`. Open `.env`, fix `DB_PASSWORD`, restart. |
| `connection refused` | PostgreSQL not running. Open PGAdmin, click on **PostgreSQL 18** to connect. |
| Ctrl+C doesn't stop server | Press Ctrl+C a second time. Or close the Terminal tab. |
| `Cannot POST /api/v1/auth/login` | Server not running. Go to first tab, run `npm start`. |
| `Account temporarily locked` | Too many failed login attempts. Wait 30 minutes or check DB. |

---

**Next up: Step 2 — Gealan PVC Integration** (will announce when files change)
