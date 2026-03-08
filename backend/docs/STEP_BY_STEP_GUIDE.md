# Phase 2 Step 1 — Step-by-Step Setup Guide

> Copy-paste each grey box into Terminal and press Enter. Do them in order.

---

## Step 1 → Delete old files

```bash
cd ~/Desktop/curia/backend && \
rm -f .env && \
rm -rf src/ tests/ && \
echo "✅ Old files deleted"
```

---

## Step 2 → Download new files

```bash
cd ~/Desktop/curia/backend && \
mkdir -p src/config src/data src/db src/engine src/middleware src/repositories src/routes src/utils tests && \
BASE="https://raw.githubusercontent.com/MSHH88/Backend-CRM/copilot/analyze-project-phase-1/backend" && \
curl -fsSL "$BASE/src/app.js"                              -o src/app.js && \
curl -fsSL "$BASE/src/server.js"                           -o src/server.js && \
curl -fsSL "$BASE/src/config/dbInit.js"                    -o src/config/dbInit.js && \
curl -fsSL "$BASE/src/config/database.js"                  -o src/config/database.js && \
curl -fsSL "$BASE/src/config/index.js"                     -o src/config/index.js && \
curl -fsSL "$BASE/src/config/migrations.js"                -o src/config/migrations.js && \
curl -fsSL "$BASE/src/config/swagger.js"                   -o src/config/swagger.js && \
curl -fsSL "$BASE/src/data/basePrices.js"                  -o src/data/basePrices.js && \
curl -fsSL "$BASE/src/data/profileMultipliers.js"          -o src/data/profileMultipliers.js && \
curl -fsSL "$BASE/src/data/surcharges.js"                  -o src/data/surcharges.js && \
curl -fsSL "$BASE/src/db/schema.sql"                       -o src/db/schema.sql && \
curl -fsSL "$BASE/src/engine/priceCalculator.js"           -o src/engine/priceCalculator.js && \
curl -fsSL "$BASE/src/engine/surchargeCalculator.js"       -o src/engine/surchargeCalculator.js && \
curl -fsSL "$BASE/src/middleware/auth.js"                   -o src/middleware/auth.js && \
curl -fsSL "$BASE/src/middleware/errorHandler.js"           -o src/middleware/errorHandler.js && \
curl -fsSL "$BASE/src/middleware/security.js"               -o src/middleware/security.js && \
curl -fsSL "$BASE/src/repositories/userRepository.js"      -o src/repositories/userRepository.js && \
curl -fsSL "$BASE/src/repositories/sessionRepository.js"   -o src/repositories/sessionRepository.js && \
curl -fsSL "$BASE/src/routes/auth.js"                      -o src/routes/auth.js && \
curl -fsSL "$BASE/src/routes/berechnen.js"                 -o src/routes/berechnen.js && \
curl -fsSL "$BASE/src/routes/options.js"                   -o src/routes/options.js && \
curl -fsSL "$BASE/src/routes/warenkorb.js"                 -o src/routes/warenkorb.js && \
curl -fsSL "$BASE/src/utils/logger.js"                     -o src/utils/logger.js && \
curl -fsSL "$BASE/src/utils/responseFormatter.js"          -o src/utils/responseFormatter.js && \
curl -fsSL "$BASE/src/checkSetup.js"                       -o src/checkSetup.js && \
curl -fsSL "$BASE/tests/api.test.js"                       -o tests/api.test.js && \
curl -fsSL "$BASE/tests/auth.test.js"                      -o tests/auth.test.js && \
curl -fsSL "$BASE/tests/priceCalculator.test.js"           -o tests/priceCalculator.test.js && \
curl -fsSL "$BASE/tests/repositories.test.js"              -o tests/repositories.test.js && \
curl -fsSL "$BASE/package.json"     -o package.json && \
curl -fsSL "$BASE/.eslintrc.js"     -o .eslintrc.js && \
curl -fsSL "$BASE/.prettierrc"      -o .prettierrc && \
curl -fsSL "$BASE/.prettierignore"  -o .prettierignore && \
curl -fsSL "$BASE/.env.example"     -o .env.example && \
curl -fsSL "$BASE/.gitignore"       -o .gitignore && \
npm install && \
echo "" && echo "✅ All files downloaded and installed"
```

