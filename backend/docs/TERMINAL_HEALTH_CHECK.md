# How to Test the Backend — Step-by-Step

> **What is this?** This guide tells you exactly what to type in your Mac Terminal app.
> Every grey code block below is something you **copy and paste into Terminal**, then press **Enter**.
> You do NOT need to understand what the commands do — just paste them.

---

## Step 1 → Get the latest files

> **What this does:** It goes into your backend folder, deletes the old `src/` and `tests/` folders,
> then downloads fresh copies of ALL files from GitHub. You do not need to delete or download
> individual files yourself — this one block does everything automatically.

**Open Terminal** on your Mac (search for "Terminal" in Spotlight).

Copy the entire block below and paste it into Terminal, then press **Enter**:

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
echo "" && echo "✅ All files downloaded and installed"
```

**✅ Wait until you see:** `✅ All files downloaded and installed`

> If you see errors instead, make sure the GitHub repo is set to **Public** in its settings.

---

## Step 2 → Run the tests

> **What this does:** It runs the automated tests to check that all the code works correctly.

Copy and paste this into **the same Terminal window**:

```bash
cd ~/Desktop/curia/backend && npm test
```

**✅ What you should see at the bottom:**

```
Tests:       95 passed, 95 total
```

> The message "Force exiting Jest" may appear — **that is normal, ignore it.**

📋 **Copy the last 10 lines from Terminal and send them to me.**

---

## Step 3 → Start the server

> **What this does:** It starts the backend server on your computer so you can test the API.

Copy and paste this into **the same Terminal window**:

```bash
cd ~/Desktop/curia/backend && npm start
```

**✅ What you should see:**

```
🚀 CURIA Backend Server Started
```

⚠️ **IMPORTANT: Do NOT close this Terminal window. Leave the server running.**

---

## Step 4 → Test the endpoints

> **What this does:** It sends test requests to the running server to make sure all the
> API endpoints respond correctly.

Open a **second Terminal tab** by pressing **Cmd + T** (the server keeps running in the first tab).

Copy and paste this into **the new tab**:

```bash
curl http://localhost:3001/health && echo "" && \
curl http://localhost:3001/api/v1 && echo "" && \
curl -X POST "http://localhost:3001/ajax/berechnen/?format=json" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'tmp_obj={"breite":1000,"hoehe":1200,"profil":"p1","verglasung":"g1","aussenfarbe":"fs1_01","innenfarbe":"fi1_01","schallschutz":"ss1","sicherheitsverglasung":"sv0","griff":"gr1","sicherheit":"si1","sprossen":"sp0","vperfect":"vp0"}' && echo "" && \
curl http://localhost:3001/ajax/getOptions/
```

**✅ What you should see:** 4 lines of JSON data (text starting with `{`).

📋 **Copy all the output and send it to me.**

When you are done, go back to the **first tab** (the server) and press **Ctrl + C** to stop it.

---

## Quick Reference

| What do I do? | Answer |
|---|---|
| Do I need to delete files myself? | **No.** Step 1 deletes and re-downloads everything automatically. |
| Where do I paste the code blocks? | In the **Terminal** app on your Mac. |
| Do I paste the whole grey block? | **Yes.** Copy the entire block including all lines and paste it once. |
| What if I already ran Step 1 before? | Run it again — it always downloads the latest versions. |
| What is `npm test`? | A command that checks if the code works. You just paste it. |
| What is `npm start`? | A command that starts the server. You just paste it. |
| Why do I need two Terminal tabs? | One runs the server (Step 3), the other sends test requests (Step 4). |
