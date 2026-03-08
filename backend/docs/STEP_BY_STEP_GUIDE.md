# Phase 2 Step 1 — Step-by-Step Setup Guide

> **What is this?** A step-by-step guide. Each step does ONE thing.
> Every grey code block is something you **copy-paste into Terminal**, then press **Enter**.
> Do the steps **in order**. Finish one before starting the next.

> **Important:** The `.env` file is ONLY for the backend project folder (`~/Desktop/curia/backend/`).
> It has nothing to do with PGAdmin. PGAdmin is just a visual tool to look at your database.

---

## Step 1 → Delete old files

> **What this does:** Removes all old source files, tests, config, and the old `.env` so you start clean.
> ⚠️ This does NOT touch `node_modules/` — you don't need to re-download packages.

```bash
cd ~/Desktop/curia/backend && \
rm -f .env && \
rm -rf src/ tests/ && \
echo "✅ Old files deleted (src/, tests/, .env removed)"
```

**✅ You should see:** `✅ Old files deleted (src/, tests/, .env removed)`

---

## Step 2 → Download the new files

> **What this does:** Downloads ALL source files, tests, and config files from GitHub and places them in the correct folders.

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

**✅ You should see:** `✅ All files downloaded and installed`

---

## Step 3 → Run the tests

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

📋 **Copy the last 10 lines and send them to me. Then move to Step 4.**

---

## Step 4 → Make sure PostgreSQL is running

> **What this does:** Checks that your PostgreSQL server is running and finds the correct port.
> ℹ️ **You do NOT need to create the `curia` database manually.** The server creates it automatically.

### 4a — Check PostgreSQL is running (pick ONE option)

**Option A — Using PGAdmin (recommended if you have PGAdmin):**

1. Open **PGAdmin** from your Applications folder
2. In the left sidebar, look at your server (e.g. "PostgreSQL 18" or "curia")
3. If the icon is **green** → PostgreSQL is running ✅
4. If the icon has a **red X** → right-click → **Connect** → enter your password

**Option B — Using Terminal:**

```bash
pg_isready
```

✅ You should see: `accepting connections`
❌ If you see `no response` or `could not connect` → PostgreSQL is not running. Open PGAdmin and connect to your server, or restart your Mac.

### 4b — Find your port number ⚠️ IMPORTANT

> This is the **#1 reason** for connection errors. PostgreSQL 18 often uses port **5433** instead of 5432.

**Option A — Using PGAdmin:**

1. **Right-click** your server name (e.g. "PostgreSQL 18") in the left sidebar
2. Click **Properties**
3. Click the **Connection** tab
4. Look at the **Port** field — write down that number

```
┌────────────────────────────────────┐
│  Server Properties                 │
│  ─────────────────                 │
│  Connection tab:                   │
│                                    │
│  Host:  localhost                  │
│  Port:  5432   ← WRITE THIS DOWN  │
│  Username: postgres                │
│                                    │
└────────────────────────────────────┘
```

