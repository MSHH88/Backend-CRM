# Terminal Health Check Commands

Run these commands **in order** from your terminal on your MacBook.

> ⚠️ **IMPORTANT:** Every command below assumes you are inside the project folder
> that contains `package.json`. If you get `ENOENT: no such file or directory ...
> package.json` it means you are NOT in the right folder. Follow Step 0 carefully.

> 💡 **PostgreSQL / pgAdmin NOT needed yet.** The current version uses in-memory
> stores for everything. You do NOT need to install or open PGAdmin, PostgreSQL,
> or any database. Just Node.js and npm.

---

## 0. Find Your Project Folder

The key is to be **inside the folder that contains `package.json`** before
running any npm commands. Your setup may be one of two layouts:

### Layout A: `package.json` is inside `curia/backend/`

If your local folder looks like `~/Desktop/curia/backend/` and the backend
subfolder has `package.json`, `src/`, etc., then use:

```bash
cd ~/Desktop/curia/backend
```

Verify:

```bash
pwd && ls package.json
```

**Expected:**
```
/Users/neilapacesaite/Desktop/curia/backend
package.json
```

### Layout B: `package.json` is directly inside `curia/`

If you cloned the full repo so that `package.json` is at the top level of
`curia/`, then use:

```bash
cd ~/Desktop/curia
```

Verify:

```bash
pwd && ls package.json
```

**Expected:**
```
/Users/neilapacesaite/Desktop/curia
package.json
```

### Not sure which layout you have?

Run this to find out:

```bash
ls ~/Desktop/curia/package.json 2>/dev/null && echo "Layout B — use: cd ~/Desktop/curia" || \
ls ~/Desktop/curia/backend/package.json 2>/dev/null && echo "Layout A — use: cd ~/Desktop/curia/backend" || \
echo "Neither found — you need to clone the repo first"
```

### If you need to clone the repo fresh

```bash
rm -rf ~/Desktop/curia
git clone https://github.com/MSHH88/Backend-CRM.git ~/Desktop/curia
cd ~/Desktop/curia
```

---

> 📌 **For the rest of this guide**, replace `PROJECT` with your actual path:
> - **Layout A:** `PROJECT=~/Desktop/curia/backend`
> - **Layout B:** `PROJECT=~/Desktop/curia`
>
> Set it once and all commands below will work:
> ```bash
> # Pick ONE of these — whichever matches your layout:
> PROJECT=~/Desktop/curia/backend
> # or
> PROJECT=~/Desktop/curia
> ```

---

## 1. Check Prerequisites (what you need installed)

### 1a. Git

```bash
git --version
```

**Expected:** `git version 2.x.x` (any 2.x version is fine)

**If missing:** Run `xcode-select --install` in Terminal (macOS installs Git automatically)

### 1b. Node.js

```bash
node -v
```

**Expected:** `v18.x.x` or higher (v20, v22, v24 all work)

**If missing:** Install from https://nodejs.org — download the **LTS** version

### 1c. npm (comes with Node.js)

```bash
npm -v
```

**Expected:** `9.x.x` or higher

**If missing:** It installs automatically with Node.js. If outdated, run: `npm install -g npm@latest`

### 1d. Summary check — run all at once

```bash
echo "=== Git ===" && git --version && echo "=== Node ===" && node -v && echo "=== npm ===" && npm -v
```

**Expected:** All three show version numbers, no "command not found" errors.

---

## 2. Check That the Repo Exists Locally

```bash
ls ~/Desktop/curia/package.json 2>/dev/null && echo "✅ Layout B — repo at ~/Desktop/curia" || \
(ls ~/Desktop/curia/backend/package.json 2>/dev/null && echo "✅ Layout A — repo at ~/Desktop/curia/backend") || \
echo "❌ Repo not found — you need to clone it (see Step 0)"
```

If it says `❌ Repo not found`, clone it:

```bash
git clone https://github.com/MSHH88/Backend-CRM.git ~/Desktop/curia
cd ~/Desktop/curia
```

---

## 3. Navigate to the Project & Check Structure

```bash
cd $PROJECT
```

Then verify you're in the right place:

```bash
pwd && echo "---" && ls
```

**Expected:** You should see these items:

```
package.json
package-lock.json
src/
tests/
docs/
.env.example
.gitignore
README.md
```

