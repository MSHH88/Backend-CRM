# CURIA Backend-CRM

## Project Understanding

**CURIA** is a white-label SaaS platform for window/door/roller-shutter e-commerce. The CREATOR (platform master) builds and maintains the platform. Clients (CEOs) use it to run their businesses with a product configurator, CRM, and order management system.

**FenTuRo** is the brand name for the window/door business that will use this platform as its first client.

---

## Repositories

| Repo | Purpose | Status |
|------|---------|--------|
| **Backend-CRM** (this repo) | Backend server, CRM, API | 🔨 In Progress |
| **frontend-glass-configurator** | Frontend: homepage, configurator UI, glassmorphism design system | Phase 1 design done |

---

## What Was Already Done

### Backend (on `Backend` branch)

Phase 1 Steps 1.1–1.7 were completed by a previous agent:

| Step | Description | File(s) | Status |
|------|-------------|---------|--------|
| 1.1 | Project init, folder structure | `Backend/package.json` | ✅ Done |
| 1.2 | Dependencies installed | express, pg, helmet, cors, etc. | ✅ Done |
| 1.3 | Express server entry point | `Backend/src/app.js` | ✅ Done |
| 1.4 | Environment configuration | `Backend/src/config/index.js` | ✅ Done |
| 1.5 | Database connection (PostgreSQL) | `Backend/src/config/database.js` | ✅ Done |
| 1.6 | Error handling middleware | `Backend/src/middleware/errorHandler.js` | ✅ Done |
| 1.7 | Logging setup (Winston) | `Backend/src/utils/logger.js` (comprehensive, ~40KB) | ✅ Done |

Additionally built (ahead of schedule):
- `Backend/src/middleware/auth.js` – JWT auth middleware
- `Backend/src/middleware/security.js` – Security middleware (XSS, HPP, mongo-sanitize)
- `Backend/src/config/migrations.js` – Database migration SQL
- `Backend/src/routes/index.js` – Route definitions (~90KB — very large, likely needs splitting)

### Planning Documents (on `Previous-Session-files` branch)

33 documents covering:
- Master development plan (6 phases, 24 weeks)
- Backend development plan (pricing engine, surcharges, API specs)
- CRM & backend requirements (6-tier role system)
- Feature decisions (97 features catalogued)
- Design system (glassmorphism, color scheme, typography)
- Lessons learned (critical mistakes to avoid)
- Data collection guides
- Multiple HTML prototypes (header, homepage, configurator)

### Frontend Design (in `frontend-glass-configurator` repo)

- Homepage V1 design with glassmorphism effect
- Redesign CSS, implementation guide, quick reference
- Glassmorphism icon system
- Logo and branding assets

---

## The 6-Phase Plan (24 Weeks)

| Phase | Focus | Weeks | Status |
|-------|-------|-------|--------|
| **Phase 1** | Backend Foundation (server, DB, auth, API structure) | 1–4 | 🔨 Step 1.7 done, Step 1.8 next |
| **Phase 2** | Pricing & Configurator (price engine, surcharges, all manufacturers) | 5–8 | ⏳ Not started |
| **Phase 3** | Order System (cart, checkout, orders) | 9–10 | ⏳ Not started |
| **Phase 3.5** | Frontend Design (component-by-component UI) | 11–14 | ⏳ Not started |
| **Phase 4** | CRM Foundation (dashboard, roles, catalog management, analytics) | 15–18 | ⏳ Not started |
| **Phase 5** | Frontend & Integration (connect frontend ↔ backend) | 19–22 | ⏳ Not started |
| **Phase 6** | Testing & Launch | 23–24 | ⏳ Not started |

---

## Phase 1 Remaining Steps

These are the next steps to complete Phase 1:

