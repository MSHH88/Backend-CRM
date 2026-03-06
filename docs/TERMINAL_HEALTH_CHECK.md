# Terminal Health Check Commands

Run these commands **in order** from your terminal on your MacBook.

> ⚠️ **IMPORTANT:** Every command below assumes you are inside the project folder
> that contains `package.json`. If you get `ENOENT: no such file or directory ...
> package.json` it means you are NOT in the right folder. Follow Step 0 carefully.

> 💡 **PostgreSQL / pgAdmin NOT needed yet.** The current version uses in-memory
> stores for everything. You do NOT need to install or open PGAdmin, PostgreSQL,
> or any database. Just Node.js and npm.

---

## 0. Clone the Project & Navigate Into It

### If you have NOT cloned the repo yet

Open Terminal (Cmd+Space → type "Terminal" → Enter), then run:

```bash
cd ~/Desktop
git clone https://github.com/MSHH88/Backend-CRM.git curia
cd ~/Desktop/curia
```

This clones the repository directly into a folder called `curia` on your Desktop.

### If your `curia` folder already exists but has no `package.json`

This usually means `git clone` created a subfolder inside `curia`. Check:

```bash
ls ~/Desktop/curia/package.json
```

If you see `No such file or directory`, check for a subfolder:

```bash
ls ~/Desktop/curia/Backend-CRM/package.json
```

If **that** works, the project is nested one level deep. Fix it by moving
everything up:

```bash
# Move repo contents up into curia directly
mv ~/Desktop/curia/Backend-CRM/{*,.[!.]*} ~/Desktop/curia/ 2>/dev/null
rmdir ~/Desktop/curia/Backend-CRM
```

Or, the simpler approach — just delete and re-clone:

```bash
rm -rf ~/Desktop/curia
git clone https://github.com/MSHH88/Backend-CRM.git ~/Desktop/curia
```

### Verify you're in the right place

```bash
cd ~/Desktop/curia
pwd && ls package.json
```

**Expected:**
```
/Users/neilapacesaite/Desktop/curia
package.json
```

If you see `No such file or directory` for `package.json`, go back to the
clone steps above — something is not right.

---

## 1. Prerequisites Check

```bash
node -v
npm -v
```

**Expected:** Node v18+ and npm v9+

---

## 2. Install Dependencies

```bash
cd ~/Desktop/curia && npm install
```

**Expected:** No errors, 0 vulnerabilities (or only low-severity ones)

---

## 3. Run All Tests (57 tests, 3 suites)

```bash
cd ~/Desktop/curia && npm test -- --forceExit
```

**Expected output (last lines):**
```
Test Suites: 3 passed, 3 total
Tests:       57 passed, 57 total
```

The `--forceExit` is needed because bcrypt keeps handles open.

---

## 4. Start Server (quick check, then Ctrl+C to stop)

```bash
cd ~/Desktop/curia && npm start
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

**Leave this terminal open** — the server must stay running for Step 5.

---

## 5. Test Endpoints (open a SECOND terminal tab — Cmd+T)

Open a **new** terminal tab/window (Cmd+T), then run:

```bash
# Health check
curl http://localhost:3001/health

# API info
curl http://localhost:3001/api/v1

# Price calculation test (Drutex Kunststoff Fenster)
curl -X POST http://localhost:3001/ajax/berechnen/ \
  -H "Content-Type: application/json" \
  -d '{"width": 1000, "height": 1200, "profile": "iglo5"}'

# Get configurator options
curl http://localhost:3001/ajax/getOptions/
```

**Expected:** JSON responses with status 200 for each.

> After testing, go back to the first terminal and press `Ctrl+C` to stop the server.

---

## 6. File Counts Verification

```bash
cd ~/Desktop/curia

