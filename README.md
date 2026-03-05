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
| `Backend` | Phase 1 backend code (from previous agent) | Node.js/Express app, middleware, routes, logger |
| `Previous-Session-files` | All planning docs (30+ files) | Architecture docs, feature specs, gap analysis, data collection guides |

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

### Planning Documentation (COMPLETE ✅)
Lives on the `Previous-Session-files` branch (30+ documents):
- Architecture, pricing formulas, database schema proposals
- CRM role system (6-tier with permission matrix)
- Feature decisions (97+ features across 11 categories)
- Gap analysis, security architecture, lessons learned
- Frontend design system (colors, typography, header specs)

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

| Step | Description | Status |
|------|-------------|--------|
| Import base price matrix | CSV → Database | ⬜ TODO |
| Profile multipliers | Apply per-profile pricing | ⬜ TODO |
| Surcharge calculator | Colors, glass, handles, hardware | ⬜ TODO |
| Margin system | Global, category, product-level margins | ⬜ TODO |
| Discount engine | Volume, coupon, time-limited (default 0%) | ⬜ TODO |
| POST /berechnen | Price calculation endpoint (HTML response) | ⬜ TODO |
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

### Immediate Next Step: Merge Backend Code to Main
Before new development begins, the existing Backend branch code should be reviewed, cleaned up (remove node_modules, add proper .gitignore), and merged to main as the starting point.

### Development Approach
- **Step by step** — one task at a time, test before moving on
- **Quality over speed** — never do too much at once
- **This README is the plan** — update checklist items as work progresses
- **Each step gets its own commit** — small, incremental, verifiable changes

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