If you also see `backend/`, `datasets/`, `Gealen-Kunstoff-PM/`, `Holz-Fenster-PM/`, `Balkon-Alu-PM/` — you have the **full repo** (Layout B). That's fine.

---

## 4. Check if Dependencies Are Installed

```bash
ls node_modules/.package-lock.json 2>/dev/null && echo "✅ node_modules exists" || echo "❌ node_modules missing — run: npm install"
```

If missing, install them:

```bash
npm install
```

**Expected:** No errors, `0 vulnerabilities` (or only low-severity ones).

---

## 5. Check the .env File

```bash
ls .env 2>/dev/null && echo "✅ .env exists" || echo "⚠️  .env missing — creating from example..."
```

If missing, create it from the example:

```bash
cp .env.example .env
echo "✅ .env created from .env.example"
```

Then verify it has the key settings:

```bash
grep -c "PORT" .env && grep -c "JWT_SECRET" .env && echo "✅ .env has required settings"
```

> **Note:** The default `.env.example` values work for local development.
> You do NOT need to change anything for testing.

---

## 6. Run All Tests (57 tests, 3 suites)

```bash
cd $PROJECT && npm test -- --forceExit
```

**Expected output (last lines):**
```
Test Suites: 3 passed, 3 total
Tests:       57 passed, 57 total
```

The `--forceExit` is needed because bcrypt keeps handles open.

**If tests fail:** Check that you ran `npm install` first (Step 4).

---

## 7. Start Server (quick check, then Ctrl+C to stop)

```bash
cd $PROJECT && npm start
```

**Expected output:**
```
==================================================
🚀 CURIA Backend Server Started
==================================================
📍 Environment: development
🌐 Server URL: http://localhost:3001
❤️  Health Check: http://localhost:3001/health
📚 API Docs: http://localhost:3001/api/v1
==================================================
```

**Leave this terminal open** — the server must stay running for Step 8.

---

## 8. Test Endpoints (open a SECOND terminal tab — Cmd+T)

Open a **new** terminal tab/window (Cmd+T), then run each command one at a time:

### 8a. Health check

```bash
curl http://localhost:3001/health
```

**Expected:** JSON with `"status": "ok"` and `"message": "CURIA Backend is running"`

### 8b. API info

```bash
curl http://localhost:3001/api/v1
```

**Expected:** JSON listing all available endpoints

### 8c. Price calculation test (Drutex Kunststoff Fenster)

```bash
curl -X POST http://localhost:3001/ajax/berechnen/ \
  -H "Content-Type: application/json" \
  -d '{"width": 1000, "height": 1200, "profile": "iglo5"}'
```

**Expected:** JSON with calculated price data

### 8d. Get configurator options

```bash
curl http://localhost:3001/ajax/getOptions/
```

**Expected:** JSON with available profiles, glass types, colors, etc.

> After testing, go back to the first terminal and press `Ctrl+C` to stop the server.

---

## 9. File Counts Verification

```bash
cd $PROJECT

echo "=== Source code ===" && find src/ -type f | wc -l
echo "=== Test files ===" && find tests/ -type f 2>/dev/null | wc -l
```

> **Note:** Some folders below only exist if you have the full repo clone
> (Layout B). If you're using Layout A (`curia/backend/`), you'll only have
> `src/` and possibly `logs/`.

```bash
# Only if you have the full repo (Layout B):
cd ~/Desktop/curia
echo "=== Backend reference ===" && find backend/ -type f 2>/dev/null | wc -l
echo "=== Drutex datasets ===" && find datasets/ -type f 2>/dev/null | wc -l
echo "=== Gealan PVC data ===" && find Gealen-Kunstoff-PM/ -type f 2>/dev/null | wc -l
echo "=== Holz Fenster data ===" && find Holz-Fenster-PM/ -type f 2>/dev/null | wc -l
echo "=== Balkon-Alu data ===" && find Balkon-Alu-PM/ -type f 2>/dev/null | wc -l
echo "=== Documentation ===" && find docs/ -type f 2>/dev/null | wc -l
```