---

## Step 3 → Run tests

```bash
cd ~/Desktop/curia/backend && npm test
```

**✅ Expected:** `Tests: 124 passed, 124 total`

> "Force exiting Jest" / "worker process has failed to exit gracefully" → normal, ignore.

---

## Step 4 → Create .env file

> This creates the .env file. You only need to change ONE line after.

```bash
cd ~/Desktop/curia/backend && \
cat > .env << 'ENVFILE'
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=CHANGE_ME
JWT_SECRET=dev-secret-change-in-production-minimum-32-chars
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
FRONTEND_URL=http://localhost:3000
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=info
DEFAULT_MARGIN=0.50
DEFAULT_VAT_RATE=0.19
SHOW_VAT=true
DEFAULT_CURRENCY=EUR
DEFAULT_DISCOUNT_RATE=0
QUANTITY_TIERS=[]
ENVFILE
echo "✅ .env created — now set your password (one line to change)"
```

Now open it and set your password:

```bash
open -e ~/Desktop/curia/backend/.env
```

Change `CHANGE_ME` to your password. Save (Cmd+S). Close.

---

## Step 5 → Run the pre-flight check

```bash
cd ~/Desktop/curia/backend && npm run check
```

**✅ All good looks like:**

```
=== CURIA Pre-flight Check ===

1) Checking .env file…
  ✅ .env file found

2) Checking .env values…
  ✅ DB_PASSWORD is set
  ✅ DB_PASSWORD is not a placeholder

3) Testing PostgreSQL connection…
  ✅ Connected to PostgreSQL at localhost:5432
  ✅ Database "curia" exists

========================================
✅ ALL CHECKS PASSED — run  npm start
========================================
```

---

## Step 6 → Start the server

```bash
cd ~/Desktop/curia/backend && npm start
```

**✅ Expected:**

```
🚀 CURIA Backend Server Started
🔌 Connecting to PostgreSQL → postgres@localhost:5432/curia
📗 New database connection established
✅ Database connected: curia
✅ All migrations completed successfully!
✅ Database initialised — repositories connected to PostgreSQL
```

⚠️ **Leave this Terminal open.** Open a new tab (Cmd+T) for Step 7.

---

## Step 7 → Verify

```bash
curl -s http://localhost:3001/health | python3 -m json.tool
```

**✅ Expected:** `"database": "connected"`

**Done.** 🎉

---

## 🔥 Nuclear Option — Start completely fresh

### In PGAdmin:

1. Expand **PostgreSQL 18** → **Databases**
2. Right-click **curia** → **Delete/Drop** → confirm
3. Run `npm start` — it auto-creates a fresh `curia` database

### Or via Terminal:

```bash
cd ~/Desktop/curia/backend && \
PGPASSWORD=$(grep DB_PASSWORD .env | cut -d= -f2) \
/Library/PostgreSQL/18/bin/psql -U postgres -h localhost -c "DROP DATABASE IF EXISTS curia;" && \
echo "✅ Dropped — npm start will recreate it"
```

---

## 🔧 Quick fixes

| Error | Fix |
|-------|-----|
| `password authentication failed` | Wrong password in `.env`. Fix `DB_PASSWORD`, restart. |
| `connection refused` | PostgreSQL not running. Open PGAdmin, connect to server. |
| `role "postgres" does not exist` | Run `whoami`, set `DB_USER` to that in `.env`. |
| `pg_isready: command not found` | Normal with official installer. Ignore it. |
| `PostgreSQL not reachable` | Run `npm run check` — it shows exactly what's wrong. |

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
