# Phase 2 Step 1 — Database Deployment & Auth Migration

> **What is this?** This guide tells you exactly what to type in your Mac Terminal app.
> Every grey code block below is something you **copy and paste into Terminal**, then press **Enter**.
> You do NOT need to understand what the commands do — just paste them.

---

## What changed? — Phase 2 Step 1

Phase 2 Step 1 adds the **Repository Pattern** — the architecture that connects your authentication system to PostgreSQL. Tests run in **in-memory mode** (no database needed), but the same code works with a real database in production.

### New files (4)

| # | File | What it does |
|---|------|-------------|
| 1 | **`src/config/dbInit.js`** | Database initialization — tests PostgreSQL, runs migrations, wires repositories. Falls back to in-memory if DB unavailable. |
| 2 | **`src/repositories/userRepository.js`** | User CRUD — `create`, `findByEmail`, `findById`, `update`, `remove`, `count`. Dual-mode: in-memory for tests, PostgreSQL for production. |
| 3 | **`src/repositories/sessionRepository.js`** | Session management — token blacklist, refresh tokens, session limits, revoke-all. Dual-mode: in-memory for tests, PostgreSQL for production. |
| 4 | **`tests/repositories.test.js`** | 24 tests for both repositories — user CRUD, token blacklist, refresh tokens, session limits. |

### Updated files (3)

| # | File | What changed |
|---|------|-------------|
| 1 | **`src/server.js`** | Calls `initializeDatabase()` on startup. Closes database pool on graceful shutdown. |
| 2 | **`src/routes/auth.js`** | Uses `userRepository` instead of in-memory array. All 5 endpoints (register, login, logout, refresh, me) now go through the repository layer. |
| 3 | **`src/middleware/auth.js`** | Uses `sessionRepository` for token blacklist and refresh token storage. |

### What stayed the same

Everything else is unchanged. Pricing engine, API routes, security middleware, legacy aliases — all untouched.

**Test count: 124 tests** across 4 suites (was 100 in Phase 1).

---

## Step 1 → Download the 7 new/updated files

### Option A — Download manually from GitHub (recommended)

