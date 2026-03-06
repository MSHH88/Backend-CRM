# Terminal Health Check — Quick Testing Guide

> Repo is **public** — all `curl` commands work directly. Just copy-paste.

---

## Step 1 — Run all tests

```bash
cd ~/Desktop/curia/backend && npm test
```

**You should see:**
```
Test Suites: 3 passed, 3 total
Tests:       93 passed, 93 total
```

> The "Force exiting Jest" message at the end is **normal** — ignore it.

📋 **Paste the last 10 lines back to me.**

---

## Step 2 — Start the server

```bash
cd ~/Desktop/curia/backend && npm start
```

**You should see:**
```
🚀 CURIA Backend Server Started
🌐 Server URL: http://localhost:3001
```

⚠️ **Leave this terminal open! Do NOT close it.**

---

## Step 3 — Test the server (open a NEW terminal tab: Cmd+T)

Press **Cmd+T** to open a new tab. Then paste:

The berechnen endpoint expects a `tmp_obj` field containing a JSON config string. Here is a minimal test config:

```json
{"breite":1000,"hoehe":1200,"profil":"p1","verglasung":"g1","aussenfarbe":"fs1_01","innenfarbe":"fi1_01","schallschutz":"ss1","sicherheitsverglasung":"sv0","griff":"gr1","sicherheit":"si1","sprossen":"sp0","vperfect":"vp0"}
```

Copy-paste this full block to test all 4 endpoints:

```bash
curl http://localhost:3001/health && echo "" && \
curl http://localhost:3001/api/v1 && echo "" && \
curl -X POST http://localhost:3001/ajax/berechnen/ \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'tmp_obj={"breite":1000,"hoehe":1200,"profil":"p1","verglasung":"g1","aussenfarbe":"fs1_01","innenfarbe":"fi1_01","schallschutz":"ss1","sicherheitsverglasung":"sv0","griff":"gr1","sicherheit":"si1","sprossen":"sp0","vperfect":"vp0"}' && echo "" && \
curl http://localhost:3001/ajax/getOptions/
```

**You should see (4 responses):**
1. `{"status":"ok", ...}` — health check
2. `{"name":"CURIA API", ...}` — API info
3. An HTML price result like `<div class="price-result">...</div>` — price calculation
4. `{"success":true,"options":{...}}` — all product options

📋 **Paste the output back to me.**

Then go back to the first tab and press **Ctrl+C** to stop the server.

---

## How to Update Files From GitHub

When I tell you files have changed, use these commands. The repo is public so `curl` works.

**Base URL (copy once):**
```bash
BASE="https://raw.githubusercontent.com/MSHH88/Backend-CRM/copilot/analyze-project-phase-1/backend"
```

**Download a single file** (replace the path as needed):
```bash
cd ~/Desktop/curia/backend && \
curl -fsSL "$BASE/src/engine/priceCalculator.js" -o src/engine/priceCalculator.js
```

**Download everything fresh** (nuclear option — deletes and redownloads all):
```bash
cd ~/Desktop/curia/backend && \
rm -rf src/ tests/ && \
mkdir -p src/config src/data src/db src/engine src/middleware src/routes src/utils tests && \
BASE="https://raw.githubusercontent.com/MSHH88/Backend-CRM/copilot/analyze-project-phase-1/backend" && \
curl -fsSL "$BASE/src/app.js"                        -o src/app.js && \
curl -fsSL "$BASE/src/server.js"                     -o src/server.js && \
curl -fsSL "$BASE/src/config/database.js"            -o src/config/database.js && \
curl -fsSL "$BASE/src/config/index.js"               -o src/config/index.js && \
curl -fsSL "$BASE/src/config/migrations.js"          -o src/config/migrations.js && \
curl -fsSL "$BASE/src/config/swagger.js"             -o src/config/swagger.js && \
curl -fsSL "$BASE/src/data/basePrices.js"            -o src/data/basePrices.js && \
curl -fsSL "$BASE/src/data/profileMultipliers.js"    -o src/data/profileMultipliers.js && \
curl -fsSL "$BASE/src/data/surcharges.js"            -o src/data/surcharges.js && \
curl -fsSL "$BASE/src/db/schema.sql"                 -o src/db/schema.sql && \
curl -fsSL "$BASE/src/engine/priceCalculator.js"     -o src/engine/priceCalculator.js && \
curl -fsSL "$BASE/src/engine/surchargeCalculator.js" -o src/engine/surchargeCalculator.js && \
curl -fsSL "$BASE/src/middleware/auth.js"             -o src/middleware/auth.js && \
curl -fsSL "$BASE/src/middleware/errorHandler.js"     -o src/middleware/errorHandler.js && \
curl -fsSL "$BASE/src/middleware/security.js"         -o src/middleware/security.js && \
curl -fsSL "$BASE/src/routes/auth.js"                -o src/routes/auth.js && \
curl -fsSL "$BASE/src/routes/berechnen.js"           -o src/routes/berechnen.js && \
curl -fsSL "$BASE/src/routes/options.js"             -o src/routes/options.js && \
curl -fsSL "$BASE/src/routes/warenkorb.js"           -o src/routes/warenkorb.js && \
curl -fsSL "$BASE/src/utils/logger.js"               -o src/utils/logger.js && \
curl -fsSL "$BASE/src/utils/responseFormatter.js"    -o src/utils/responseFormatter.js && \
curl -fsSL "$BASE/tests/api.test.js"             -o tests/api.test.js && \
curl -fsSL "$BASE/tests/auth.test.js"            -o tests/auth.test.js && \
curl -fsSL "$BASE/tests/priceCalculator.test.js" -o tests/priceCalculator.test.js && \
curl -fsSL "$BASE/package.json"   -o package.json && \
curl -fsSL "$BASE/.eslintrc.js"   -o .eslintrc.js && \
curl -fsSL "$BASE/.env.example"   -o .env.example && \
curl -fsSL "$BASE/.gitignore"     -o .gitignore && \
npm install && \
echo "✅ All 28 files downloaded + dependencies installed"
```

