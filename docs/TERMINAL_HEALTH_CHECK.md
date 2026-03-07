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
==================================================
🚀 CURIA Backend Server Started
==================================================
📍 Environment: development
🌐 Server URL: http://localhost:3001
❤️  Health Check: http://localhost:3001/health
📚 API Docs: http://localhost:3001/api/v1
==================================================
⚠️  PostgreSQL not reachable — running with in-memory storage
```

> **If PostgreSQL is installed but the `curia` database doesn't exist yet**, you will also see
> error messages before the fallback warning — this is completely normal:
>
> ```
> ❌ Query error: database "curia" does not exist
> ❌ Database connection failed: database "curia" does not exist
> ⚠️  PostgreSQL not reachable — running with in-memory storage
> ```

> These messages are **expected**. The server falls back to in-memory storage automatically.

> ⚠️ **PGAdmin users — "server" is NOT the same as "database"!**
>
> In PGAdmin, a **server** is just a connection to your PostgreSQL instance (like a bookmark). A **database** is where the actual data lives. If you named your server "curia" in PGAdmin, that does NOT create a database called "curia". You still need to create the database — see [Step 5b](#5b--create-the-database) below.

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

> **Note:** The `| python3 -m json.tool` part formats JSON for readability. Python 3 is pre-installed on modern macOS. If it's missing, the commands still work — just remove the `| python3 -m json.tool` part and the output will be unformatted JSON.

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

**✅ You should see:** A JSON response with `user` and `tokens`.

**Get your profile — option A (all-in-one, recommended):**

Paste this **single block** — it logs in, extracts the token automatically, and fetches your profile:

```bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234!"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['tokens']['accessToken'])") && \
echo "Using token: ${TOKEN:0:20}..." && \
curl -s http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

**✅ You should see:** Your user profile (id, email, firstName, lastName, role).

**Get your profile — option B (manual token copy):**

If option A doesn't work, do it in two steps:

1. Look at the login response from above. Find the `"accessToken"` value — it's the long string starting with `eyJ...`. **Copy that entire string** (without the quotes).

2. Paste this command, replacing `PASTE_YOUR_TOKEN_HERE` with the token you copied:

```bash
curl -s http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer PASTE_YOUR_TOKEN_HERE" | python3 -m json.tool
```

> **Where is the access token?** In the JSON response from register or login, look for:
> ```json
> "tokens": {
>     "accessToken": "eyJhbGciOi...",   ← THIS is your access token
>     "refreshToken": "eyJhbGciOi...",
> ```
> Copy the full `eyJ...` string after `"accessToken":`.

📋 **Copy all the output and send it to me.**

When you are done, go back to the **first tab** (the server) and press **Ctrl + C** to stop it.

---

## Step 5 → Set up PostgreSQL (optional — for persistent data)

> **Why?** Without PostgreSQL, data resets when you restart the server.
> With PostgreSQL, users, sessions, and all data persist permanently.
> This is required before moving to Phase 2 Step 2.

