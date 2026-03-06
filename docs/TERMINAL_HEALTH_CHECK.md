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

## 1. Prerequisites Check

```bash
node -v
npm -v
```

**Expected:** Node v18+ and npm v9+

---

## 2. Install Dependencies

```bash
cd $PROJECT && npm install
```

**Expected:** No errors, 0 vulnerabilities (or only low-severity ones)

---

## 3. Run All Tests (57 tests, 3 suites)

```bash
cd $PROJECT && npm test -- --forceExit
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
cd $PROJECT

echo "--- Core ---" && ls src/app.js src/server.js 2>/dev/null || ls src/app.js 2>/dev/null || echo "Core files not found — check your folder"
echo "--- Config ---" && ls src/config/
echo "--- Middleware ---" && ls src/middleware/
echo "--- Routes ---" && ls src/routes/
echo "--- Utils ---" && ls src/utils/
```

**Expected:** All files listed without "No such file" errors.

---

## 8. Verify New Datasets Content (Layout B only)

> Skip this step if you're using Layout A (`curia/backend/`).

```bash
cd ~/Desktop/curia

echo "=== Gealan PVC ===" && ls Gealen-Kunstoff-PM/
echo "=== Holz Fenster ===" && ls Holz-Fenster-PM/
echo "=== Balkon-Alu ===" && ls Balkon-Alu-PM/
```

---

## 9. Quick Lint Check

```bash
cd $PROJECT && npm run lint
```

**Expected:** No errors (warnings are OK).

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