**Expected counts:**
| Folder | Files | Contents |
|--------|-------|----------|
| `src/` | 20 | Active codebase (Express, pricing engine, auth, middleware) |
| `tests/` | 3 | Jest test suites (priceCalculator, api, auth) |
| `backend/` | 27 | Reference code from previous sessions (SUBPAGES-FenTuRo) |
| `datasets/drutex-kunststoff-fenster/` | 23 | Drutex Kunststoff pricing data + extraction tools |
| `Gealen-Kunstoff-PM/` | 11 | Gealan PVC price matrices, extraction scripts, konfigurators |
| `Holz-Fenster-PM/` | 5 | Holz (Wood) Fenster price matrix, surcharges, complete data |
| `Balkon-Alu-PM/` | 3 | Alu Balkontür price matrix, surcharges, complete data |
| `docs/` | 11 | Planning docs (master plan, security, backend dev, etc.) |

---

## 10. Verify Key Source Files Exist

```bash
cd $PROJECT

echo "--- Core ---"
ls src/app.js src/server.js

echo "--- Config ---"
ls src/config/

echo "--- Data (pricing tables) ---"
ls src/data/

echo "--- Engine (price calculator) ---"
ls src/engine/

echo "--- Middleware ---"
ls src/middleware/

echo "--- Routes ---"
ls src/routes/

echo "--- Utils ---"
ls src/utils/

echo "--- DB schema ---"
ls src/db/
```

**Expected:** All files listed without "No such file" errors.

**Source file inventory (20 files):**
| Path | Purpose |
|------|---------|
| `src/app.js` | Express app setup, middleware chain, route mounting |
| `src/server.js` | Server start, graceful shutdown |
| `src/config/database.js` | PostgreSQL connection config (future use) |
| `src/config/index.js` | Centralized settings (200+ config values) |
| `src/config/migrations.js` | DB table schemas (future use) |
| `src/data/basePrices.js` | Drutex base price lookup tables |
| `src/data/profileMultipliers.js` | Profile-specific multiplier values |
| `src/data/surcharges.js` | Surcharge rules for options/accessories |
| `src/db/schema.sql` | PostgreSQL schema DDL (future use) |
| `src/engine/priceCalculator.js` | Core pricing engine logic |
| `src/engine/surchargeCalculator.js` | Surcharge computation engine |
| `src/middleware/auth.js` | JWT authentication + RBAC middleware |
| `src/middleware/errorHandler.js` | Error classes + global error handler |
| `src/middleware/security.js` | Helmet, CORS, rate limiting, XSS, HPP |
| `src/routes/auth.js` | Auth routes (register/login/logout/refresh/me) |
| `src/routes/berechnen.js` | POST /ajax/berechnen/ — price calculation |
| `src/routes/options.js` | GET /ajax/getOptions/ — configurator options |
| `src/routes/warenkorb.js` | POST /ajax/addWarenkorb/ — cart operations |
| `src/utils/logger.js` | Winston logger with daily rotation |
| `src/utils/responseFormatter.js` | Standardized API response formatting |

---

## 11. Verify New Datasets Content (Layout B only)

> Skip this step if you're using Layout A (`curia/backend/`).

```bash
cd ~/Desktop/curia

echo "=== Gealan PVC ===" && ls Gealen-Kunstoff-PM/
echo "=== Holz Fenster ===" && ls Holz-Fenster-PM/
echo "=== Balkon-Alu ===" && ls Balkon-Alu-PM/
```

---

## 12. Check What's NOT Set Up Yet

Run this to see what's still missing (this is expected — these are Phase 2+ items):

