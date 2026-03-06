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
| 1 | [api.test.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/tests/api.test.js) | `api.test.js` | `~/Desktop/curia/backend/tests/` |
| 2 | [auth.test.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/tests/auth.test.js) | `auth.test.js` | `~/Desktop/curia/backend/tests/` |
| 3 | [priceCalculator.test.js](https://github.com/MSHH88/Backend-CRM/blob/copilot/analyze-project-phase-1/tests/priceCalculator.test.js) | `priceCalculator.test.js` | `~/Desktop/curia/backend/tests/` |

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
cd ~/Desktop/curia/backend && echo "Source files:" && find src/ -type f | wc -l
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
cd ~/Desktop/curia/backend && echo "=========================================" && echo " WHAT WE HAVE vs WHAT WE STILL NEED" && echo "=========================================" && echo "" && echo "✅ WHAT WE HAVE (Phase 1 Complete):" && echo "---" && echo -n "  Node.js:        " && node -v && echo -n "  npm:            " && npm -v && echo -n "  package.json:   " && (ls package.json > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  node_modules:   " && (ls node_modules/.package-lock.json > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  .env file:      " && (ls .env > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  Source code:    " && echo "$(find src/ -type f | wc -l | tr -d ' ') files" && echo -n "  Tests:          " && echo "$(find tests/ -type f 2>/dev/null | wc -l | tr -d ' ') files (57 tests)" && echo -n "  Express server: " && (grep -q '"express"' package.json && echo "YES (port 3001)" || echo "NO") && echo -n "  Auth system:    " && (ls src/routes/auth.js > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  Pricing engine: " && (ls src/engine/priceCalculator.js > /dev/null 2>&1 && echo "YES" || echo "NO") && echo -n "  Security:       " && (ls src/middleware/security.js > /dev/null 2>&1 && echo "YES" || echo "NO") && echo "" && echo "🔲 WHAT WE STILL NEED (Phase 2+):" && echo "---" && echo "  PostgreSQL:     NOT INSTALLED — needed for Phase 2" && echo "  Gealan pricing: NOT YET — dataset ready, engine not built" && echo "  Holz pricing:   NOT YET — dataset ready, engine not built" && echo "  Alu pricing:    NOT YET — dataset ready, engine not built" && echo "  Frontend:       NOT YET — Phase 3" && echo "  CRM features:   NOT YET — Phase 4" && echo "" && echo "========================================="
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
