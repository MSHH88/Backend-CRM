# Phase 2 Step 1.4 — Fix & Verify Auth with Database

## ⬇️ UPDATED FILE — download required

| # | File | What changed | Download to |
|---|------|-------------|-------------|
| 1 | `userRepository.js` | **Bug fix:** added `role` ↔ `role_id` column mapping | `backend/src/repositories/userRepository.js` |

> **What was the bug?** The database column is called `role_id` but the code was sending `role`. The INSERT failed with `column "role" of relation "users" does not exist`.
>
> **What was fixed?** Two lines added to `userRepository.js` — `role: 'role_id'` in `toSnake()` and `role_id: 'role'` in `toCamel()`.

---

## Step 1 — Download the updated file

Download **`userRepository.js`** from the PR and replace:

```
backend/src/repositories/userRepository.js
```

(Your local path: `~/Desktop/curia/backend/src/repositories/userRepository.js`)

---

## Step 2 — Drop the old test user (clean slate)

The previous failed register may have left bad data. In **PGAdmin**:

1. Open **PGAdmin** → **PostgreSQL 18** → **Databases** → **curia**
2. Click **Schemas** → **public** → **Tables** → right-click **users** → **View/Edit Data** → **All Rows**
3. If you see any rows, select them and delete them (or just leave it — if the old register failed, the table is empty)

Or skip this step — if the INSERT failed, nothing was saved.

---

## Step 3 — Stop the server if running

Go to the Terminal where the server is running and press **Ctrl+C**.

---

## Step 4 — Start the server

```bash
cd ~/Desktop/curia/backend && npm start
```

⚠️ **Leave this Terminal open.** The server runs in it.

You should see `✅ Database initialised — repositories connected to PostgreSQL`.

---

## Step 5 — Open a new Terminal tab

Press **Cmd+T** to open a new tab. All curl commands go here.

---

## Step 6 — Register a test user

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@curia.com","password":"MyPass123!","firstName":"Test","lastName":"User"}' \
  | python3 -m json.tool
```

**✅ Expected output:**

```json
{
    "success": true,
    "message": "Registration successful",
    "user": {
        "id": "...",
        "email": "test@curia.com",
        "firstName": "Test",
        "lastName": "User",
        "role": 1
    },
    "tokens": {
        "accessToken": "eyJ...",
        "refreshToken": "eyJ...",
        "expiresIn": "15m",
        "tokenType": "Bearer"
    }
}
```

If you see `"success": true` → the bug is fixed and the user was created in the database. 🎉

---

## Step 7 — Verify the user exists by logging in

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@curia.com","password":"MyPass123!"}' \
  | python3 -m json.tool
```

**✅ Expected:** `"success": true` and `"Login successful"`.

---

## Step 8 — Stop the server

Go back to the **first Terminal tab** (where the server is running) and press **Ctrl+C** to stop it.

---

## Step 9 — Start the server again

```bash
npm start
```

Wait for `✅ Database initialised — repositories connected to PostgreSQL`.

---

## Step 10 — Login again (proves user survived restart)

Go to the **second Terminal tab** and paste:

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@curia.com","password":"MyPass123!"}' \
  | python3 -m json.tool
```

**✅ Expected:** Same `"success": true` and `"Login successful"` — the user was NOT lost when the server restarted.

**❌ If it says "Invalid email or password":** The user was lost — that means the database is not persisting. Let me know and we will debug.

---

## Step 11 — Check the user in PGAdmin

1. Open **PGAdmin**
2. Click on **PostgreSQL 18** → **Databases** → **curia**
3. Click on **Schemas** → **public** → **Tables** → right-click **users** → **View/Edit Data** → **All Rows**
4. You should see your user `test@curia.com` in the table

---

## ✅ Done!

If Step 10 shows `"Login successful"` after the restart, then **Step 1.4 (Register → user persists in DB)** is verified.

---

## 🔧 Quick fixes

| Error | Fix |
|-------|-----|
| `column "role" of relation "users" does not exist` | You are still using the old `userRepository.js`. Download the updated file from Step 1. |
| `"A user with this email already exists"` | Good — means you already registered. Skip to Step 7. |
| `password authentication failed` | Wrong password in `.env`. Open `.env`, fix `DB_PASSWORD`, restart. |
| `connection refused` | PostgreSQL not running. Open PGAdmin, click on **PostgreSQL 18** to connect. |
| `Cannot POST /api/v1/auth/register` | Server not running. Go to first tab, run `npm start`. |
