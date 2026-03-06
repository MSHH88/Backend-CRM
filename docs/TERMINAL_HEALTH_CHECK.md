# Terminal Health Check — Step by Step

Copy-paste each command below into your Terminal on your Mac.
After each step, **paste the output back to me** so I can check it.

> 💡 You do **NOT** need PostgreSQL or pgAdmin. Just Node.js and npm.

---

## Step 1 — Open Terminal and go to your project

```bash
cd ~/Desktop/curia/backend
```

---

## Step 2 — Confirm you are in the right folder

```bash
pwd && ls package.json
```

**You should see:**
```
/Users/neilapacesaite/Desktop/curia/backend
package.json
```

---

## Step 3 — Check Git, Node, npm

```bash
echo "=== Git ===" && git --version && echo "=== Node ===" && node -v && echo "=== npm ===" && npm -v
```

**You should see:** version numbers for all three, no errors.

---

## Step 4 — Install dependencies (skip if already done)

```bash
npm install
```

**You should see:** ends with `0 vulnerabilities` or only low-severity.

---

## Step 5 — Make sure .env file exists

```bash
ls .env 2>/dev/null && echo "✅ .env exists" || (cp .env.example .env && echo "✅ Created .env")
```

---

## Step 6 — Check if test files exist

> ⚠️ **`@jest` folders are NOT test files.** If you see folders like `@jest/test-result` or `@jest/test-sequencer` in your project, those are internal Jest packages from `node_modules/`. The **real** test files are `api.test.js`, `auth.test.js`, and `priceCalculator.test.js` inside a `tests/` folder.

```bash
ls ~/Desktop/curia/backend/tests/api.test.js 2>/dev/null && echo "✅ tests/ exists — skip to Step 8" || echo "❌ tests/ missing — run Step 7 next"
```

---

## Step 7 — Download test files manually (only if Step 6 said missing)

### 7a. Create the `tests` folder

Open Finder → go to `~/Desktop/curia/backend/` → create a **new folder** called exactly:

```
tests
```

Or in Terminal:

```bash
mkdir -p ~/Desktop/curia/backend/tests
```

### 7b. Download 3 files

Open each link below in your browser. On the GitHub page, click the **"Raw"** button (located above the file content, on the right). Then **right-click → "Save As..."** (or press **Cmd+S**).

| # | File link (click to open on GitHub) | Save as | Save to folder |
|---|-------------------------------------|---------|----------------|
| 1 | [api.test.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/tests/api.test.js) | `api.test.js` | `~/Desktop/curia/backend/tests/` |
| 2 | [auth.test.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/tests/auth.test.js) | `auth.test.js` | `~/Desktop/curia/backend/tests/` |
| 3 | [priceCalculator.test.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/tests/priceCalculator.test.js) | `priceCalculator.test.js` | `~/Desktop/curia/backend/tests/` |

> ⚠️ **Save format:** Plain text (`.js`). Make sure your browser does NOT add `.txt` at the end. The file names must end in `.test.js` — that's how Jest finds them.

> 💡 **Tip:** When clicking "Raw", the URL changes to `raw.githubusercontent.com/...`. You can then press **Cmd+S** to save. Make sure the filename is exactly as shown above.

### 7c. Verify the files are in place

```bash
ls ~/Desktop/curia/backend/tests/
```

**You should see:**
```
api.test.js		auth.test.js		priceCalculator.test.js
```

If you see `api.test.js.txt` instead, rename it: remove the `.txt` part.

### 7d. Update your `src/` folder (IMPORTANT — your src/ may be outdated)

The tests need files that may not exist in your current `src/` folder yet (like `src/data/`, `src/engine/`, `src/routes/auth.js`). You need to replace your `src/` with the latest version.

**Easiest approach — download the whole `src/` folder:**