- [ ] **Step 1.8: Security Middleware** – Review and integrate `security.js` into `app.js`
- [ ] **Step 1.9: Basic Route Structure** – Verify `routes/index.js` is properly mounted
- [ ] **Step 1.10: Authentication Setup** – Wire up `auth.js` middleware, create auth routes (login, register, logout, refresh, me)
- [ ] **Week 2: Database Schema** – Run migrations (users, roles, permissions, products, orders tables)
- [ ] **Week 3: Auth System** – Password hashing (bcrypt), JWT tokens, role-based access
- [ ] **Week 4: Core API Routes** – Users CRUD, Products CRUD, input validation, rate limiting per route

---

## Gaps & Questions Identified

### Code-Level Gaps

1. **Backend branch code is not on `main`** – The actual working code (app.js, middleware, etc.) lives only on the `Backend` branch. It needs to be brought into the main working branch for continued development.

2. **`node_modules` committed to git** – The `Backend` branch has `node_modules` checked in. This should be `.gitignore`d.

3. **Routes file is very large (~90KB)** – `routes/index.js` is likely doing too much in one file. Should be split into separate route files (auth.js, users.js, products.js, etc.) for maintainability.

4. **app.js has placeholder comments** – The routes, error handler, and logger imports in `app.js` are commented out. These need to be wired up to actually use the middleware that was built.

5. **No tests exist yet** – No test files were created. The Phase 1 plan calls for testing at the end of Week 4.

6. **No `.env.example`** – Environment template file wasn't created (mentioned in Step 1.4).

7. **No `.gitignore`** – Not present in the repo root, leading to committed `node_modules` and log files.

### Data/Process Gaps (Non-Blocking)

8. **PSK door base price matrix** – Incomplete (mentioned in backend plan, to be provided later)
9. **KATALOG with Einkaufspreise** – Needed by Week 16 for real margins
10. **CURIA Google Account** – Needed by Week 14 for GA4
11. **CEO company details** – Needed by Week 16 for invoices

### Questions for the User

12. **Which branch to develop on?** – Should we continue on the `Backend` branch, merge it to `main`, or start fresh bringing in the code files?
13. **Database availability** – Is a PostgreSQL instance available for development, or should we use SQLite/in-memory for now?
14. **Deployment target** – Where will this be hosted? (Render, Railway, VPS, etc.) This affects some configuration choices.

---

## Working Approach

Following the user's guidance for quality step-by-step work:

1. **One step at a time** – Complete each step fully before moving to the next
2. **Test after every change** – Verify nothing breaks
3. **Plan before code** – Understand existing code before modifying
4. **Small commits** – Incremental, reviewable changes
5. **Update this README** – Check off completed items as we go
6. **No rushing** – Calm, methodical progress

---

## Key Technical Decisions (From Previous Sessions)

| Decision | Choice | Notes |
|----------|--------|-------|
| Runtime | Node.js 18+ | |
| Framework | Express.js | |
| Database | PostgreSQL | via `pg` driver |
| Auth | JWT (30 min expiry) | bcrypt for passwords |
| Logging | Winston | Daily rotate files |
| Security | Helmet, CORS, rate-limit, HPP, XSS-clean, mongo-sanitize | |
| Testing | Jest | |
| API Format | REST, JSON responses | Configurator endpoint returns HTML |
| Platform Name | CURIA | |

### Price Calculation Formula

```
Grundpreis (from width×height matrix)
  × ProfileMultiplier
  + Surcharges (color, glass, handle, security, etc.)
  = Preisempfehlung (recommended price)

Ersparnis = Preisempfehlung × 0.40
Angebotspreis = Preisempfehlung × 0.60
```

### 6-Tier Role Hierarchy

1. **CREATOR** – Platform master (invisible to others)
2. **CREATOR_STAFF** – Platform admins
3. **CEO** – Business owner/client
4. **OPERATIONS_MANAGER** – Senior staff
5. **WAREHOUSE_STAFF** – Inventory/shipping
6. **SALES_STAFF** – Quotes/customers

---

## References

- **Planning docs**: `Previous-Session-files` branch (33 files)
- **Backend code**: `Backend` branch (app.js, config/, middleware/, routes/, utils/)
- **Frontend design**: `frontend-glass-configurator` repo
- **Lessons learned**: `LESSONS_LEARNED.md` on `Previous-Session-files` branch
