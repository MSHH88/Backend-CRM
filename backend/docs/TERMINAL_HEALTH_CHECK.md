# Phase 2 Step 1 — Setup Guide

> **What is this?** A step-by-step guide. Each step does ONE thing.
> Every grey code block is something you **copy-paste into Terminal**, then press **Enter**.
> Do the steps **in order**. Finish one before starting the next.

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
> Do this BEFORE starting the server.

### 3a — Make sure your database exists

Open **PGAdmin** and look in the left sidebar:

```
▼ Servers
  ▼ your server (e.g. "curia" or "PostgreSQL 18")
    ▼ Databases
        curia  ← THIS must exist
        postgres
```

**Do you see `curia` under Databases?**

- **YES** → go to **Step 3b**
- **NO** → right-click **Databases** → **Create** → **Database…** → name it `curia` → **Save**

> ⚠️ **The server name in PGAdmin (like "curia" or "PostgreSQL 18") is NOT a database.** It's just a connection bookmark. The **database** is what appears *under* that server, inside the **Databases** folder.

### 3b — Create the .env file

```bash
cd ~/Desktop/curia/backend && cp .env.example .env && echo "✅ .env file created"
```

### 3c — Edit the .env file — set your database password

```bash
open -e ~/Desktop/curia/backend/.env
```

This opens the file in TextEdit. Find these lines and set your password:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curia
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD_HERE
```

**Replace `YOUR_PASSWORD_HERE`** with the password you enter when connecting to your server in PGAdmin. That's the same password you set when you installed PostgreSQL.

Save the file (**Cmd + S**) and close TextEdit.

> **Not sure what password you used?** Open PGAdmin, try to expand your server — it asks for a password. That's the one.

> **Installed PostgreSQL via Homebrew?** The default has no password. Leave it as `DB_PASSWORD=` (nothing after the `=`).

### 3d — Start the server

```bash
cd ~/Desktop/curia/backend && npm start
```

**✅ What you should see:**

```
🚀 CURIA Backend Server Started
...
📗 New database connection established
✅ Database connected: curia
...
✅ All migrations completed successfully!
✅ Database initialised — repositories connected to PostgreSQL
```

**❌ Still seeing `database "curia" does not exist`?** Check these things:

| Check this | How |
|-----------|-----|
| Does the database `curia` exist? | PGAdmin → expand server → look under **Databases** (not the server name) |
| Does `.env` exist? (not `.env.example`) | Run: `ls ~/Desktop/curia/backend/.env` — should show the file |
| Is `DB_NAME=curia` in the `.env`? | Run: `grep DB_NAME ~/Desktop/curia/backend/.env` |
| Is the password correct? | Open PGAdmin → disconnect and reconnect to your server → use the same password in `.env` |
| Is PostgreSQL running? | PGAdmin → your server should have a green icon (not red X) |
| Did you restart the server? | Press **Ctrl + C** in Terminal, then run `npm start` again |

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

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `database "curia" does not exist` | The database hasn't been created yet. In PGAdmin: expand your server → right-click **Databases** → Create → Database → name it `curia`. A PGAdmin server name is NOT a database. |
| `password authentication failed` | Wrong password in `.env`. Open PGAdmin, disconnect from your server, reconnect — the password it asks for is what goes in `DB_PASSWORD`. |
| `connection refused` | PostgreSQL isn't running. In PGAdmin, check if your server has a red X icon. Restart PostgreSQL or your Mac. |
| `role "postgres" does not exist` | Your PostgreSQL uses your Mac username instead. Run `whoami` in Terminal, then set `DB_USER=` to that name in `.env`. |
| Server says `PostgreSQL not reachable` | 1) Check `.env` file exists (not just `.env.example`). 2) Check password is correct. 3) Restart the server with `npm start`. |
| I don't have a `.env` file | Run: `cd ~/Desktop/curia/backend && cp .env.example .env` then edit it (Step 3c). |
| I forgot my PostgreSQL password | In Terminal: `psql postgres -c "ALTER USER postgres WITH PASSWORD 'newpassword';"` then update `.env`. |

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
