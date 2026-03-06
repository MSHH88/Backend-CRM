# CURIA Backend-CRM

## Project Overview

**CURIA** is a white-label SaaS e-commerce platform for window, door, and roller shutter configurators. It follows a three-tier architecture:

```
┌─────────────────────────────────────────────────────┐
│  FRONTEND — Customer-facing configurator            │
│  Real-time pricing, product configuration, checkout │
└──────────────────────┬──────────────────────────────┘
                       │ REST API
┌──────────────────────▼──────────────────────────────┐
│  BACKEND (The Engine) — This Repository             │
│  Pricing engine, catalog system, order management   │
└──────────────────────┬──────────────────────────────┘
                       │ REST API
┌──────────────────────▼──────────────────────────────┐
│  CRM (The Office) — Admin dashboard                 │
│  Catalog management, pricing controls, analytics    │
└─────────────────────────────────────────────────────┘
```

**Tech Stack:** Node.js + Express + PostgreSQL  
**Pricing Formula:** `Verkaufspreis = (Katalogpreis + Aufschläge) × Margin × (1 - Rabatt)`  
**Role System:** 6-tier (CREATOR → CREATOR_STAFF → CEO → OPS_MANAGER → WAREHOUSE → SALES)

---

## Repository Branch Structure

| Branch | Purpose | Contents |
|--------|---------|----------|
| `main` | Primary development branch | This README (project plan & status) |
| `Backend` | Phase 1 CURIA platform code (from previous agent) | Node.js/Express app, middleware, routes, logger |
| `Previous-Session-files` | All planning docs (33 files) | Architecture docs, feature specs, gap analysis, data collection guides |

### Related Pull Requests

| PR | Branch | Status | What It Contains |
|----|--------|--------|------------------|
| #1 | `copilot/update-backend-data-quality` | Closed (not merged) | Complete pricing engine + manufacturer data (30 files) |
| #2 | `copilot/analyze-previous-sessions` | Open | README analysis of project state |
| #3 | `copilot/analyze-project-phase-1` | Open | This comprehensive analysis |

### Related Repositories

| Repo | Purpose | Status |
|------|---------|--------|
| **Backend-CRM** (this repo) | Backend server, CRM, pricing engine, API | 🔨 In Progress |
| **frontend-glass-configurator** | Frontend: homepage, configurator UI, glassmorphism design system | Phase 1 design done |

---

## What Was Completed (Phase 1 — Planning & Foundation)

### Data Collection (COMPLETE ✅)
- [x] Drutex Kunststoff base price matrix (140+ datapoints, 10cm steps)
- [x] Profile multipliers for 6 profiles (Iglo 5 Classic, Iglo 5, Iglo Energy Classic, Iglo Energy, Iglo Light, Iglo EXT)
- [x] 200+ surcharge values (colors, glass, handles, hardware, security)
- [x] 80+ color options documented
- [x] All glass types with U-values
- [x] 7 handle types
- [x] 6 API endpoints fully specified (request/response)
- [x] PostMessage protocol for iframe communication
- [x] 36 product comparison results
- [x] Profile multipliers for Gealan, Aluplast, Salamander, Veka, Schüco

### Unified Codebase (Step A — COMPLETE ✅)
Lives on this branch (`copilot/analyze-project-phase-1`):
- [x] Step 1.1: Project initialized (folder structure, package.json)
- [x] Step 1.2: Dependencies installed (16 production + 4 dev)
- [x] Step 1.3: Server entry point (src/server.js + src/app.js with security, middleware, graceful shutdown)
- [x] Step 1.4: Environment configuration (src/config/index.js, .env.example)
- [x] Step 1.5: Database connection setup (src/config/database.js — PostgreSQL pool)
- [x] Step 1.6: Error handling middleware (src/middleware/errorHandler.js — 20+ error classes)
- [x] Step 1.7: Logging setup (src/utils/logger.js — Winston-based)
- [x] Step 1.8: Security middleware (applySecurity wired into app.js — helmet, CORS, XSS, HPP, rate limiting, mongo-sanitize) ✅
- [x] Step 1.9: Route structure (pricing routes + auth routes + error handlers from middleware) ✅
- [x] Step 1.10: Authentication setup (JWT register/login/logout/refresh/me, bcrypt, role assignment) ✅
- [x] Pricing engine integrated (src/engine/, src/data/, src/routes/)
- [x] All 57 tests passing (priceCalculator.test.js + api.test.js + auth.test.js)

