# Phase 2 Step 1 — Setup Guide

> **What is this?** A step-by-step guide. Each step does ONE thing.
> Every grey code block is something you **copy-paste into Terminal**, then press **Enter**.
> Do the steps **in order**. Finish one before starting the next.

> **Important:** The `.env` file is ONLY for the backend project folder (`~/Desktop/curia/backend/`).
> It has nothing to do with PGAdmin. PGAdmin is just a visual tool to look at your database.

---

## Step 1 → Download the code files

> **What this does:** Gets the 7 new/updated source files onto your Mac.

Paste this **one block** into Terminal:

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

**✅ You should see:** `✅ 7 files downloaded (4 new + 3 updated)`

> **If you get errors**, use the full reinstall below instead.

<details>
<summary>🔄 Full reinstall — click here ONLY if the above didn't work</summary>

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

> **What this does:** Checks that all the code works. No database needed — tests use in-memory mode.

```bash
cd ~/Desktop/curia/backend && npm test
```

**✅ You should see:**

```
Test Suites: 4 passed, 4 total
Tests:       124 passed, 124 total
```

> "Force exiting Jest" or "worker process has failed to exit gracefully" → **normal, ignore it.**

📋 **Copy the last 10 lines and send them to me. Then move to Step 3.**

---

## Step 3 → Connect to your PostgreSQL database

> **What this does:** Creates the `.env` config file so the server can find your database.
> The `.env` file goes in `~/Desktop/curia/backend/` — NOT in PGAdmin.
> PGAdmin doesn't need any files from you. It's just a visual tool to view your database.

### 3a — Database is auto-created

> ✅ **You do NOT need to create the database manually.** When you start the server, it will automatically create the `curia` database if it doesn't exist yet. Just make sure PostgreSQL is running (you can check in PGAdmin — your server should have a green icon, not a red X).

> ℹ️ **The server name in PGAdmin (like "curia" or "PostgreSQL 18") is NOT a database.** It's just a connection bookmark. The **database** is what appears *under* that server, inside the **Databases** folder. The server will create it for you.

### 3b — Find your port number (IMPORTANT!)

> ⚠️ **This is the #1 reason for "database does not exist" errors.** PostgreSQL 18 often uses port **5433** instead of 5432. If the port is wrong in your `.env`, the server connects to the wrong PostgreSQL and can't find your database.

In PGAdmin:

1. **Right-click** your server name (e.g. "curia" or "PostgreSQL 18") in the left sidebar
2. Click **Properties**
3. Click the **Connection** tab
4. Look at the **Port** field — write down the number (e.g. `5432` or `5433`)

```
┌────────────────────────────────────┐
│  Server Properties                 │
│  ─────────────────                 │
│  Connection tab:                   │
│                                    │
│  Host:  localhost                  │
│  Port:  5433   ← WRITE THIS DOWN  │
│  Username: postgres                │
│                                    │
└────────────────────────────────────┘
```

📝 **Remember this port number — you need it in the next step.**

### 3c — Create the .env file

```bash
cd ~/Desktop/curia/backend && cp .env.example .env && echo "✅ .env file created"
```

### 3d — Edit the .env file — set your password AND port

```bash
open -e ~/Desktop/curia/backend/.env
```