1. Open the [backend/src/ folder on GitHub](https://github.com/MSHH88/Backend-CRM/tree/copilot/analyze-project-phase-1/backend/src)
2. **Delete** your current `~/Desktop/curia/backend/src/` folder (move it to Trash first as backup)
3. **Create a new** `src/` folder in `~/Desktop/curia/backend/`
4. Download each file below — click the link, then click **"Raw"**, then **Cmd+S** to save:

**Folder `src/` (top level):**

| File | Save to |
|------|---------|
| [app.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/app.js) | `~/Desktop/curia/backend/src/` |
| [server.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/server.js) | `~/Desktop/curia/backend/src/` |

**Create folder `src/config/` then save:**

| File | Save to |
|------|---------|
| [database.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/config/database.js) | `~/Desktop/curia/backend/src/config/` |
| [index.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/config/index.js) | `~/Desktop/curia/backend/src/config/` |
| [migrations.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/config/migrations.js) | `~/Desktop/curia/backend/src/config/` |

**Create folder `src/data/` then save:**

| File | Save to |
|------|---------|
| [basePrices.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/data/basePrices.js) | `~/Desktop/curia/backend/src/data/` |
| [profileMultipliers.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/data/profileMultipliers.js) | `~/Desktop/curia/backend/src/data/` |
| [surcharges.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/data/surcharges.js) | `~/Desktop/curia/backend/src/data/` |

**Create folder `src/db/` then save:**

| File | Save to |
|------|---------|
| [schema.sql](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/db/schema.sql) | `~/Desktop/curia/backend/src/db/` |

**Create folder `src/engine/` then save:**

| File | Save to |
|------|---------|
| [priceCalculator.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/engine/priceCalculator.js) | `~/Desktop/curia/backend/src/engine/` |
| [surchargeCalculator.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/engine/surchargeCalculator.js) | `~/Desktop/curia/backend/src/engine/` |

**Create folder `src/middleware/` then save:**

| File | Save to |
|------|---------|
| [auth.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/middleware/auth.js) | `~/Desktop/curia/backend/src/middleware/` |
| [errorHandler.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/middleware/errorHandler.js) | `~/Desktop/curia/backend/src/middleware/` |
| [security.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/middleware/security.js) | `~/Desktop/curia/backend/src/middleware/` |

**Create folder `src/routes/` then save:**

| File | Save to |
|------|---------|
| [auth.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/routes/auth.js) | `~/Desktop/curia/backend/src/routes/` |
| [berechnen.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/routes/berechnen.js) | `~/Desktop/curia/backend/src/routes/` |
| [options.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/routes/options.js) | `~/Desktop/curia/backend/src/routes/` |
| [warenkorb.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/routes/warenkorb.js) | `~/Desktop/curia/backend/src/routes/` |

**Create folder `src/utils/` then save:**

| File | Save to |
|------|---------|
| [logger.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/utils/logger.js) | `~/Desktop/curia/backend/src/utils/` |
| [responseFormatter.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/src/utils/responseFormatter.js) | `~/Desktop/curia/backend/src/utils/` |

**Also update these top-level files:**

| File | Save to |
|------|---------|
| [package.json](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/package.json) | `~/Desktop/curia/backend/` (replace existing) |
| [.env.example](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/backend/.env.example) | `~/Desktop/curia/backend/` (replace existing) |

### 7e. Verify your updated src/ has 20 files

```bash
find ~/Desktop/curia/backend/src/ -type f -not -name '.DS_Store' | wc -l
```

**You should see:** `20`

> ⚠️ **Got 21?** macOS creates hidden `.DS_Store` files in every folder you open in Finder. The old command (`find ... -type f | wc -l`) counts those too. The updated command above filters them out. **21 is fine** — it just means you have one `.DS_Store` in `src/`.

### 7f. About hidden files in backend/

Your `backend/` folder may contain these hidden files — **do NOT delete them**:

| File | Purpose | Action |
|------|---------|--------|
| `.env` | Your local environment variables (port, secrets) | ✅ KEEP — needed to run the server |
| `.env.example` | Template showing which env vars are needed | ✅ KEEP — reference file |
| `.gitignore` | Tells Git which files to ignore (node_modules, logs, .env) | ✅ KEEP — prevents committing secrets |
| `.DS_Store` | macOS folder metadata (auto-created) | 🗑️ Safe to delete, but it comes back |

### 7g. Re-run npm install (IMPORTANT!)

The updated `package.json` includes `supertest` which the tests need. You **must** install it:

```bash
cd ~/Desktop/curia/backend && npm install
```

**You should see:** ends with `0 vulnerabilities` or low-severity only.

> ⚠️ **If you skip this, Step 8 will fail with:** `Cannot find module 'supertest'`

---

## Step 8 — Run all tests

```bash
cd ~/Desktop/curia/backend && npm test -- --forceExit
```

**You should see at the end:**
```
Test Suites: 3 passed, 3 total
Tests:       57 passed, 57 total
```

📋 **Paste the last 10 lines back to me.**

---

## Step 9 — Start the server

```bash
npm start
```

**You should see:**
```
🚀 CURIA Backend Server Started
🌐 Server URL: http://localhost:3001
```

⚠️ **Leave this terminal open! Do NOT close it.**

📋 **Paste what you see back to me.**

---

## Step 10 — Test the server (open a NEW terminal tab: Cmd+T)

Press **Cmd+T** to open a new tab. Then paste these one at a time:

### 10a.

```bash
curl http://localhost:3001/health
```

### 10b.

```bash
curl http://localhost:3001/api/v1
```

### 10c.

```bash
curl -X POST http://localhost:3001/ajax/berechnen/ -H "Content-Type: application/json" -d '{"width":1000,"height":1200,"profile":"iglo5"}'
```

### 10d.

```bash
curl http://localhost:3001/ajax/getOptions/
```

📋 **Paste all 4 outputs back to me.**

Then go back to the first tab and press **Ctrl+C** to stop the server.

---

## Step 11 — Count your files

```bash
cd ~/Desktop/curia/backend && echo "Source files:" && find src/ -type f -not -name '.DS_Store' | wc -l
```

**You should see:** `20`

---

## Step 12 — Check key files exist

```bash
cd ~/Desktop/curia/backend && ls src/app.js src/server.js src/engine/priceCalculator.js src/routes/auth.js src/middleware/security.js
```

**You should see:** all 5 file names listed, no errors.

---

## Step 13 — Full status check

```bash
cd ~/Desktop/curia/backend && echo "=========================================" && echo " WHAT WE HAVE vs WHAT WE STILL NEED" && echo "=========================================" && echo "" && echo "✅ WHAT WE HAVE (Phase 1 Complete):" && echo "---" && echo -n "  Node.js:        " && node -v && echo -n "  npm:            " && npm -v && echo -n "  package.json:   " && (ls package.json > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  node_modules:   " && (ls node_modules/.package-lock.json > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  .env file:      " && (ls .env > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  Source code:    " && echo "$(find src/ -type f -not -name '.DS_Store' | wc -l | tr -d ' ') files" && echo -n "  Tests:          " && echo "$(find tests/ -type f -not -name '.DS_Store' 2>/dev/null | wc -l | tr -d ' ') files (57 tests)" && echo -n "  Express server: " && (grep -q '"express"' package.json && echo "YES (port 3001)" || echo "NO") && echo -n "  Auth system:    " && (ls src/routes/auth.js > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  Pricing engine: " && (ls src/engine/priceCalculator.js > /dev/null 2>&1 && echo "YES (Drutex only)" || echo "NO") && echo -n "  Surcharges:     " && (ls src/engine/surchargeCalculator.js > /dev/null 2>&1 && echo "DRAFT (Drutex only — Phase 2 will complete)" || echo "NO") && echo -n "  Security:       " && (ls src/middleware/security.js > /dev/null 2>&1 && echo "YES" || echo "NO") && echo "" && echo "🔲 WHAT WE STILL NEED (Phase 2+):" && echo "---" && echo "  Dataset analysis: NOT DONE — Gealan/Holz/Alu data not yet analyzed" && echo "  Surcharges:       DRAFT — Drutex only, other materials need analysis first" && echo "  PostgreSQL:       NOT INSTALLED — needed for Phase 2" && echo "  Gealan pricing:   NOT YET — dataset ready, engine not built" && echo "  Holz pricing:     NOT YET — dataset ready, engine not built" && echo "  Alu pricing:      NOT YET — dataset ready, engine not built" && echo "  Frontend:         NOT YET — Phase 3" && echo "  CRM features:     NOT YET — Phase 4" && echo "" && echo "========================================="
```

📋 **Paste the full output back to me.**

---

## Should I paste terminal output back to you?

**YES!** After each step, paste the output into our chat. This lets me:
1. Confirm everything works
2. Spot errors immediately
3. Tell you what to do next

Just the last 5-10 lines is enough.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Cannot find module 'supertest'` | Run `npm install` — you need to re-install after downloading the new package.json (Step 7g) |
| `No tests found, exiting with code 1` | tests/ folder missing — run Step 7 to download the 3 test files |
| Found `@jest` folders but no tests | Those are internal Jest packages, NOT test files. See Step 6 note. Run Step 7 to get the real test files |
| Test file saved as `.test.js.txt` | Rename it: remove the `.txt` part so it ends in `.test.js` |
| `ENOENT ... package.json` | Run `cd ~/Desktop/curia/backend` first |
| `Failed to connect to localhost port 3001` | Server not running — go to Step 9 first |
| `command not found: node` | Install from https://nodejs.org |
| `EADDRINUSE :::3001` | Port in use — find the PID with `lsof -ti :3001` and stop it, then retry |

---

## Quick Summary

| What | Status |
|------|--------|
| Phase 1 (Steps 1.1-1.10) | ✅ DONE |
| 57 tests | ✅ Passing |
| Server on port 3001 | ✅ Working |
| Auth system | ✅ In-memory |
| Security middleware | ✅ Working |
| Pricing engine (Drutex) | ✅ Working |
| PostgreSQL | 🔲 Phase 2 |
| Multi-material pricing | 🔲 Datasets ready |
| Frontend | �� Phase 3 |
| CRM | 🔲 Phase 4 |