```bash
cd $PROJECT

echo "========================================="
echo " WHAT WE HAVE vs WHAT WE STILL NEED"
echo "========================================="

echo ""
echo "✅ WHAT WE HAVE (Phase 1 Complete):"
echo "---"
echo -n "  Node.js:        " && node -v
echo -n "  npm:            " && npm -v
echo -n "  package.json:   " && (ls package.json > /dev/null 2>&1 && echo "YES" || echo "NO")
echo -n "  node_modules:   " && (ls node_modules/.package-lock.json > /dev/null 2>&1 && echo "YES" || echo "NO")
echo -n "  .env file:      " && (ls .env > /dev/null 2>&1 && echo "YES" || echo "NO — run: cp .env.example .env")
echo -n "  Source code:    " && echo "$(find src/ -type f | wc -l | tr -d ' ') files in src/"
echo -n "  Tests:          " && echo "$(find tests/ -type f 2>/dev/null | wc -l | tr -d ' ') test files (57 tests)"
echo -n "  Express server: " && (grep -q '"express"' package.json && echo "YES (port 3001)" || echo "NO")
echo -n "  Auth system:    " && (ls src/routes/auth.js > /dev/null 2>&1 && echo "YES (in-memory)" || echo "NO")
echo -n "  Pricing engine: " && (ls src/engine/priceCalculator.js > /dev/null 2>&1 && echo "YES (Drutex)" || echo "NO")
echo -n "  Security:       " && (ls src/middleware/security.js > /dev/null 2>&1 && echo "YES (helmet, CORS, rate-limit, XSS, HPP)" || echo "NO")

echo ""
echo "🔲 WHAT WE STILL NEED (Phase 2+):"
echo "---"
echo -n "  PostgreSQL:     " && (command -v psql > /dev/null 2>&1 && echo "INSTALLED ($(psql --version 2>/dev/null | head -1))" || echo "NOT INSTALLED — needed for Phase 2")
echo -n "  pgAdmin:        " && echo "NOT NEEDED until Phase 2 (optional GUI for PostgreSQL)"
echo -n "  ESLint config:  " && (ls .eslintrc* > /dev/null 2>&1 && echo "YES" || echo "MISSING — npm run lint won't work without it")
echo -n "  Gealan pricing: " && echo "NOT YET — dataset ready, engine not built"
echo -n "  Holz pricing:   " && echo "NOT YET — dataset ready, engine not built"
echo -n "  Alu pricing:    " && echo "NOT YET — dataset ready, engine not built"
echo -n "  Frontend:       " && echo "NOT YET — Phase 3"
echo -n "  CRM features:   " && echo "NOT YET — Phase 4"

echo ""
echo "========================================="
```

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `ENOENT ... package.json` | `package.json` is not in your current folder | See Step 0 — your `package.json` may be inside `curia/backend/` instead of `curia/`. Run `ls */package.json` to find it |
| `cd: no such file or directory: Backend-CRM` | Folder is called `curia` on your Desktop | Use `cd ~/Desktop/curia` or `cd ~/Desktop/curia/backend` |
| `cd: no such file or directory: /Users/.../curia` | You used `~/curia` but the folder is on your Desktop | Use `cd ~/Desktop/curia` |
| `Failed to connect to localhost port 3001` | Server is not running | Start it first with `cd $PROJECT && npm start` in another terminal |
| `curl: command not found` | curl not installed | Run `brew install curl` or use the browser: `http://localhost:3001/health` |
| `command not found: node` | Node.js not installed | Install from https://nodejs.org (LTS version) |
| `command not found: git` | Git not installed | Run `xcode-select --install` in Terminal |
| `npm run lint` shows "no config" | ESLint config file missing | This is a known gap — no `.eslintrc` file exists yet. Does not affect functionality. |
| `EADDRINUSE :::3001` | Port 3001 already in use | Another server is running. Stop it with `kill $(lsof -ti :3001)` then retry |

### Do I need pgAdmin / PostgreSQL?

**No, not yet.** The current version (Phase 1) uses in-memory data stores.
Everything works with just Node.js and npm. PostgreSQL will be needed later
in Phase 2 when we add database persistence.

---

## Summary: What's Working

- ✅ **Phase 1 Foundation (Steps 1.1-1.10)** — ALL COMPLETE
- ✅ **57 tests** passing across 3 suites (priceCalculator, api, auth)
- ✅ **Server** starts on port 3001
- ✅ **Auth system** (register/login/logout/refresh/me) — in-memory store
- ✅ **Security middleware** (helmet, CORS, rate limiting, XSS, HPP)
- ✅ **Pricing engine** (Drutex Kunststoff Fenster base prices + surcharges)
- ✅ **4 dataset collections** ready for analysis

## What's NOT Done Yet (Expected)

- 🔲 **ESLint config** — `.eslintrc` file missing, `npm run lint` won't find violations
- 🔲 **PostgreSQL** — not installed/needed yet (Phase 2)
- 🔲 **Multi-material pricing** — Gealan, Holz, Alu datasets exist but engines not built
- 🔲 **Frontend** — no frontend exists yet (Phase 3)
- 🔲 **CRM features** — not started (Phase 4)

## What's Next

- 🔲 Analyze new datasets (Gealan PVC, Holz Fenster, Balkon-Alu) to understand:
  - Does each material use a different price matrix/calculation?
  - Do doors, balcony doors, windows share the same formula?
  - What does the unified pricing engine need to handle?
- 🔲 Phase 1 Week 2: PostgreSQL schema + migrations (replace in-memory auth store)
- 🔲 Build comprehensive calculations for the Konfigurator