This opens the file in TextEdit. Find these lines and change **two things**:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=yourpassword
```

**Change these:**

1. **`DB_PORT`** — set this to the port from Step 3b (e.g. `5433` if that's what PGAdmin showed)
2. **`DB_PASSWORD`** — set this to the password you use when connecting to your server in PGAdmin

**Example** (if your port is 5433 and password is MyPass123):

```
DB_HOST=localhost
DB_PORT=5433
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=MyPass123
```

Save the file (**Cmd + S**) and close TextEdit.

> **Not sure what password you used?** Open PGAdmin, try to expand your server — it asks for a password. That's the one.

> **Installed PostgreSQL via Homebrew?** The default has no password. Leave it as `DB_PASSWORD=` (nothing after the `=`). The port is usually `5432`.

### 3e — Verify your .env is correct (quick check)

```bash
grep -E "^DB_" ~/Desktop/curia/backend/.env
```

**✅ You should see something like:**

```
DB_HOST=localhost
DB_PORT=5433
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=yourActualPassword
```

Make sure `DB_PORT` matches what PGAdmin showed and `DB_PASSWORD` contains your actual password (not the example text "yourpassword").

### 3f — Start the server

```bash
cd ~/Desktop/curia/backend && npm start
```

**✅ What you should see:**

```
🚀 CURIA Backend Server Started
...
🔌 Connecting to PostgreSQL → postgres@localhost:5432/curia
📦 Database "curia" not found — creating it now…
✅ Database "curia" created successfully!
📗 New database connection established
✅ Database connected: curia
...
✅ All migrations completed successfully!
✅ Database initialised — repositories connected to PostgreSQL
```

> ℹ️ If the database already exists, you won't see the "creating it now" line — that's fine, it just skips straight to connecting.

⚠️ **Leave this Terminal window open — the server must keep running.**

📋 **Copy what you see and send it to me. Then move to Step 4.**

---

## Step 4 → Verify everything works

> **What this does:** Sends a quick test to make sure the server and database are running.

Press **Cmd + T** to open a **second Terminal tab**. Then paste:

```bash
curl -s http://localhost:3001/health | python3 -m json.tool
```

**✅ You should see** `"database": "connected"` in the response.

That's it. If you see `"connected"`, your database is working.

📋 **Copy the output and send it to me.**

---

## Still getting errors? Read this

### 🔍 First — run the diagnostic command

This shows you **exactly** what settings the server is reading from your `.env` file:

```bash
cd ~/Desktop/curia/backend && node -e "require('dotenv').config(); console.log('DB_HOST=' + (process.env.DB_HOST || 'localhost')); console.log('DB_PORT=' + (process.env.DB_PORT || '5432')); console.log('DB_NAME=' + (process.env.DB_NAME || 'curia')); console.log('DB_USER=' + (process.env.DB_USER || 'postgres')); console.log('DB_PASSWORD=' + (process.env.DB_PASSWORD ? '✅ set (' + process.env.DB_PASSWORD.length + ' chars)' : '❌ EMPTY'));"
```

**Check the output:**
- Does `DB_PORT` match what PGAdmin shows? (Step 3b)
- Does `DB_PASSWORD` say `✅ set`? If it says `❌ EMPTY`, your `.env` file is missing or the password line is wrong.
- Does `DB_NAME` say `curia`?

> **If `DB_PASSWORD` says EMPTY:** You may have edited `.env.example` instead of `.env`. Run `ls ~/Desktop/curia/backend/.env` — if it says "No such file", go to Step 3c.

---

### ❌ `database "curia" does not exist`

> ℹ️ **This should be rare now.** The server auto-creates the `curia` database on startup. If you still see this error, it means the auto-create also failed.

**Possible causes (check each one):**

**1. Wrong password** — the auto-create connects to PostgreSQL's default `postgres` database first. If the password in `.env` is wrong, it can't connect at all:
1. Open PGAdmin → disconnect from your server → reconnect → the password it asks for is the one you need
2. Open your `.env` file: `open -e ~/Desktop/curia/backend/.env`
3. Set `DB_PASSWORD=` to that exact password
4. Save, then restart: press **Ctrl + C** in Terminal, run `npm start` again

**2. Wrong port** — your `.env` connects to a different PostgreSQL instance:
1. Open PGAdmin → right-click your server → **Properties** → **Connection** tab → check the **Port**
2. Open your `.env` file: `open -e ~/Desktop/curia/backend/.env`
3. Set `DB_PORT=` to that port number (e.g. `5433`)
4. Save, then restart: press **Ctrl + C** in Terminal, run `npm start` again

**3. Edited `.env.example` instead of `.env`** — the server only reads `.env` (without "example"):
1. Check: `ls ~/Desktop/curia/backend/.env` — if it says "No such file", run: `cp .env.example .env`
2. Then edit `.env` (not `.env.example`): `open -e ~/Desktop/curia/backend/.env`

### ❌ `password authentication failed`

Wrong password in `.env`.

**Fix it:**

1. Open PGAdmin → disconnect from your server → reconnect → the password it asks for is the one you need
2. Open your `.env` file: `open -e ~/Desktop/curia/backend/.env`
3. Set `DB_PASSWORD=` to that exact password
4. Save, then restart: press **Ctrl + C** in Terminal, run `npm start` again

### ❌ `connection refused`

PostgreSQL isn't running.

**Fix it:** In PGAdmin, check if your server has a red X icon. If yes, right-click → Connect. If that doesn't work, restart your Mac.

### ❌ `role "postgres" does not exist`

Your PostgreSQL uses your Mac username instead of "postgres".

**Fix it:** Run `whoami` in Terminal, then set `DB_USER=` to that name in `.env`.

### ❌ Server says `PostgreSQL not reachable` (no specific error)

1. Check `.env` file exists (not just `.env.example`): `ls ~/Desktop/curia/backend/.env`
2. Check password is correct
3. Check port is correct (Step 3b)
4. Restart the server with `npm start`

### ❌ I don't have a `.env` file

Run:

```bash
cd ~/Desktop/curia/backend && cp .env.example .env
```

Then go to Step 3d to edit it.

### ❌ I forgot my PostgreSQL password

In Terminal:

```bash
psql postgres -c "ALTER USER postgres WITH PASSWORD 'newpassword';"
```

Then update `DB_PASSWORD=newpassword` in your `.env`.

### ❓ Does the `.env` file need to be in PGAdmin?

**No.** The `.env` file is ONLY for your backend project folder (`~/Desktop/curia/backend/`).

PGAdmin is a completely separate tool — it's just a visual interface for looking at your database. PGAdmin has its own settings (you enter them when you create a server connection in PGAdmin). The `.env` file tells your **Node.js backend server** how to connect to PostgreSQL.

Think of it this way:
- **PGAdmin** = a window to look at the database (like a file browser)
- **`.env` file** = the address your backend server uses to find the database

They both connect to the same PostgreSQL, but they have separate settings. PGAdmin stores its settings internally. Your backend server reads its settings from `.env`.

---

## What was added in Phase 2 Step 1

<details>
<summary>Click to see the technical details</summary>

### New files (4)

| File | What it does |
|------|-------------|
| `src/config/dbInit.js` | Database initialization — tests PostgreSQL, runs migrations, wires repositories. Falls back to in-memory if DB unavailable. |
| `src/repositories/userRepository.js` | User CRUD — `create`, `findByEmail`, `findById`, `update`, `remove`, `count`. Works with both in-memory and PostgreSQL. |
| `src/repositories/sessionRepository.js` | Session management — token blacklist, refresh tokens, session limits. Works with both in-memory and PostgreSQL. |
| `tests/repositories.test.js` | 24 tests for both repositories. |

### Updated files (3)

| File | What changed |
|------|-------------|
| `src/server.js` | Calls `initializeDatabase()` on startup. |
| `src/routes/auth.js` | Uses `userRepository` instead of in-memory array. |
| `src/middleware/auth.js` | Uses `sessionRepository` for token blacklist. |

### Architecture

```
Express Routes  →  userRepository.js / sessionRepository.js
                            ↓
                      dbInit.js
                   (connects to DB or falls back to in-memory)
                            ↓
                PostgreSQL (23 tables, migrations, seeds)
```

**Test count:** 124 tests across 4 suites.

</details>