1. Go to each link below and click the **download icon** (⬇) or right-click → "Save As":

   **New files** — create the folders first if they don't exist:

   - **`src/config/dbInit.js`** → [Download](https://github.com/MSHH88/Backend-CRM/raw/copilot/analyze-project-phase-1/backend/src/config/dbInit.js)
   - **`src/repositories/userRepository.js`** → [Download](https://github.com/MSHH88/Backend-CRM/raw/copilot/analyze-project-phase-1/backend/src/repositories/userRepository.js)
   - **`src/repositories/sessionRepository.js`** → [Download](https://github.com/MSHH88/Backend-CRM/raw/copilot/analyze-project-phase-1/backend/src/repositories/sessionRepository.js)
   - **`tests/repositories.test.js`** → [Download](https://github.com/MSHH88/Backend-CRM/raw/copilot/analyze-project-phase-1/backend/tests/repositories.test.js)

   **Updated files** — replace the existing versions:

   - **`src/server.js`** → [Download](https://github.com/MSHH88/Backend-CRM/raw/copilot/analyze-project-phase-1/backend/src/server.js)
   - **`src/routes/auth.js`** → [Download](https://github.com/MSHH88/Backend-CRM/raw/copilot/analyze-project-phase-1/backend/src/routes/auth.js)
   - **`src/middleware/auth.js`** → [Download](https://github.com/MSHH88/Backend-CRM/raw/copilot/analyze-project-phase-1/backend/src/middleware/auth.js)

2. **Place** the files in your local folder:

   | Downloaded file | Place it here |
   |---|---|
   | `dbInit.js` | `~/Desktop/curia/backend/src/config/dbInit.js` |
   | `userRepository.js` | `~/Desktop/curia/backend/src/repositories/userRepository.js` |
   | `sessionRepository.js` | `~/Desktop/curia/backend/src/repositories/sessionRepository.js` |
   | `repositories.test.js` | `~/Desktop/curia/backend/tests/repositories.test.js` |
   | `server.js` | `~/Desktop/curia/backend/src/server.js` *(replace)* |
   | `auth.js` (routes) | `~/Desktop/curia/backend/src/routes/auth.js` *(replace)* |
   | `auth.js` (middleware) | `~/Desktop/curia/backend/src/middleware/auth.js` *(replace)* |

### Option B — Download via Terminal (one paste block)

Paste this block — it creates the new folders and downloads all 7 files:

```bash
cd ~/Desktop/curia/backend && \
mkdir -p src/repositories && \
BASE="https://raw.githubusercontent.com/MSHH88/Backend-CRM/copilot/analyze-project-phase-1/backend" && \
curl -fsSL "$BASE/src/config/dbInit.js"                    -o src/config/dbInit.js && \
curl -fsSL "$BASE/src/repositories/userRepository.js"      -o src/repositories/userRepository.js && \
curl -fsSL "$BASE/src/repositories/sessionRepository.js"   -o src/repositories/sessionRepository.js && \
curl -fsSL "$BASE/tests/repositories.test.js"              -o tests/repositories.test.js && \
curl -fsSL "$BASE/src/server.js"                           -o src/server.js && \
curl -fsSL "$BASE/src/routes/auth.js"                      -o src/routes/auth.js && \
curl -fsSL "$BASE/src/middleware/auth.js"                   -o src/middleware/auth.js && \
echo "" && echo "✅ 7 files downloaded (4 new + 3 updated)"
```

### Option C — Full reinstall (only if something is broken)

<details>
<summary>Click to expand — downloads ALL files from scratch</summary>

```bash
cd ~/Desktop/curia/backend && \
rm -rf src/ tests/ && \
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

</details>

---

## Step 2 → Run the tests

> **What this does:** It runs the automated tests to check that all the code works correctly.
> Tests run in **in-memory mode** — no database needed.

Copy and paste this into **the same Terminal window**:

```bash
cd ~/Desktop/curia/backend && npm test
```

**✅ What you should see at the bottom:**

```
Test Suites: 4 passed, 4 total
Tests:       124 passed, 124 total
```

The 4 test suites are:

| Suite | Tests | What it checks |
|-------|-------|----------------|
| `priceCalculator.test.js` | 49 | Pricing engine (Drutex 21×21 matrix, surcharges) |
| `api.test.js` | 35 | All API routes (pricing, health, legacy aliases) |
| `auth.test.js` | 16 | Authentication (register, login, logout, refresh, me) |
| `repositories.test.js` | 24 | User CRUD, token blacklist, session management |

> The messages "Force exiting Jest" and "A worker process has failed to exit gracefully" may appear — **both are normal, ignore them.**

📋 **Copy the last 10 lines from Terminal and send them to me.**

---

## Step 3 → Start the server (without database)

> **What this does:** It starts the backend server. Without PostgreSQL, the server
> uses in-memory storage automatically. Everything works the same — data just
> resets when you restart the server.

Copy and paste this into **the same Terminal window**:

```bash
cd ~/Desktop/curia/backend && npm start
```

**✅ What you should see:**

```
🚀 CURIA Backend Server Started
   Environment: development
   URL:         http://localhost:3001
   Health:      http://localhost:3001/health
   API Docs:    http://localhost:3001/api/v1
⚠️  Database not available — using in-memory storage (data resets on restart)
```

> The "Database not available" message is **expected** if PostgreSQL is not installed yet.

⚠️ **IMPORTANT: Do NOT close this Terminal window. Leave the server running.**

---

## Step 4 → Test the endpoints

> **What this does:** It sends test requests to the running server.

Open a **second Terminal tab** by pressing **Cmd + T** (the server keeps running in the first tab).

### 4a — Test health check and pricing (same as before)

```bash
curl http://localhost:3001/health && echo "" && \
curl http://localhost:3001/api/v1 && echo "" && \
curl -X POST "http://localhost:3001/api/v1/pricing/calculate/?format=json" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'tmp_obj={"breite":1000,"hoehe":1200,"profil":"p1","verglasung":"g1","aussenfarbe":"fs1_01","innenfarbe":"fi1_01","schallschutz":"ss1","sicherheitsverglasung":"sv0","griff":"gr1","sicherheit":"si1","sprossen":"sp0","vperfect":"vp0"}' && echo "" && \
curl http://localhost:3001/api/v1/pricing/options/
```

**✅ What you should see:** 4 lines of JSON data.

### 4b — Test the full auth flow (NEW)

This tests the complete authentication cycle: register → login → access protected route → logout.

**Register a new user:**

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234!","firstName":"Max","lastName":"Mustermann"}' | python3 -m json.tool
```

**✅ You should see:** A JSON response with `user` object and `tokens` (accessToken + refreshToken).

**Login with that user:**

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234!"}' | python3 -m json.tool
```

**✅ You should see:** A JSON response with `user` and `tokens`. Copy the `accessToken` value for the next step.

**Get your profile (replace YOUR_TOKEN with the accessToken you copied):**

```bash
curl -s http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN" | python3 -m json.tool
```

**✅ You should see:** Your user profile (id, email, firstName, lastName, role).

📋 **Copy all the output and send it to me.**

When you are done, go back to the **first tab** (the server) and press **Ctrl + C** to stop it.

---

## Step 5 → Set up PostgreSQL (optional — for persistent data)

> **Why?** Without PostgreSQL, data resets when you restart the server.
> With PostgreSQL, users, sessions, and all data persist permanently.
> This is required before moving to Phase 2 Step 2.

### 5a — Install PostgreSQL

**Option 1 — Homebrew (recommended for Mac):**

```bash
brew install postgresql@16
```

Then start the service:

```bash
brew services start postgresql@16
```

**Option 2 — Postgres.app (graphical):**

Download from [https://postgresapp.com](https://postgresapp.com), install, and click "Start".

### 5b — Create the database and user

```bash
psql postgres -c "CREATE DATABASE curia;" && \
psql postgres -c "CREATE USER postgres WITH PASSWORD 'yourpassword';" && \
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE curia TO postgres;" && \
echo "" && echo "✅ Database 'curia' created"
```

> If you get "role postgres already exists" or "database curia already exists", that's fine — it means they were already set up.

### 5c — Configure your .env file

```bash
cd ~/Desktop/curia/backend && \
cp .env.example .env && \
echo "" && echo "✅ .env file created from template"
```

Then open the file and check these settings match your PostgreSQL setup:

```bash
open -e ~/Desktop/curia/backend/.env
```

The database settings should look like this (change password if needed):

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=yourpassword
```

### 5d — Start the server with database

```bash
cd ~/Desktop/curia/backend && npm start
```

**✅ What you should see (with database connected):**

```
🚀 CURIA Backend Server Started
   Environment: development
   URL:         http://localhost:3001
   Health:      http://localhost:3001/health
   API Docs:    http://localhost:3001/api/v1
✅ Database connected — PostgreSQL
✅ Migrations complete — 23 tables ready
✅ Seed data loaded — 8 roles, 4 categories, 4 manufacturers
```

> If you see "Database not available" instead, check that PostgreSQL is running
> and your `.env` settings are correct.

### 5e — Verify database health

In a second Terminal tab:

```bash
curl -s http://localhost:3001/health | python3 -m json.tool
```

**✅ With database:** You should see `"database": "connected"` in the response.

📋 **Copy the output and send it to me.**

---

## Quick Reference

| What do I do? | Answer |
|---|---|
| Which files are new? | **4 new:** `src/config/dbInit.js`, `src/repositories/userRepository.js`, `src/repositories/sessionRepository.js`, `tests/repositories.test.js` |
| Which files are updated? | **3 updated:** `src/server.js`, `src/routes/auth.js`, `src/middleware/auth.js` |
| Do I need PostgreSQL installed? | **Not for tests.** Tests run in in-memory mode. PostgreSQL is only needed for Step 5 (persistent data). |
| Do I need `npm install`? | **No** — no new packages were added. The `pg` (PostgreSQL) driver was already installed in Phase 1. |
| How many tests should pass? | **124 tests** across 4 suites. |
| I see "Database not available" when starting the server? | **That's normal** if PostgreSQL isn't installed yet. The server works fine with in-memory storage. |
| I see "Force exiting Jest"? | **Normal.** Ignore it. |
| Where do I paste the code blocks? | In the **Terminal** app on your Mac. |
| Do I paste the whole grey block? | **Yes.** Copy the entire block including all lines and paste it once. |
| What is the `src/repositories/` folder? | The **Repository Pattern** — a clean data-access layer. Instead of storing users in a JavaScript array, they go through a repository that works with both in-memory storage and PostgreSQL. |
| Will these files change again? | **No.** The repository layer and auth migration are complete and stable. |
| Why do I need two Terminal tabs? | One runs the server (Step 3/5d), the other sends test requests (Step 4). |
| Can I still use the old auth endpoints? | **Yes.** All endpoints are the same: `/api/v1/auth/register`, `/login`, `/logout`, `/refresh`, `/me`. |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Express Routes                          │
│  /api/v1/auth/register  →  routes/auth.js                   │
│  /api/v1/auth/login     →  routes/auth.js                   │
│  /api/v1/auth/logout    →  routes/auth.js                   │
│  /api/v1/auth/refresh   →  routes/auth.js                   │
│  /api/v1/auth/me        →  routes/auth.js                   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│    userRepository.js      │  │   sessionRepository.js        │
│  • create(user)           │  │  • blacklistToken(token)      │
│  • findByEmail(email)     │  │  • isTokenBlacklisted(token)  │
│  • findById(id)           │  │  • storeRefreshToken(id, tok) │
│  • update(id, data)       │  │  • invalidateRefreshToken()   │
│  • remove(id)             │  │  • revokeAllUserTokens(id)    │
│  • count(conditions)      │  │  • enforceSessionLimit()      │
└──────────┬───────────────┘  └──────────────┬───────────────┘
           │                                  │
           ▼                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    dbInit.js                                  │
│  Tests PostgreSQL → wires repositories → falls back to       │
│  in-memory if DB unavailable                                 │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL (database.js + migrations.js)         │
│  23 tables • 22 indexes • 8 roles • 4 categories             │
│  Connection pool • Query logging • Transaction support        │
└─────────────────────────────────────────────────────────────┘
```
