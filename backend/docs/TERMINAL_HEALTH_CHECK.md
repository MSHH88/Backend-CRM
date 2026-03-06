# Terminal Health Check — Quick Setup Guide

> The repo is **public** — `curl` works directly. Just copy-paste each command.

---

## Step 1 — Delete your old src/ and tests/ folders

Your current files may be corrupted (if `curl` was used when the repo was private). Delete them:

```bash
cd ~/Desktop/curia/backend && \
rm -rf src/ tests/ && \
echo "✅ Old folders deleted"
```

---

## Step 2 — Download all source files (21 files)

Copy-paste this **entire block** into Terminal. It downloads every file using `curl`:

```bash
cd ~/Desktop/curia/backend && \
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
echo "✅ 21 source files downloaded"
```

**You should see:** `✅ 21 source files downloaded`

---

## Step 3 — Download test files (3 files)

```bash
cd ~/Desktop/curia/backend && \
BASE="https://raw.githubusercontent.com/MSHH88/Backend-CRM/copilot/analyze-project-phase-1/backend" && \
curl -fsSL "$BASE/tests/api.test.js"             -o tests/api.test.js && \
curl -fsSL "$BASE/tests/auth.test.js"            -o tests/auth.test.js && \
curl -fsSL "$BASE/tests/priceCalculator.test.js" -o tests/priceCalculator.test.js && \
echo "✅ 3 test files downloaded"
```

---

## Step 4 — Download config files (4 files)

These go in your `backend/` root (replace existing):

```bash
cd ~/Desktop/curia/backend && \
BASE="https://raw.githubusercontent.com/MSHH88/Backend-CRM/copilot/analyze-project-phase-1/backend" && \
curl -fsSL "$BASE/package.json"   -o package.json && \
curl -fsSL "$BASE/.eslintrc.js"   -o .eslintrc.js && \
curl -fsSL "$BASE/.env.example"   -o .env.example && \
curl -fsSL "$BASE/.gitignore"     -o .gitignore && \
echo "✅ 4 config files downloaded"
```

---

## Step 5 — Verify file counts

```bash
cd ~/Desktop/curia/backend && \
echo "Source files: $(find src/ -type f -not -name '.DS_Store' | wc -l | tr -d ' ')" && \
echo "Test files:   $(find tests/ -type f -not -name '.DS_Store' | wc -l | tr -d ' ')" && \
head -1 src/data/basePrices.js
```

**You should see:**
```
Source files: 21
Test files:   3
'use strict';
```

> ⚠️ If `head -1` shows `404: Not Found` instead of `'use strict';`, the download failed. Re-run Steps 1 and 2.

---

## Step 6 — Install dependencies & create .env

```bash
cd ~/Desktop/curia/backend && \
ls .env 2>/dev/null || cp .env.example .env && \
npm install
```

**You should see:** ends with `0 vulnerabilities`.

---

## Step 7 — Run all tests

```bash
cd ~/Desktop/curia/backend && npm test
```

**You should see:**
```
Test Suites: 3 passed, 3 total
Tests:       91 passed, 91 total
```

📋 **Paste the last 10 lines back to me.**

---

## Step 8 — Start the server

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

## Step 9 — Test the server (open a NEW terminal tab: Cmd+T)

Press **Cmd+T** to open a new tab. Then paste:

```bash
curl http://localhost:3001/health && echo "" && \
curl http://localhost:3001/api/v1 && echo "" && \
curl -X POST http://localhost:3001/ajax/berechnen/ -H "Content-Type: application/json" -d '{"width":1000,"height":1200,"profile":"iglo5"}' && echo "" && \
curl http://localhost:3001/ajax/getOptions/
```

📋 **Paste the output back to me.**

Then go back to the first tab and press **Ctrl+C** to stop the server.

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
| `tests/` | Jest test suites (91 tests total) | 3 files |
| `package.json` | Dependencies and scripts | config |
| `.eslintrc.js` | ESLint code quality rules | config |
| `.env.example` | Environment variable template | config |
| `.gitignore` | Git ignore rules | config |

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `SyntaxError: Missing semicolon. (1:3) 404: Not Found` | A source file contains "404: Not Found" instead of code. Re-run Steps 1 and 2 |
| `Cannot find module 'supertest'` | Run `npm install` (Step 6) |
| `No tests found` | tests/ folder missing — run Step 3 |
| `ESLint couldn't find a configuration file` | Run Step 4 to download `.eslintrc.js` |
| `ENOENT ... package.json` | Run `cd ~/Desktop/curia/backend` first |
| `Failed to connect to localhost port 3001` | Server not running — start it with Step 8 |
| `command not found: node` | Install from https://nodejs.org |
| `EADDRINUSE :::3001` | Port in use — run `lsof -ti :3001` to find the PID, then stop it and retry |

---

## Quick Summary

| What | Status |
|------|--------|
| Phase 1 backend | ✅ DONE |
| 91 tests | ✅ Passing |
| Server on port 3001 | ✅ Working |
| Auth system | ✅ In-memory |
| Security middleware | ✅ Working |
| Pricing engine (Drutex) | ✅ Working |
| PostgreSQL | 🔲 Phase 2 |
| Multi-material pricing | 🔲 Datasets ready |
| Frontend | 🔲 Phase 3 |
| CRM | 🔲 Phase 4 |
