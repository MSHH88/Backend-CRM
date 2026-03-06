# How to Test the Backend

Open **Terminal** on your Mac. Paste each block one at a time.

---

## 1. Download all files

Paste this in Terminal. It deletes your old files and downloads all new ones:

```bash
cd ~/Desktop/curia/backend && \
rm -rf src/ tests/ && \
mkdir -p src/config src/data src/db src/engine src/middleware src/routes src/utils tests && \
BASE="https://raw.githubusercontent.com/MSHH88/Backend-CRM/copilot/analyze-project-phase-1/backend" && \
curl -fsSL "$BASE/src/app.js"                        -o src/app.js && \
curl -fsSL "$BASE/src/server.js"                     -o src/server.js && \
curl -fsSL "$BASE/src/config/database.js"            -o src/config/database.js && \
curl -fsSL "$BASE/src/config/index.js"               -o src/config/index.js && \
curl -fsSL "$BASE/src/config/migrations.js"          -o src/config/migrations.js && \
curl -fsSL "$BASE/src/config/swagger.js"             -o src/config/swagger.js && \
curl -fsSL "$BASE/src/data/basePrices.js"            -o src/data/basePrices.js && \
curl -fsSL "$BASE/src/data/profileMultipliers.js"    -o src/data/profileMultipliers.js && \
curl -fsSL "$BASE/src/data/surcharges.js"            -o src/data/surcharges.js && \
curl -fsSL "$BASE/src/db/schema.sql"                 -o src/db/schema.sql && \
curl -fsSL "$BASE/src/engine/priceCalculator.js"     -o src/engine/priceCalculator.js && \
curl -fsSL "$BASE/src/engine/surchargeCalculator.js" -o src/engine/surchargeCalculator.js && \
curl -fsSL "$BASE/src/middleware/auth.js"             -o src/middleware/auth.js && \
curl -fsSL "$BASE/src/middleware/errorHandler.js"     -o src/middleware/errorHandler.js && \
curl -fsSL "$BASE/src/middleware/security.js"         -o src/middleware/security.js && \
curl -fsSL "$BASE/src/routes/auth.js"                -o src/routes/auth.js && \
curl -fsSL "$BASE/src/routes/berechnen.js"           -o src/routes/berechnen.js && \
curl -fsSL "$BASE/src/routes/options.js"             -o src/routes/options.js && \
curl -fsSL "$BASE/src/routes/warenkorb.js"           -o src/routes/warenkorb.js && \
curl -fsSL "$BASE/src/utils/logger.js"               -o src/utils/logger.js && \
curl -fsSL "$BASE/src/utils/responseFormatter.js"    -o src/utils/responseFormatter.js && \
curl -fsSL "$BASE/tests/api.test.js"             -o tests/api.test.js && \
curl -fsSL "$BASE/tests/auth.test.js"            -o tests/auth.test.js && \
curl -fsSL "$BASE/tests/priceCalculator.test.js" -o tests/priceCalculator.test.js && \
curl -fsSL "$BASE/package.json"   -o package.json && \
curl -fsSL "$BASE/.eslintrc.js"   -o .eslintrc.js && \
curl -fsSL "$BASE/.env.example"   -o .env.example && \
curl -fsSL "$BASE/.gitignore"     -o .gitignore && \
npm install && \
echo "" && echo "✅ Done"
```

You should see `✅ Done` at the end.

---

## 2. Run tests

Paste this in Terminal:

```bash
npm test
```

You should see:

```
Tests:       95 passed, 95 total
```

Ignore "Force exiting Jest" — that is normal.

📋 **Copy the last 10 lines and paste them back to me.**

---

## 3. Start the server

Paste this in Terminal:

```bash
npm start
```

You should see:

```
🚀 CURIA Backend Server Started
```

**Do NOT close this terminal window.** Leave it running.

---

## 4. Test the endpoints

Open a **new terminal tab** (press **Cmd+T**). Paste this:

```bash
curl http://localhost:3001/health && echo "" && \
curl http://localhost:3001/api/v1 && echo "" && \
curl -X POST "http://localhost:3001/ajax/berechnen/?format=json" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'tmp_obj={"breite":1000,"hoehe":1200,"profil":"p1","verglasung":"g1","aussenfarbe":"fs1_01","innenfarbe":"fi1_01","schallschutz":"ss1","sicherheitsverglasung":"sv0","griff":"gr1","sicherheit":"si1","sprossen":"sp0","vperfect":"vp0"}' && echo "" && \
curl http://localhost:3001/ajax/getOptions/
```

You should see **4 lines** that all start with `{` — they are JSON data.

📋 **Copy all the output and paste it back to me.**

Then go back to the server tab and press **Ctrl+C** to stop it.