**Option B — Using Terminal (if you don't have PGAdmin open):**

```bash
psql postgres -c "SHOW port;" 2>/dev/null || psql -U $(whoami) postgres -c "SHOW port;" 2>/dev/null || echo "Could not detect port — check PGAdmin instead"
```

📝 **Remember this port number — you need it in the next step.**

### 4c — Find your password

> The password you need is the one PostgreSQL was set up with during installation.

If you're **not sure** what the password is, try this in Terminal:

```bash
psql postgres -U postgres -c "SELECT 1;" 2>&1
```

- If it says `1 row` → password might be empty or saved in your system
- If it says `password authentication failed` → you need to enter the correct password
- If it asks for a password → type it and press Enter

> **PGAdmin users:** When you expand your server in PGAdmin, it asks for a password. That's the one you need.

---

## Step 5 → Create the .env file and start the server

### 5a — Create .env from the template

```bash
cd ~/Desktop/curia/backend && cp .env.example .env && echo "✅ .env file created"
```

### 5b — Edit .env — set your PORT and PASSWORD

```bash
open -e ~/Desktop/curia/backend/.env
```

This opens the file in TextEdit. Find these lines:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=yourpassword
```

**Change two things:**

| Setting | What to change | How to find the value |
|---------|---------------|----------------------|
| `DB_PORT` | Set to the port from Step 4b | PGAdmin → right-click server → Properties → Connection → Port |
| `DB_PASSWORD` | Set to your PostgreSQL password | The password PGAdmin asks when you expand your server |

**Example** (if your port is 5432 and password is Curia.1312):

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=Curia.1312
```

Save the file (**Cmd + S**) and close TextEdit.

### 5c — Verify .env is correct

```bash
grep -E "^DB_" ~/Desktop/curia/backend/.env
```

**✅ You should see your actual values:**

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=yourActualPassword
```

Make sure:
- `DB_PORT` matches what you found in Step 4b
- `DB_PASSWORD` has your real password (not "yourpassword")

### 5d — Start the server

```bash
cd ~/Desktop/curia/backend && npm start
```

**✅ What you should see (first time — database gets auto-created):**

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

> ℹ️ The database **auto-creates** — you do NOT need to create it in PGAdmin or Terminal.
> If it already exists from a previous run, you'll skip straight to "Database connected".

⚠️ **Leave this Terminal window open — the server must keep running.**

📋 **Copy what you see and send it to me. Then move to Step 6.**

---

## Step 6 → Verify everything works

> **What this does:** Sends a test request to confirm the server and database are connected.

Press **Cmd + T** to open a **second Terminal tab**. Then paste:

```bash
curl -s http://localhost:3001/health | python3 -m json.tool
```

**✅ You should see** `"database": "connected"` in the response.

That's it! If you see `"connected"`, your database is working. 🎉

📋 **Copy the output and send it to me.**

---

## 🔧 Still getting errors?

### 🔍 First — run the diagnostic command

This shows you **exactly** what settings the server is reading from your `.env` file:

```bash
cd ~/Desktop/curia/backend && node -e "require('dotenv').config(); console.log('DB_HOST=' + (process.env.DB_HOST || 'localhost')); console.log('DB_PORT=' + (process.env.DB_PORT || '5432')); console.log('DB_NAME=' + (process.env.DB_NAME || 'curia')); console.log('DB_USER=' + (process.env.DB_USER || 'postgres')); console.log('DB_PASSWORD=' + (process.env.DB_PASSWORD ? '✅ set (' + process.env.DB_PASSWORD.length + ' chars)' : '❌ EMPTY'));"
```

**Check the output:**
- Does `DB_PORT` match what PGAdmin shows? (Step 4b)
- Does `DB_PASSWORD` say `✅ set`? If it says `❌ EMPTY`, your `.env` file is missing or the password line is wrong.
- Does `DB_NAME` say `curia`?

---

### ❌ `database "curia" does not exist`

> ℹ️ **This should be rare now.** The server auto-creates the `curia` database on startup. If you still see this error, it means the auto-create also failed.

**Most likely cause: wrong password or wrong port.** The auto-create connects to PostgreSQL's default `postgres` database first. If the password or port in `.env` is wrong, it can't connect at all.

**Fix:**
1. Run the diagnostic command above — check `DB_PORT` and `DB_PASSWORD`
2. Open PGAdmin → right-click your server → **Properties** → **Connection** tab → check **Port**
3. Open your `.env`: `open -e ~/Desktop/curia/backend/.env`
4. Fix `DB_PORT` and `DB_PASSWORD`
5. Save, then restart: press **Ctrl + C** in Terminal, then `npm start`

### ❌ `password authentication failed`

Wrong password in `.env`.

**Fix:**
1. Open PGAdmin → disconnect from your server → reconnect → the password it asks for is the one you need
2. Open your `.env` file: `open -e ~/Desktop/curia/backend/.env`
3. Set `DB_PASSWORD=` to that exact password
4. Save, then restart: press **Ctrl + C** in Terminal, run `npm start` again

### ❌ `connection refused`

PostgreSQL isn't running.

**Fix:** Open PGAdmin → if your server has a red X icon, right-click → Connect. If that doesn't work, restart your Mac.

### ❌ `role "postgres" does not exist`

Your PostgreSQL uses your Mac username instead of "postgres".

**Fix:** Run `whoami` in Terminal, then set `DB_USER=` to that name in `.env`.

### ❌ Server says `PostgreSQL not reachable`

1. Check `.env` file exists: `ls ~/Desktop/curia/backend/.env`
2. Check password is correct (see diagnostic command above)
3. Check port is correct (Step 4b)
4. Restart the server with `npm start`

### ❌ I don't have a `.env` file

```bash
cd ~/Desktop/curia/backend && cp .env.example .env
```

Then go to Step 5b to edit it.

### ❌ I forgot my PostgreSQL password

In Terminal:

```bash
psql postgres -c "ALTER USER postgres WITH PASSWORD 'newpassword';"
```

Then update `DB_PASSWORD=newpassword` in your `.env`.

### ❓ Does the `.env` file need to be in PGAdmin?

**No.** The `.env` file is ONLY for your backend project folder (`~/Desktop/curia/backend/`).

PGAdmin is a separate tool — it's just a visual interface for looking at your database. The `.env` file tells your **Node.js backend server** how to connect to PostgreSQL. They both connect to the same PostgreSQL, but they have separate settings.

- **PGAdmin** = a window to look at the database
- **`.env` file** = the address your backend server uses to find the database

---

## What was added in Phase 2 Step 1

<details>
<summary>Click to see the technical details</summary>

### New files (4)

| File | What it does |
|------|-------------|
| `src/config/dbInit.js` | Database initialization — auto-creates database, runs migrations, wires repositories. Falls back to in-memory if DB unavailable. |
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
                   (auto-creates DB, connects, or falls back to in-memory)
                            ↓
                PostgreSQL (23 tables, migrations, seeds)
```

**Test count:** 124 tests across 4 suites.

</details>