### Frontend Design Assets (in `frontend-glass-configurator` repo)
- Homepage V1 design with glassmorphism effect (complete HTML prototype)
- Redesign CSS (16KB) with glassmorphism containers, responsive breakpoints
- Implementation guide for WordPress/Elementor integration
- Quick reference (color palette, typography, spacing, CSS classes)
- Glassmorphism icon system (CSS + HTML + JS)
- Logo and branding assets (FenTuRo logo, style guide PDF)
- Design system: Inter font, glass colors (#E7F2E6, #E1F4F2), 6-level spacing scale

### Planning Documentation (COMPLETE ✅)
Lives on the `Previous-Session-files` branch (33 documents):
- Architecture, pricing formulas, database schema proposals
- CRM role system (6-tier with permission matrix)
- Feature decisions (97+ features across 11 categories)
- Gap analysis, security architecture, lessons learned
- Frontend design system (colors, typography, header specs)

### Unified File Structure

```
src/
├── app.js                          # Express app (security + pricing routes)
├── server.js                       # Entry point (port binding, graceful shutdown)
├── config/
│   ├── index.js                    # Centralized config from env vars
│   ├── database.js                 # PostgreSQL connection pool + CRUD helpers
│   └── migrations.js               # Database migration SQL
├── data/
│   ├── basePrices.js               # 21×21 price matrix (geometric-mean interpolation)
│   ├── profileMultipliers.js       # 6 Iglo profiles with multipliers
│   └── surcharges.js               # All surcharge tables (9 categories)
├── db/
│   └── schema.sql                  # PostgreSQL schema (tables, indexes, triggers)
├── engine/
│   ├── priceCalculator.js          # 6-step price calculation engine
│   └── surchargeCalculator.js      # Surcharge resolution across 9 categories
├── middleware/
│   ├── auth.js                     # JWT authentication (ready for integration)
│   ├── errorHandler.js             # 20+ error classes, DB error handling
│   └── security.js                 # XSS, HPP, rate limiting (ready for integration)
├── routes/
│   ├── auth.js                     # POST register/login/logout/refresh, GET me
│   ├── berechnen.js                # POST /ajax/berechnen/ → HTML response
│   ├── warenkorb.js                # POST /ajax/addWarenkorb/ → JSON response
│   └── options.js                  # GET /ajax/getOptions/ → JSON catalog
└── utils/
    ├── logger.js                   # Winston-based logging system
    └── responseFormatter.js        # HTML and JSON formatters with XSS escaping
tests/
├── priceCalculator.test.js         # Unit tests: base prices, multipliers, surcharges, full calc
├── api.test.js                     # Integration tests: all endpoints + error cases
└── auth.test.js                    # Auth tests: register, login, logout, refresh, me (16 tests)
```

---

## Master Phase Plan

### Phase 1: Backend Foundation — Weeks 1–4
**Goal:** Core infrastructure — server, database, auth, basic API

| Step | Description | Status |
|------|-------------|--------|
| 1.1–1.7 | Project setup, server, config, DB, error handling, logging | ✅ Done |
| 1.8 | Security middleware (integrate into app.js) | ✅ Done |
| 1.9 | Basic route structure (auth routes, pricing routes, error handlers) | ✅ Done |
| 1.10 | Authentication system (JWT, login/register/logout/refresh/me) | ✅ Done |
| Week 2 | Database schema & migrations (users, roles, products, orders) | ⬜ TODO |
| Week 3 | Auth system (password hashing, JWT tokens, role-based middleware) | ✅ Done (in-memory, needs DB) |
| Week 4 | Core API routes (users, products CRUD), input validation, rate limiting | ⬜ TODO |

### Phase 2: Pricing Engine & Configurator — Weeks 5–8
**Goal:** Working price calculator matching live site ±€0.02

> **Note:** PR #1 already built a working Drutex pricing engine with tests. Phase 2 work should integrate that code and extend it to other manufacturers.

| Step | Description | Status |
|------|-------------|--------|
| Import base price matrix | CSV → Database | ✅ Done in PR #1 (in-memory), DB schema ready |
| Profile multipliers | Apply per-profile pricing | ✅ Done in PR #1 (6 Iglo profiles) |
| Surcharge calculator | Colors, glass, handles, hardware | ✅ Done in PR #1 (9 categories, ~60 options) |
| POST /berechnen | Price calculation endpoint (HTML response) | ✅ Done in PR #1 (tested) |
| POST /addWarenkorb | Cart item endpoint (JSON response) | ✅ Done in PR #1 (tested) |
| GET /getOptions | Options catalog endpoint (JSON response) | ✅ Done in PR #1 (tested) |
| Gealan PVC data | Import extracted price data | 🔶 Data extracted, needs integration |
| Holz data | Import extracted price data | 🔶 Data extracted, needs integration |
| Alu Balkontür data | Import extracted price data | 🔶 Data extracted, needs integration |
| Margin system | Global, category, product-level margins | ⬜ TODO |
| Discount engine | Volume, coupon, time-limited (default 0%) | ⬜ TODO |
| Configuration API | Validate options, save/load configs | ⬜ TODO |
| Sharing URLs | Encode config in URL hash | ⬜ TODO |

### Phase 3: Order System & Frontend — Weeks 9–14
**Goal:** Cart, checkout, quote requests + connect redesigned frontend

| Step | Description | Status |
|------|-------------|--------|
| Cart system | Add/remove, localStorage + DB storage | ⬜ TODO |
| Quote requests | Private + Business customer forms | ⬜ TODO |
| Order creation | Checkout, order number generation | ⬜ TODO |
| Invoice/PDF generation | Text-based with logo | ⬜ TODO |
| Payment integration | PayPal, Stripe, invoice, direct debit | ⬜ TODO |
| Frontend design | Apply V1 design system, connect to backend API | ⬜ TODO |

### Phase 4: CRM & Launch — Weeks 15–24
**Goal:** Admin dashboard, catalog management, go-live

| Step | Description | Status |
|------|-------------|--------|
| CRM dashboard | CREATOR + CEO dashboards | ⬜ TODO |
| Catalog management | Import/export, bulk updates, versioning | ⬜ TODO |
| Pricing controls | Margin UI, discount management | ⬜ TODO |
| Order management | List, detail, status updates | ⬜ TODO |
| Lead Generator | CREATOR-only analytics section | ⬜ TODO |
| Analytics | Sales, profit, product performance reports | ⬜ TODO |
| Multi-language | German (primary) + English | ⬜ TODO |
| Testing & launch | Security audit, GDPR, legal docs, go-live | ⬜ TODO |

---

## Identified Gaps & Open Questions

### Technical Gaps
1. ~~**Backend branch has `node_modules` committed**~~ ✅ Fixed — proper .gitignore in unified codebase
2. ~~**Routes file is 90KB**~~ ✅ Fixed — clean route files from PR #1 (berechnen, warenkorb, options)
3. ~~**Security middleware exists but not wired into app.js**~~ ✅ Fixed — `applySecurity()` integrated (Step 1.8)
4. ~~**Auth middleware exists but not wired into app.js**~~ ✅ Fixed — Auth routes created with JWT (Step 1.10)
5. **Database migrations exist but not tested against live PostgreSQL** — Next: Phase 1 Week 2
6. ~~**No test files exist yet**~~ ✅ Fixed — 57 tests passing (Jest + Supertest)
7. **Auth uses in-memory user store** — Placeholder until PostgreSQL schema is set up

### Data Gaps (Non-Blocking for Development)
1. **KATALOG** — CEO's actual product catalog with Einkaufspreise (purchase prices) — needed before launch
2. **PSK doors** — Base price matrix incomplete
3. **Rollläden** — Different API pattern, needs separate module
4. **Base prices for non-Drutex manufacturers** — or calculate from Drutex + multipliers

### Business Decisions Still Needed (Before Launch)
1. Company details for invoices (name, address, VAT ID, bank details)
2. Shipping calculation method (flat rate, weight-based, free above threshold?)
3. Legal documents (AGB, Datenschutz, Widerrufsbelehrung, Impressum)
4. Support contact details
5. Email service provider (SendGrid, Amazon SES, Mailgun)
6. Google Analytics 4 — confirmed YES, needs CURIA Google account
7. Return/cancellation policy for made-to-order items

### Source Code Access
- The original SUBPAGES-FenTuRo repo (which contained the frontend subpage work and agent chat history) is currently inaccessible. All analysis for this project plan was done from the Backend-CRM branches which contain the planning docs and backend code.

---

## How to Continue Development

### Recommended Next Steps (In Order)

**Step A: Consolidate Code on Main Branch** ✅ DONE
1. ✅ Added proper `.gitignore` (node_modules/, .env, dist/, *.log, logs/, coverage/)
2. ✅ Cleaned up — new branch does not include node_modules or logs
3. ✅ Merged CURIA platform foundation (config/, middleware/, utils/) from `Backend` branch
4. ✅ Ported pricing engine from PR #1 (engine/, data/, pricing routes, response formatter, tests)
5. ✅ Reconciled app.js — Backend branch security middleware + PR #1 pricing routes
6. ✅ All 57 tests pass, server starts cleanly, 0 npm vulnerabilities

**Step B: Wire Up Existing Middleware (Steps 1.8–1.10)** ✅ DONE
1. ✅ Integrated `security.js` into the Express app middleware chain via `applySecurity()`
2. ✅ Integrated `errorHandler.js` (`notFoundHandler` + `errorHandler`) into app.js
3. ✅ Wired `auth.js` middleware into protected routes (authenticate for /me, /logout)
4. ✅ Created auth routes (register, login, logout, refresh, me) with 16 passing tests

**Step C: Database Schema (Week 2)** ← NEXT
1. Set up PostgreSQL (or use SQLite for dev)
2. Run the migration SQL from `src/config/migrations.js`
3. Seed the price data (base prices, multipliers, surcharges) from data files
4. Create User and Role models
5. Connect auth routes to database (replace in-memory user store)

**Step D: Core API Routes (Week 4)**
1. Users CRUD API with role-based access
2. Products CRUD API
3. Input validation with express-validator
4. API rate limiting per route type

### ✅ Codebases Reconciled

The `Backend` branch and PR #1 have been merged into a unified codebase on this branch:

| Source | What Was Taken |
|--------|---------------|
| **Backend Branch** | Security middleware, config system, database module, error handler (20+ error classes), Winston logger, auth middleware |
| **PR #1** | Pricing engine, surcharge calculator, base price matrix, profile multipliers, surcharge data, route handlers, response formatter, tests |
| **Unified** | New app.js combining Backend security with PR #1 routes, new server.js with graceful shutdown, unified package.json |

### Development Approach
- **Step by step** — one task at a time, test before moving on
- **Quality over speed** — never do too much at once
- **This README is the plan** — update checklist items as work progresses
- **Each step gets its own commit** — small, incremental, verifiable changes

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
| Testing | Jest + Supertest | |
| API Format | REST, JSON responses | Configurator endpoint returns HTML |
| Platform Name | CURIA (white-label SaaS) | FenTuRo is first client |

### 6-Tier Role Hierarchy

1. **CREATOR** — Platform master (invisible to clients)
2. **CREATOR_STAFF** — Platform admins
3. **CEO** — Business owner/client
4. **OPERATIONS_MANAGER** — Senior staff
5. **WAREHOUSE_STAFF** — Inventory/shipping
6. **SALES_STAFF** — Quotes/customers

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (nodemon) |
| `npm start` | Start production server |
| `npm test` | Run tests (Jest) |

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server health check |
| `/api/v1` | GET | API version info |
| `/api/v1/auth/register` | POST | Register new user |
| `/api/v1/auth/login` | POST | Login and get tokens |
| `/api/v1/auth/logout` | POST | Logout (revoke token) |
| `/api/v1/auth/refresh` | POST | Refresh token pair |
| `/api/v1/auth/me` | GET | Get current user info |
| `/ajax/berechnen/` | POST | Price calculation (returns HTML) |
| `/ajax/addWarenkorb/` | POST | Add to cart (returns JSON) |
| `/ajax/getOptions/` | GET | Get configurator options (returns JSON) |

| Price Formula | |
|---------------|---|
| Grundpreis | From 21×21 base price matrix (width × height) |
| × ProfileMultiplier | Per-profile adjustment (0.95–1.29×) |
| + Surcharges | Colors, glass, handles, hardware, security |
| = Preisempfehlung | Recommended retail price |
| × Margin | Admin-configurable markup (e.g., 1.70 for 70%) |
| × (1 - Rabatt) | Admin-configurable discount (default 0%) |
| = Verkaufspreis | Final selling price |

> **Note:** The current Drutex reference data uses a fixed 40% discount (Angebotspreis = Preisempfehlung × 0.60), but the production system will use admin-configurable margins and discounts as shown above.