> **Already have PostgreSQL + PGAdmin with a "curia" database?** Skip straight to [Step 5c](#5c--configure-your-env-file) — you just need the `.env` file.

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

**Option 3 — PGAdmin (graphical, if you downloaded PostgreSQL installer from postgresql.org):**

If you downloaded the official PostgreSQL installer from [postgresql.org](https://www.postgresql.org/download/), PGAdmin was included. During installation you chose a password for the `postgres` superuser — **remember this password**, you will need it for the `.env` file. PostgreSQL starts automatically as a service after installation.

### 5b — Create the database

> ⚠️ **Important: A PGAdmin "server" is NOT a database!**
>
> In PGAdmin, a **server** is a connection to your PostgreSQL instance — think of it as a bookmark.
> Inside that server, you can have multiple **databases**. You need to create a **database** called `curia` inside your server.
>
> If you already named your server "curia" in PGAdmin, that's fine — but you still need to create a **database** called `curia` inside it.

**If you use PGAdmin (graphical):**

1. Open **PGAdmin**
2. In the left sidebar, expand **Servers** → your local server (e.g. "curia", "PostgreSQL 16", or "localhost")
3. Enter your password if prompted (the one you set during PostgreSQL installation)
4. Look under that server — you'll see **Databases**, **Login/Group Roles**, etc.
5. Right-click **Databases** → **Create** → **Database…**
6. Set **Database name** to `curia`
7. Click **Save**
8. You should see "curia" appear under Databases ✅

> **Already see "curia" under Databases (not just as a server name)?** You're done with this step — move to 5c.

**If you prefer the Terminal:**

```bash
psql postgres -c "CREATE DATABASE curia;" && \
psql postgres -c "CREATE USER postgres WITH PASSWORD 'REPLACE_WITH_YOUR_SECURE_PASSWORD';" && \
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE curia TO postgres;" && \
echo "" && echo "✅ Database 'curia' created"
```

> ⚠️ **Change the password** above to something secure before pasting. Use a mix of letters, numbers, and symbols (e.g. `MyStr0ng!Pass#2026`).

> If you get "role postgres already exists" or "database curia already exists", that's fine — it means they were already set up.

### 5c — Configure your .env file

This is the **key step** — it tells the backend how to connect to your PostgreSQL database.

```bash
cd ~/Desktop/curia/backend && \
cp .env.example .env && \
echo "" && echo "✅ .env file created from template"
```

Then open the file:

```bash
open -e ~/Desktop/curia/backend/.env
```

Find the database settings section and update them:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=YOUR_ACTUAL_PASSWORD_HERE
```

**How to find the right values:**

| Setting | Where to find it |
|---------|-----------------|
| `DB_HOST` | Almost always `localhost` for local development |
| `DB_PORT` | Default is `5432`. In PGAdmin: right-click your server → Properties → Connection tab → Port |
| `DB_NAME` | `curia` (the database you created) |
| `DB_USER` | `postgres` (the default superuser). In PGAdmin: right-click your server → Properties → Connection tab → Username |
| `DB_PASSWORD` | The password you set during PostgreSQL installation. In PGAdmin, it's the password you enter when connecting to the server |

> **PGAdmin users:** If you're not sure what password you used, try connecting to your server in PGAdmin — it will ask for the password. That's the same password that goes in `DB_PASSWORD`.

> **Homebrew users (Mac):** If you installed PostgreSQL via `brew`, there is often **no password** by default. In that case, leave `DB_PASSWORD=` empty (no value after the `=` sign).

Save the file after editing (**Cmd + S**).

### 5d — Start the server with database

```bash
cd ~/Desktop/curia/backend && npm start
```

**✅ What you should see (with database connected):**

```
==================================================
🚀 CURIA Backend Server Started
==================================================
📍 Environment: development
🌐 Server URL: http://localhost:3001
❤️  Health Check: http://localhost:3001/health
📚 API Docs: http://localhost:3001/api/v1
==================================================
📗 New database connection established
✅ Database connected: curia

==================================================
🚀 CURIA Database Migrations
==================================================

🔧 Creating database tables...
  ✅ roles table created
  ✅ permissions table created
  … (23 tables total) …
  ✅ analytics_events table created

🌱 Seeding default data...
  ✅ Roles seeded
  ✅ Categories seeded
  ✅ Manufacturers seeded
✅ Default data seeded successfully!

==================================================
✅ All migrations completed successfully!
==================================================

✅ Database initialised — repositories connected to PostgreSQL
```

> On subsequent starts, the tables already exist (CREATE TABLE IF NOT EXISTS),
> so the output is the same but runs instantly.

### 5e — Verify database health

In a second Terminal tab:

```bash
curl -s http://localhost:3001/health | python3 -m json.tool
```

**✅ With database:** You should see `"database": "connected"` in the response.

📋 **Copy the output and send it to me.**

### 5f — Troubleshooting

| Problem | Solution |
|---------|----------|
| `database "curia" does not exist` | Create the database in PGAdmin (right-click Databases → Create → Database → name it `curia`) or run `createdb curia` in Terminal. **Note:** naming your PGAdmin server "curia" does NOT create a database — you must create the database separately inside the server. |
| I named my PGAdmin server "curia" but still get the error | A **server** in PGAdmin is just a connection bookmark. You need to create a **database** called `curia` inside that server. Expand your server → right-click **Databases** → Create → Database → name it `curia`. |
| `password authentication failed for user "postgres"` | The password in your `.env` file doesn't match. Check the password in PGAdmin: right-click your server → Properties → Connection tab. Update `DB_PASSWORD` in `.env` |
| `connection refused` or `could not connect to server` | PostgreSQL is not running. In PGAdmin, check if your server shows a red X. On Mac: `brew services start postgresql@16` or start it from PGAdmin |
| `role "postgres" does not exist` | Your PostgreSQL uses a different username. Check your macOS username with `whoami` in Terminal, then set `DB_USER=yourusername` in `.env` |
| Server says `⚠️ PostgreSQL not reachable` even after setup | Did you create a `.env` file? (not just `.env.example`) Did you save it? Did you restart the server with `npm start`? The server reads `.env` only at startup |
| I don't remember my PostgreSQL password | Uninstall and reinstall PostgreSQL, or reset the password: `psql postgres -c "ALTER USER postgres WITH PASSWORD 'newpassword';"` |
| I don't have a `.env` file | Run `cp .env.example .env` in your backend folder, then edit the new `.env` file with your database password. See [Step 5c](#5c--configure-your-env-file). |

---

## Quick Reference

| What do I do? | Answer |
|---|---|
| Which files are new? | **4 new:** `src/config/dbInit.js`, `src/repositories/userRepository.js`, `src/repositories/sessionRepository.js`, `tests/repositories.test.js` |
| Which files are updated? | **3 updated:** `src/server.js`, `src/routes/auth.js`, `src/middleware/auth.js` |
| Do I need PostgreSQL installed? | **Not for tests.** Tests run in in-memory mode. PostgreSQL is only needed for Step 5 (persistent data). |
| Do I need `npm install`? | **No** — no new packages were added. The `pg` (PostgreSQL) driver was already installed in Phase 1. |
| How many tests should pass? | **124 tests** across 4 suites. |
| I see "PostgreSQL not reachable" or "database curia does not exist"? | **That's normal** if PostgreSQL isn't installed, the `curia` database hasn't been created yet, or you don't have a `.env` file. The server works fine with in-memory storage. See [Step 5](#step-5--set-up-postgresql-optional--for-persistent-data) for setup. |
| I named my PGAdmin server "curia" — why does it say database not found? | A PGAdmin **server** is just a connection to PostgreSQL. You need to create a **database** called "curia" inside that server. See [Step 5b](#5b--create-the-database). |
| How do I use the access token from login/register? | Use the all-in-one command in [Step 4b](#4b--test-the-full-auth-flow-new), or copy the `accessToken` value from the JSON response and paste it into the `Authorization: Bearer` header. |
| I see "Force exiting Jest"? | **Normal.** Ignore it. |
| Where do I paste the code blocks? | In the **Terminal** app on your Mac. |
| Do I paste the whole grey block? | **Yes.** Copy the entire block including all lines and paste it once. |
| What is the `src/repositories/` folder? | The **Repository Pattern** — a clean data-access layer. Instead of storing users in a JavaScript array, they go through a repository that works with both in-memory storage and PostgreSQL. |
| Will these files change again? | **No.** The repository layer and auth migration are complete and stable. |
| Why do I need two Terminal tabs? | One runs the server (Step 3/5d), the other sends test requests (Step 4). |
| Can I still use the old auth endpoints? | **Yes.** All endpoints are the same: `/api/v1/auth/register`, `/login`, `/logout`, `/refresh`, `/me`. |
| I have PGAdmin — do I need the Terminal commands? | **No.** You can create the database in PGAdmin's GUI. See Step 5b for PGAdmin instructions. You still need to create the `.env` file (Step 5c). |
| I already created "curia" in PGAdmin — what now? | Jump to **Step 5c** — create the `.env` file, set your `DB_PASSWORD`, and restart the server with `npm start`. |

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
