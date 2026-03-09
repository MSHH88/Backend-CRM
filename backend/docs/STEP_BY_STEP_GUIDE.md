# Phase 2 Step 1.4 — Verify Auth with Database

> **No new files to download.** All code is already in place from Step 1.1.
> This step is about **testing** that registration works with PostgreSQL.

---

## What we are verifying

Register a user → user is saved in PostgreSQL → **survives server restart**.

---

## Step 1 — Make sure the server is running

```bash
cd ~/Desktop/curia/backend && npm start
```

⚠️ **Leave this Terminal open.** The server runs in it.

You should see `✅ Database initialised — repositories connected to PostgreSQL`.

---

## Step 2 — Open a new Terminal tab

Press **Cmd+T** to open a new tab. All curl commands go here.

---

## Step 3 — Register a test user

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

If you see `"success": true` → the user was created in the database.

---

## Step 4 — Verify the user exists by logging in

```bash
curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@curia.com","password":"MyPass123!"}' \
  | python3 -m json.tool
```

**✅ Expected output:**

```json
{
    "success": true,
    "message": "Login successful",
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

---

## Step 5 — Stop the server

Go back to the **first Terminal tab** (where the server is running) and press **Ctrl+C** to stop it.

---

## Step 6 — Start the server again

```bash
npm start
```

Wait for `✅ Database initialised — repositories connected to PostgreSQL`.

---

## Step 7 — Login again (proves user survived restart)

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

## Step 8 — Check the user in PGAdmin

1. Open **PGAdmin**
2. Click on **PostgreSQL 18** → **Databases** → **curia**
3. Click on **Schemas** → **public** → **Tables** → right-click **users** → **View/Edit Data** → **All Rows**
4. You should see your user `test@curia.com` in the table

---

## ✅ Done!

If Step 7 shows `"Login successful"` after the restart, then **Step 1.4 (Register → user persists in DB)** is verified.

---

## 🔧 Quick fixes

| Error | Fix |
|-------|-----|
| `"A user with this email already exists"` | Good — means you already registered. Skip to Step 4. |
| `password authentication failed` | Wrong password in `.env`. Open `.env`, fix `DB_PASSWORD`, restart. |
| `connection refused` | PostgreSQL not running. Open PGAdmin, click on **PostgreSQL 18** to connect. |
| `Cannot POST /api/v1/auth/register` | Server not running. Go to first tab, run `npm start`. |