echo "=== Active source code ===" && find src/ -type f | wc -l
echo "=== Backend reference ===" && find backend/ -type f | wc -l
echo "=== Drutex datasets ===" && find datasets/ -type f | wc -l
echo "=== Gealan PVC data ===" && find Gealen-Kunstoff-PM/ -type f | wc -l
echo "=== Holz Fenster data ===" && find Holz-Fenster-PM/ -type f | wc -l
echo "=== Balkon-Alu data ===" && find Balkon-Alu-PM/ -type f | wc -l
echo "=== Documentation ===" && find docs/ -type f | wc -l
echo "=== Test files ===" && find tests/ -type f | wc -l
```

**Expected counts:**
| Folder | Files | Contents |
|--------|-------|----------|
| `src/` | 20 | Active codebase (Express, pricing engine, auth, middleware) |
| `backend/` | 26 | Reference code from previous sessions (SUBPAGES-FenTuRo) |
| `datasets/drutex-kunststoff-fenster/` | 23 | Drutex Kunststoff pricing data + extraction tools |
| `Gealen-Kunstoff-PM/` | 11 | Gealan PVC price matrices, extraction scripts, konfigurators |
| `Holz-Fenster-PM/` | 5 | Holz (Wood) Fenster price matrix, surcharges, complete data |
| `Balkon-Alu-PM/` | 3 | Alu Balkontür price matrix, surcharges, complete data |
| `docs/` | 11 | Planning docs (master plan, security, backend dev, etc.) |
| `tests/` | 3 | Jest test suites (priceCalculator, api, auth) |

---

## 7. Verify Key Source Files Exist

```bash
cd ~/Desktop/curia

echo "--- Core ---" && ls src/app.js src/server.js
echo "--- Config ---" && ls src/config/
echo "--- Engine ---" && ls src/engine/
echo "--- Data ---" && ls src/data/
echo "--- Middleware ---" && ls src/middleware/
echo "--- Routes ---" && ls src/routes/
echo "--- Database ---" && ls src/db/
echo "--- Utils ---" && ls src/utils/
```

**Expected:** All files listed without "No such file" errors.

---

## 8. Verify New Datasets Content

```bash
cd ~/Desktop/curia

echo "=== Gealan PVC ===" && ls Gealen-Kunstoff-PM/
echo "=== Holz Fenster ===" && ls Holz-Fenster-PM/
echo "=== Balkon-Alu ===" && ls Balkon-Alu-PM/
```

---

## 9. Quick Lint Check

```bash
cd ~/Desktop/curia && npm run lint
```

**Expected:** No errors (warnings are OK).

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `ENOENT ... package.json` | `package.json` is not in your current folder | See Step 0 — you likely have a nested `Backend-CRM/` subfolder inside `curia`, or need to clone the repo |
| `cd: no such file or directory: Backend-CRM` | Folder is called `curia` on your Desktop | Use `cd ~/Desktop/curia` |
| `cd: no such file or directory: /Users/.../curia` | You used `~/curia` but the folder is on your Desktop | Use `cd ~/Desktop/curia` |
| `Failed to connect to localhost port 3001` | Server is not running | Start it first with `cd ~/Desktop/curia && npm start` in another terminal |
| `curl: command not found` | curl not installed | Run `brew install curl` or use the browser: `http://localhost:3001/health` |
| `command not found: node` | Node.js not installed | Install from https://nodejs.org (LTS version) |
| `command not found: git` | Git not installed | Run `xcode-select --install` in Terminal |

### Do I need pgAdmin / PostgreSQL?

**No, not yet.** The current version (Phase 1) uses in-memory data stores.
Everything works with just Node.js and npm. PostgreSQL will be needed later
in Phase 2 when we add database persistence.

---

## Summary: What's Working

- ✅ **Phase 1 Foundation (Steps 1.1-1.10)** — ALL COMPLETE
- ✅ **57 tests** passing across 3 suites
- ✅ **Server** starts on port 3001
- ✅ **Auth system** (register/login/logout/refresh/me) — in-memory store
- ✅ **Security middleware** (helmet, CORS, rate limiting, XSS, HPP)
- ✅ **Pricing engine** (Drutex Kunststoff Fenster base prices + surcharges)
- ✅ **4 dataset collections** ready for analysis

## What's Next

- 🔲 Analyze new datasets (Gealan PVC, Holz Fenster, Balkon-Alu) to understand:
  - Does each material use a different price matrix/calculation?
  - Do doors, balcony doors, windows share the same formula?
  - What does the unified pricing engine need to handle?
- 🔲 Phase 1 Week 2: PostgreSQL schema + migrations (replace in-memory auth store)
- 🔲 Build comprehensive calculations for the Konfigurator
