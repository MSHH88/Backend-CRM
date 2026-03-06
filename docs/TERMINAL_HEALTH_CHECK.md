# Terminal Health Check Commands

Run these commands in order from your project root (`Backend-CRM/`) to verify everything is working.

---

## 1. Prerequisites Check

```bash
# Check Node.js version (need >= 18.0.0)
node -v

# Check npm version
npm -v
```

**Expected:** Node v18+ and npm v9+

---

## 2. Install Dependencies

```bash
npm install
```

**Expected:** No errors, 0 vulnerabilities (or only low-severity ones)

---

## 3. Run All Tests (57 tests, 3 suites)

```bash
npm test -- --forceExit
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
npm start
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

Press `Ctrl+C` to stop after seeing this.

---

## 5. Test Endpoints (run in a second terminal while server is running)

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

---

## 6. File Counts Verification

```bash
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
| `docs/` | 10 | Planning docs (master plan, security, backend dev, etc.) |
| `tests/` | 3 | Jest test suites (priceCalculator, api, auth) |

---

## 7. Verify Key Source Files Exist

```bash
echo "--- Core ---"
ls src/app.js src/server.js

echo "--- Config ---"
ls src/config/

echo "--- Engine ---"
ls src/engine/

echo "--- Data ---"
ls src/data/

echo "--- Middleware ---"
ls src/middleware/

echo "--- Routes ---"
ls src/routes/

echo "--- Database ---"
ls src/db/

echo "--- Utils ---"
ls src/utils/
```

**Expected:** All files listed without "No such file" errors.

---

## 8. Verify New Datasets Content

```bash
# Gealan PVC - should have price matrix, surcharges, extraction scripts
echo "=== Gealan PVC ===" && ls Gealen-Kunstoff-PM/

# Holz Fenster - should have price matrix, surcharges CSV+JSON, complete data
echo "=== Holz Fenster ===" && ls Holz-Fenster-PM/

# Balkon Alu - should have price matrix, surcharges, complete data
echo "=== Balkon-Alu ===" && ls Balkon-Alu-PM/
```

---

## 9. Quick Lint Check

```bash
npm run lint
```

**Expected:** No errors (warnings are OK).

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