After updating, run **Step 1** again to verify tests pass.

---

## What to Delete / What to Download / Where it Goes

### Your local folder: `~/Desktop/curia/backend/`

| What to DELETE | Why |
|----------------|-----|
| `node_modules/` | Only if `npm install` fails. Then run `npm install` again |
| Nothing else | Keep existing files unless I tell you to update specific ones |

### Complete file map (28 files → `~/Desktop/curia/backend/`)

| File | Goes into folder |
|------|-----------------|
| `package.json` | `~/Desktop/curia/backend/` |
| `.eslintrc.js` | `~/Desktop/curia/backend/` |
| `.env.example` | `~/Desktop/curia/backend/` |
| `.gitignore` | `~/Desktop/curia/backend/` |
| `src/app.js` | `~/Desktop/curia/backend/src/` |
| `src/server.js` | `~/Desktop/curia/backend/src/` |
| `src/config/database.js` | `~/Desktop/curia/backend/src/config/` |
| `src/config/index.js` | `~/Desktop/curia/backend/src/config/` |
| `src/config/migrations.js` | `~/Desktop/curia/backend/src/config/` |
| `src/config/swagger.js` | `~/Desktop/curia/backend/src/config/` |
| `src/data/basePrices.js` | `~/Desktop/curia/backend/src/data/` |
| `src/data/profileMultipliers.js` | `~/Desktop/curia/backend/src/data/` |
| `src/data/surcharges.js` | `~/Desktop/curia/backend/src/data/` |
| `src/db/schema.sql` | `~/Desktop/curia/backend/src/db/` |
| `src/engine/priceCalculator.js` | `~/Desktop/curia/backend/src/engine/` |
| `src/engine/surchargeCalculator.js` | `~/Desktop/curia/backend/src/engine/` |
| `src/middleware/auth.js` | `~/Desktop/curia/backend/src/middleware/` |
| `src/middleware/errorHandler.js` | `~/Desktop/curia/backend/src/middleware/` |
| `src/middleware/security.js` | `~/Desktop/curia/backend/src/middleware/` |
| `src/routes/auth.js` | `~/Desktop/curia/backend/src/routes/` |
| `src/routes/berechnen.js` | `~/Desktop/curia/backend/src/routes/` |
| `src/routes/options.js` | `~/Desktop/curia/backend/src/routes/` |
| `src/routes/warenkorb.js` | `~/Desktop/curia/backend/src/routes/` |
| `src/utils/logger.js` | `~/Desktop/curia/backend/src/utils/` |
| `src/utils/responseFormatter.js` | `~/Desktop/curia/backend/src/utils/` |
| `tests/api.test.js` | `~/Desktop/curia/backend/tests/` |
| `tests/auth.test.js` | `~/Desktop/curia/backend/tests/` |
| `tests/priceCalculator.test.js` | `~/Desktop/curia/backend/tests/` |

---

## What's in each folder

| Folder / File | What it contains | Count |
|---------------|-----------------|-------|
| `src/` | All backend source code | 21 files |
| `src/config/` | Database, Swagger, app config | 4 files |
| `src/data/` | Pricing data (Drutex base prices, surcharges, multipliers) | 3 files |
| `src/db/` | PostgreSQL schema (Phase 2) | 1 file |
| `src/engine/` | Price calculation engine | 2 files |
| `src/middleware/` | Auth, security, error handling | 3 files |
| `src/routes/` | API endpoints (berechnen, warenkorb, options, auth) | 4 files |
| `src/utils/` | Logger, response formatter | 2 files |
| `src/app.js` | Express app setup | 1 file |
| `src/server.js` | Server entry point | 1 file |
| `tests/` | Jest test suites (93 tests total) | 3 files |
| `package.json` | Dependencies and scripts | config |
| `.eslintrc.js` | ESLint code quality rules | config |
| `.env.example` | Environment variable template | config |
| `.gitignore` | Git ignore rules | config |

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Cannot find module 'supertest'` | Run `npm install` |
| `No tests found` | `tests/` folder missing — redownload (see "How to Update" above) |
| `ENOENT ... package.json` | Run `cd ~/Desktop/curia/backend` first |
| `Failed to connect to localhost port 3001` | Server not running — start it with Step 2 |
| `command not found: node` | Install from https://nodejs.org |
| `EADDRINUSE :::3001` | Port in use — run `lsof -ti :3001 | xargs kill` then retry |
| `Force exiting Jest` | **Not an error** — this is normal, ignore it |

---

## Quick Summary

| What | Status |
|------|--------|
| Phase 1 backend | ✅ DONE |
| 93 tests | ✅ Passing |
| Server on port 3001 | ✅ Working |
| Auth system | ✅ In-memory |
| Security middleware | ✅ Working |
| Pricing engine (Drutex) | ✅ Working |
| PostgreSQL | 🔲 Phase 2 |
| Multi-material pricing | 🔲 Datasets ready |
| Frontend | 🔲 Phase 3 |
| CRM | 🔲 Phase 4 |
