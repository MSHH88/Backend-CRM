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

### Backend Code (PARTIAL — Steps 1.1–1.7 of Phase 1 Foundation)
Lives on the `Backend` branch:
- [x] Step 1.1: Project initialized (folder structure, package.json)
- [x] Step 1.2: Dependencies installed (express, pg, bcryptjs, jwt, helmet, cors, winston, etc.)
- [x] Step 1.3: Server entry point (app.js with Express, middleware, health check, graceful shutdown)
- [x] Step 1.4: Environment configuration (config/index.js, .env support)
- [x] Step 1.5: Database connection setup (config/database.js — PostgreSQL pool)
- [x] Step 1.6: Error handling middleware (middleware/errorHandler.js)
- [x] Step 1.7: Logging setup (utils/logger.js — 54+ exports, Winston-based)
- [ ] Step 1.8: Security middleware (middleware/security.js exists but not integrated)
- [ ] Step 1.9: Basic route structure (routes/index.js exists — 90KB, needs review)
- [ ] Step 1.10: Authentication setup (middleware/auth.js exists but not integrated)

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

### Pricing Engine Prototype (PR #1 — Closed, Not Merged)
A separate pricing engine was built in PR #1 (30 files, fully tested). This code is available in the PR diff and can be cherry-picked. Key assets:

**Source Code (`src/`):**
| File | Purpose |
|------|---------|
| `src/app.js` | Express app (CORS, body-parser, routes) |
| `src/server.js` | Server entry point (dotenv, port binding) |
| `src/engine/priceCalculator.js` | 6-step price calculation engine |
| `src/engine/surchargeCalculator.js` | Surcharge resolution across 9 categories |
| `src/data/basePrices.js` | 21×21 price matrix (400–2400mm, geometric-mean interpolation) |
| `src/data/profileMultipliers.js` | 6 Iglo profiles with multipliers |
| `src/data/surcharges.js` | All surcharge tables (colors, glass, sound, security, handles, sprossen, V-Perfect) |
| `src/routes/berechnen.js` | POST /ajax/berechnen/ → HTML response |
| `src/routes/warenkorb.js` | POST /ajax/addWarenkorb/ → JSON response |
| `src/routes/options.js` | GET /ajax/getOptions/ → JSON catalog |
| `src/routes/index.js` | Route wiring + GET /health |
| `src/utils/responseFormatter.js` | HTML and JSON formatters with XSS escaping |
| `src/db/schema.sql` | PostgreSQL schema (base_prices, multipliers, surcharges, cart_items) |
| `src/db/connection.js` | PostgreSQL pool connection |

**Tests (passing):**
| File | Coverage |
|------|----------|
| `tests/priceCalculator.test.js` | Base price lookup, profile multipliers, surcharges, full calculation (1000×1000 p1 = €295.44) |
| `tests/api.test.js` | All 4 endpoints (berechnen, warenkorb, getOptions, health), error cases |

**Manufacturer Price Data:**
| Directory | Manufacturer | Contents |
|-----------|-------------|----------|
| `Gealen-Kunstoff-PM/` | Gealan PVC | Price matrix CSV, surcharges CSV, complete JSON, extraction scripts, test API |
| `Holz-Fenster-PM/` | Holz (Wood) | Price matrix CSV, surcharges CSV/JSON, complete JSON, extraction summary |
| `Balkon-Alu-PM/` | Aluminium Balkontür | Price matrix CSV, surcharges CSV, complete JSON |

> **Important:** PR #1 was closed without merging. The code needs to be extracted from the PR diff and integrated into the main codebase. The pricing engine represents the bulk of Phase 2 work already done.

---

## Master Phase Plan

### Phase 1: Backend Foundation — Weeks 1–4
**Goal:** Core infrastructure — server, database, auth, basic API

| Step | Description | Status |
|------|-------------|--------|
| 1.1–1.7 | Project setup, server, config, DB, error handling, logging | ✅ Done |
| 1.8 | Security middleware (integrate into app.js) | ⬜ TODO |
| 1.9 | Basic route structure (review/clean 90KB routes file) | ⬜ TODO |
| 1.10 | Authentication system (JWT, login/register/logout) | ⬜ TODO |
| Week 2 | Database schema & migrations (users, roles, products, orders) | ⬜ TODO |
| Week 3 | Auth system (password hashing, JWT tokens, role-based middleware) | ⬜ TODO |
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
1. **Backend branch has `node_modules` committed** — needs .gitignore cleanup
2. **Routes file is 90KB** — likely auto-generated, needs review/refactoring
3. **Security middleware exists but not wired into app.js**
4. **Auth middleware exists but not wired into app.js**
5. **Database migrations exist but not tested against live PostgreSQL**
6. **No test files exist yet** — Jest is configured but no tests written

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

**Step A: Consolidate Code on Main Branch**
1. Add proper `.gitignore` (node_modules/, .env, dist/, *.log, logs/)
2. Clean up Backend branch code (remove committed node_modules)
3. Merge the CURIA platform foundation (app.js, config, middleware, utils) from `Backend` branch
4. Cherry-pick the pricing engine code from PR #1 diff into the merged codebase
5. Reconcile the two app.js files (Backend branch has the CURIA platform with security/auth; PR #1 has the simpler pricing engine)

**Step B: Wire Up Existing Middleware (Steps 1.8–1.10)**
1. Integrate `security.js` into the Express app middleware chain
2. Split the 90KB `routes/index.js` into separate route files (auth, users, products, configurator)
3. Wire `auth.js` middleware into protected routes
4. Create auth routes (login, register, logout, refresh, me)

**Step C: Database Schema (Week 2)**
1. Set up PostgreSQL (or use SQLite for dev)
2. Run the migration SQL from `Backend/src/config/migrations.js`
3. Seed the price data (base prices, multipliers, surcharges) from PR #1's data files
4. Create User and Role models

**Step D: Tests**
1. Port the passing tests from PR #1 (priceCalculator.test.js, api.test.js)
2. Add tests for auth middleware and security middleware
3. Add integration tests for database operations

### Two Codebases to Reconcile

The `Backend` branch and PR #1 each built different parts of the system:

| Aspect | Backend Branch (CURIA Platform) | PR #1 (Pricing Engine) |
|--------|-------------------------------|----------------------|
| **package.json** | `curia-backend` — 16 deps (helmet, jwt, winston, etc.) | `fentuaro-konfigurator-engine` — 5 deps (express, pg, cors, etc.) |
| **app.js** | Full security middleware, Winston logging, graceful shutdown | Minimal Express + CORS + body-parser |
| **Middleware** | auth.js (JWT), security.js (XSS, HPP), errorHandler.js | None (inline error handling) |
| **Routes** | Single 90KB index.js (all routes in one file) | 4 clean route files (berechnen, warenkorb, options, health) |
| **Pricing** | Not implemented | Complete (6-step formula, surcharges, tests) |
| **Database** | Connection pool + migration SQL | Schema SQL + connection (simpler) |
| **Tests** | None | 2 test files (329 lines, all passing) |
| **Logging** | Winston (40KB, comprehensive) | console.log only |

**Recommended merge strategy:** Use the Backend branch as the foundation (it has proper security, auth, logging) and port the pricing engine from PR #1 into it as a module.

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
