# Phase 2 — Step-by-Step Guide

> **Status:** Step 1.4 in progress — verifying auth persistence with PostgreSQL  
> **Last updated:** 2026-03-09  
> **Prerequisite:** Phase 1 ✅ (100 tests passing, all endpoints working)

---

## Phase 1 Completion Checklist

Before starting Phase 2 work, confirm every Phase 1 item is green:

| # | Item | Status |
|---|------|--------|
| 1 | Express server starts on port 3001 | ✅ |
| 2 | Health check (`GET /health`) returns 200 | ✅ |
| 3 | API docs (`GET /api/v1`) returns endpoint list | ✅ |
| 4 | Security middleware (helmet, CORS, rate-limit, XSS) | ✅ |
| 5 | Authentication (register/login/logout/refresh/me) | ✅ |
| 6 | Pricing engine — Drutex Kunststoff (21×21 matrix) | ✅ |
| 7 | Profile multipliers — 6 Iglo profiles | ✅ |
| 8 | Surcharge calculator — 9 categories, ~60 options | ✅ |
| 9 | Standardized routes (`/api/v1/pricing/calculate`, `/options`) | ✅ |
| 10 | Legacy route aliases (`/ajax/berechnen`, `/api/v1/berechnen`) | ✅ |
| 11 | Cart endpoint (`/api/v1/pricing/cart`) | ✅ |
| 12 | Swagger API docs (`/api-docs`) | ✅ |
| 13 | Jest test suite — 3 suites, 100 tests, 0 failures | ✅ |
| 14 | ESLint + Prettier — 0 errors, 0 warnings | ✅ |
| 15 | Database schema defined (migrations.js — 23 tables) | ✅ |
| 16 | Database connection pool (config/database.js) | ✅ |

### Extracted Datasets Available

| Dataset | Location | Profiles | Data Points |
|---------|----------|----------|-------------|
| Drutex Kunststoff | `datasets/drutex-kunststoff-fenster/` | 6 (Iglo) | 441 |
| Gealan PVC | `Gealen-Kunstoff-PM/` | 3 (S8000, S9000, LINEAR) | 675 |
| Holz Fenster | `Holz-Fenster-PM/` | 6 (Softline 68/78/88 × Kiefer/Meranti) | 378 |
| Alu Balkontür | `Balkon-Alu-PM/` | TBD | TBD |

**All data has been extracted. No external data collection needed.**

---

## Phase 2 Overview

Phase 2 has **8 steps**, organized in dependency order. Each step builds on the previous one. Do not skip ahead.

```
Step 1 — Database deployment & auth migration
Step 2 — Analyze Gealan dataset → integrate into pricing engine
Step 3 — Analyze Holz dataset → integrate into pricing engine
Step 4 — Analyze Alu dataset → integrate into pricing engine
Step 5 — Margin system (global / category / product)
Step 6 — Discount engine (volume, coupon, time-limited)
Step 7 — Configuration save / load / share
Step 8 — Full integration test & cleanup
```

---

## Step 1 — Database Deployment & Auth Migration ✅ NEARLY COMPLETE

**Goal:** Move from in-memory storage to PostgreSQL. Repository Pattern implemented — code auto-detects PostgreSQL and falls back to in-memory for tests.

**Status:** All code, database setup, and connection verified. Only auth persistence verification (1.4) remains.

### 1.1 Code Changes ✅ COMPLETE

- [x] Create `src/config/dbInit.js` — database initialization with graceful fallback
- [x] Create `src/repositories/userRepository.js` — user CRUD (in-memory + PostgreSQL dual-mode)
- [x] Create `src/repositories/sessionRepository.js` — token blacklist, refresh tokens, session limits
- [x] Update `src/server.js` — calls `initializeDatabase()` on startup, closes pool on shutdown
- [x] Update `src/routes/auth.js` — uses `userRepository` instead of in-memory array
- [x] Update `src/middleware/auth.js` — uses `sessionRepository` for token/session management
- [x] Create `tests/repositories.test.js` — 24 tests for both repositories
- [x] All 124 tests pass (was 100 in Phase 1)
- [x] ESLint + Prettier — 0 errors, 0 warnings

### 1.2 PostgreSQL Setup ✅ COMPLETE

- [x] Install PostgreSQL locally (official installer with PGAdmin)
- [x] Database `curia` created and running (visible + green in PGAdmin)
- [x] `.env` file created with real credentials
- [x] Pre-flight check passes (`npm run check`)

### 1.3 Verify Database Connection ✅ COMPLETE

- [x] Server starts with `npm start` — "Database connected"
- [x] Migrations auto-run on startup — 23 tables created automatically
- [x] Seed data loaded — 8 roles, 4 categories, 4 manufacturers
- [x] `GET /health` shows `"database": "connected"`

### 1.4 Verify Auth with Database ⬜ REMAINING

- [ ] Register → user persists in DB (survives server restart)
- [ ] Login → session tracked in DB
- [ ] Logout → token blacklisted in DB
- [ ] Refresh → new tokens issued, old invalidated

> **This is the only remaining item in Step 1.** It requires running curl commands to test auth endpoints while the server is running.

### 1.5 Done Criteria

- [x] Repository Pattern implemented (dual-mode: in-memory + PostgreSQL)
- [x] `npm test` — 124 tests pass
- [x] `npm run lint` — 0 errors
- [x] PostgreSQL deployed locally and verified
- [ ] Auth persistence verified (see 1.4 above)

> **See `docs/STEP_BY_STEP_GUIDE.md`** for daily-use commands and quick fixes.

---

## Step 2 — Gealan PVC Integration

**Goal:** Add Gealan PVC as the second supported manufacturer. This establishes the multi-manufacturer pattern that Step 3 and 4 will follow.

### 2.1 Analyze Gealan Dataset

- [ ] Read `Gealen-Kunstoff-PM/gealan_pvc_complete_data.json`
- [ ] Read `Gealen-Kunstoff-PM/gealan_pvc_alle_profile_preismatrix.csv`
- [ ] Read `Gealen-Kunstoff-PM/gealan_pvc_aufpreise.csv`
- [ ] Document: profiles available (S8000, S9000, LINEAR)
- [ ] Document: dimension range (400–2000mm, 15 steps)
- [ ] Document: all surcharge categories and option IDs
- [ ] Compare surcharge categories with Drutex — note differences

### 2.2 Extend basePrices.js

- [ ] Add Gealan base price matrix (15×15 per profile)
- [ ] Add manufacturer ID `gealan` (alongside existing `h1` for Drutex)
- [ ] Update `getBasePrice()` to route by `manufacturerId`
- [ ] Handle dimension ranges that differ from Drutex (Gealan max 2000mm vs Drutex 2400mm)
- [ ] Return clear error for unsupported dimensions

### 2.3 Extend profileMultipliers.js

- [ ] Add Gealan profiles: S8000, S9000, LINEAR
- [ ] Calculate multipliers relative to cheapest profile (same pattern as Drutex)
- [ ] Organize by manufacturer: `{ drutex: {...}, gealan: {...} }`
- [ ] Update `getProfileMultiplier()` to accept `manufacturerId`

### 2.4 Extend surcharges.js

- [ ] Add Gealan surcharge options (colors, glass, handles, etc.)
- [ ] Use Gealan-specific option IDs (may differ from Drutex prefixes)
- [ ] Update surchargeCalculator.js to select surcharge table by manufacturer
- [ ] Handle Gealan-specific categories that Drutex doesn't have (or vice versa)

### 2.5 Update priceCalculator.js

- [ ] Pass `manufacturerId` through the full 10-step formula
- [ ] Ensure Gealan calculations use Gealan data (not Drutex)
- [ ] Ensure Drutex calculations are unchanged (backward compatibility)

### 2.6 Update API Endpoints

- [ ] `POST /api/v1/pricing/calculate` — accept `manufacturer` field in request body
- [ ] `GET /api/v1/pricing/options` — accept `?manufacturer=gealan` query param
- [ ] Default to `drutex` if no manufacturer specified (backward compatibility)
- [ ] Return available manufacturers in `GET /api/v1` endpoint list

### 2.7 Tests

- [ ] Add Gealan-specific priceCalculator tests (base price lookups, profile multipliers)
- [ ] Add Gealan surcharge tests
- [ ] Add API tests for `?manufacturer=gealan`
- [ ] Verify Drutex tests still pass unchanged
- [ ] Test edge cases: invalid manufacturer, Gealan dimensions beyond 2000mm

### 2.8 Done Criteria

- [ ] `POST /api/v1/pricing/calculate` with `manufacturer: "gealan"` returns correct prices
- [ ] `GET /api/v1/pricing/options?manufacturer=gealan` returns Gealan options
- [ ] All Drutex tests still pass
- [ ] All new Gealan tests pass
- [ ] `npm test` — all tests pass
- [ ] `npm run lint` — 0 errors

---

## Step 3 — Holz Fenster Integration

**Goal:** Add Holz (wood) windows as the third manufacturer. Follow the same pattern established in Step 2.

### 3.1 Analyze Holz Dataset

- [ ] Read `Holz-Fenster-PM/holz_complete_data.json`
- [ ] Read `Holz-Fenster-PM/holz_alle_profile_preismatrix.csv`
- [ ] Read `Holz-Fenster-PM/holz_aufpreise.csv` and `holz_aufpreise.json`
- [ ] Document: 6 profiles (Softline 68/78/88 in Kiefer and Meranti)
- [ ] Document: dimension range (330–1500mm width, 350–2400mm height)
- [ ] Document: surcharge categories — note wood-specific options (stain colors, wood types)
- [ ] Compare surcharge categories with Drutex and Gealan

### 3.2 Extend Data Modules

- [ ] Add Holz base price matrix to basePrices.js (7×9 per profile × 6 profiles)
- [ ] Add manufacturer ID `holz`
- [ ] Add Holz profiles to profileMultipliers.js
- [ ] Add Holz surcharges to surcharges.js
- [ ] Handle wood-specific options (Kiefer vs Meranti is a profile choice, not a surcharge)

### 3.3 Update Engine & API

- [ ] priceCalculator.js — Holz routing works
- [ ] surchargeCalculator.js — Holz surcharges work
- [ ] API endpoints accept `manufacturer: "holz"`
- [ ] Options endpoint returns Holz-specific options

### 3.4 Tests

- [ ] Add Holz-specific priceCalculator tests
- [ ] Add Holz surcharge tests
- [ ] Add API tests for `?manufacturer=holz`
- [ ] Verify Drutex and Gealan tests still pass
- [ ] Test edge cases: Holz has different dimension ranges than PVC

### 3.5 Done Criteria

- [ ] 3 manufacturers working: Drutex, Gealan, Holz
- [ ] All tests pass
- [ ] Lint clean

---

## Step 4 — Alu Balkontür Integration

**Goal:** Add Aluminum balcony doors as the fourth product type. This may require special handling since it is a door, not a window.

### 4.1 Analyze Alu Dataset

- [ ] Read `Balkon-Alu-PM/alu_balkontuer_complete_data.json`
- [ ] Read `Balkon-Alu-PM/alu_balkontuer_alle_profile_preismatrix.csv`
- [ ] Read `Balkon-Alu-PM/alu_balkontuer_aufpreise.csv`
- [ ] Document: profiles, dimension ranges, surcharge categories
- [ ] Determine: is this a separate product category (door) or a manufacturer variant?
- [ ] Decide: does it share the same pricing formula or need adjustments?

### 4.2 Extend Data Modules

- [ ] Add Alu base prices to basePrices.js
- [ ] Add Alu profiles to profileMultipliers.js
- [ ] Add Alu surcharges to surcharges.js
- [ ] Add manufacturer ID `alu` (or `alu-balkontuer`)

### 4.3 Update Engine & API

- [ ] priceCalculator.js — Alu routing works
- [ ] surchargeCalculator.js — Alu surcharges work
- [ ] API endpoints accept Alu manufacturer
- [ ] Options endpoint returns Alu-specific options

### 4.4 Tests

- [ ] Add Alu-specific tests
- [ ] Verify all other manufacturer tests still pass

### 4.5 Done Criteria

- [ ] 4 product types working: Drutex PVC, Gealan PVC, Holz, Alu
- [ ] All tests pass
- [ ] Lint clean

---

## Step 5 — Margin System

**Goal:** Implement configurable margins at three levels: global, category, and product.

### 5.1 Margin Architecture

The margin hierarchy (highest priority wins):

```
1. Product-level margin    → overrides everything
2. Category-level margin   → overrides global
3. Global default margin   → fallback (e.g., 70%)
```

Formula:
```
sellingPrice = costPrice × (1 + marginPercentage / 100)
```

### 5.2 Database Tables

- [ ] Verify `products` table has `margin_percentage` column (from migrations.js)
- [ ] Create or verify a `margin_settings` table (or use existing columns):
  - Global margin: a row in a `settings` table or config
  - Category margin: `categories.margin_percentage` column
  - Product margin: `products.margin_percentage` column

### 5.3 API Endpoints

- [ ] `GET /api/v1/margins` — get current margin settings (admin only)
- [ ] `PUT /api/v1/margins/global` — update global margin (admin only)
- [ ] `PUT /api/v1/margins/category/:id` — update category margin (admin only)
- [ ] `PUT /api/v1/margins/product/:id` — update product margin (admin only)
- [ ] All margin endpoints require authentication + admin role

### 5.4 Update Pricing Formula

- [ ] priceCalculator.js Step 5 currently uses `discountRate` from request body
- [ ] Add margin resolution: product → category → global → default
- [ ] Apply margin before discount (margin increases price, discount decreases it)
- [ ] Updated formula:
  ```
  grundpreis × profileMultiplier + surcharges = costPrice
  costPrice × (1 + margin/100) = preisempfehlung
  preisempfehlung × (1 - discount) = angebotspreis
  ```

### 5.5 Tests

- [ ] Test margin resolution priority (product > category > global)
- [ ] Test default margin when none configured
- [ ] Test margin API endpoints (CRUD, auth required)
- [ ] Test pricing formula with margins applied
- [ ] Verify existing price calculation tests still work (may need updates if formula changes)

### 5.6 Done Criteria

- [ ] Admin can set global, category, and product margins via API
- [ ] Pricing engine resolves correct margin per priority
- [ ] All tests pass
- [ ] Lint clean

---

## Step 6 — Discount Engine

**Goal:** Implement a flexible discount system with volume, coupon, and time-limited discounts. Default discount is 0%.

### 6.1 Discount Types

| Type | Description | Example |
|------|-------------|---------|
| Volume | Quantity-based tiers | 5+ items = 5%, 10+ = 10%, 20+ = 15% |
| Coupon | Code-based one-time or multi-use | `WELCOME10` = 10% off |
| Time-limited | Start/end date promotions | Spring sale: 15% off Mar 1–31 |
| Category | All products in a category | All Fenster 10% off |
| Product-specific | Single product discount | Iglo 5 Classic 20% off |

### 6.2 Database Tables

- [ ] Create `discounts` table (or verify in migrations.js):
  - `id`, `type` (volume/coupon/time/category/product)
  - `code` (for coupons), `percentage`, `fixed_amount`
  - `min_quantity` (for volume), `max_uses` (for coupons)
  - `start_date`, `end_date` (for time-limited)
  - `category_id`, `product_id` (for targeted discounts)
  - `is_active`, `created_at`, `updated_at`
- [ ] Create `discount_usages` table (track coupon redemptions)

### 6.3 API Endpoints

- [ ] `GET /api/v1/discounts` — list active discounts (admin)
- [ ] `POST /api/v1/discounts` — create discount (admin)
- [ ] `PUT /api/v1/discounts/:id` — update discount (admin)
- [ ] `DELETE /api/v1/discounts/:id` — deactivate discount (admin)
- [ ] `POST /api/v1/discounts/validate` — validate a coupon code (public)
- [ ] `POST /api/v1/discounts/apply` — apply discount to cart (public)

### 6.4 Discount Resolution in Pricing

- [ ] Update priceCalculator.js to accept discount context
- [ ] Resolution order: coupon → product → category → time-limited → volume → default (0%)
- [ ] Discounts stack or take best? (Decision needed — document the rule)
- [ ] Volume discounts already exist in priceCalculator.js (Step 8) — integrate with new system
- [ ] Ensure default discount is 0% when no discount applies

### 6.5 Tests

- [ ] Test each discount type independently
- [ ] Test discount expiration (time-limited with past end_date)
- [ ] Test coupon validation (valid code, expired code, used-up code)
- [ ] Test volume discount tiers
- [ ] Test discount resolution priority
- [ ] Test 0% default when no discount applies
- [ ] Verify existing pricing tests still work

### 6.6 Done Criteria

- [ ] All 5 discount types work
- [ ] Admin can CRUD discounts via API
- [ ] Public users can apply coupons
- [ ] Volume discounts auto-apply based on quantity
- [ ] Default discount is 0%
- [ ] All tests pass
- [ ] Lint clean

---

## Step 7 — Configuration Save / Load / Share

**Goal:** Users can save window configurations, reload them later, and share via URL.

### 7.1 Database Tables

- [ ] `configurations` table already exists in migrations.js — verify columns:
  - `id`, `user_id` (nullable for guest), `manufacturer`, `config_data` (JSONB)
  - `name`, `is_public`, `share_hash`, `created_at`, `updated_at`
- [ ] `config_shares` table already exists — verify: `config_id`, `share_token`, `access_type`, `expires_at`

### 7.2 API Endpoints

- [ ] `POST /api/v1/configurations` — save a configuration (auth optional)
  - Logged-in: saved to user's account
  - Guest: saved with session token, returns share hash
- [ ] `GET /api/v1/configurations` — list user's saved configurations (auth required)
- [ ] `GET /api/v1/configurations/:id` — get a specific configuration (auth required)
- [ ] `DELETE /api/v1/configurations/:id` — delete a configuration (auth required)
- [ ] `POST /api/v1/configurations/:id/share` — generate share URL (auth required)
- [ ] `GET /api/v1/configurations/shared/:hash` — load a shared configuration (public)

### 7.3 Configuration Validation

- [ ] Validate configuration against available options for the manufacturer
- [ ] Reject invalid option combinations (e.g., security glass + non-compatible handle)
- [ ] Return pricing alongside saved configuration

### 7.4 URL Sharing

- [ ] Generate short hash for sharing (e.g., 8-character alphanumeric)
- [ ] Share URL format: `https://domain.com/config/{hash}`
- [ ] Share links can have expiration dates
- [ ] Share links can be view-only or editable

### 7.5 Tests

- [ ] Test save/load cycle (create → retrieve → verify identical)
- [ ] Test sharing (create → share → load via hash)
- [ ] Test share expiration
- [ ] Test guest vs authenticated saves
- [ ] Test configuration validation (valid and invalid configs)
- [ ] Test delete (own config only, not others')

### 7.6 Done Criteria

- [ ] Users can save, load, and delete configurations
- [ ] Share links work for anonymous access
- [ ] Configuration validation rejects invalid options
- [ ] All tests pass
- [ ] Lint clean

---

## Step 8 — Full Integration Test & Cleanup

**Goal:** Verify everything works together, clean up code, update documentation.

### 8.1 End-to-End Verification

- [ ] Test complete flow: register → login → configure (all 4 manufacturers) → save config → share → load shared → add to cart
- [ ] Test margin + discount interaction (margin applied first, then discount)
- [ ] Test volume discount with multi-item cart
- [ ] Test all legacy routes still work (`/ajax/berechnen`, `/api/v1/berechnen`)

### 8.2 Cross-Manufacturer Consistency

- [ ] Compare price calculations across manufacturers for same dimensions
- [ ] Verify each manufacturer returns its own options (not another's)
- [ ] Verify manufacturer-specific dimension limits are enforced

### 8.3 Code Cleanup

- [ ] Remove all `TODO` and `Phase 2` placeholder comments that are now complete
- [ ] Uncomment placeholder routes in app.js (users, products, orders) if implemented
- [ ] Ensure all files exist in BOTH root/ and backend/ (mirroring convention)
- [ ] Run `npm run format` to ensure consistent formatting
- [ ] Run `npm run lint` — 0 errors, 0 warnings

### 8.4 Documentation Updates

- [ ] Update README.md — mark Phase 2 items as ✅
- [ ] Update `GET /api/v1` response to list all new endpoints
- [ ] Update Swagger docs with new endpoints (margins, discounts, configurations)
- [ ] Update STEP_BY_STEP_GUIDE.md with new test commands if needed
- [ ] Update PHASE1_CODEBASE_ANALYSIS.md or create PHASE2_CODEBASE_ANALYSIS.md

### 8.5 Test Coverage Summary

- [ ] Run full test suite: `npm test`
- [ ] Target: 150+ tests (up from 100)
- [ ] All 3 original suites still pass
- [ ] New test suites: Gealan pricing, Holz pricing, Alu pricing, margins, discounts, configurations
- [ ] `npm run lint` — 0 errors, 0 warnings

### 8.6 Done Criteria

- [ ] All Phase 2 features working
- [ ] All tests pass
- [ ] Lint clean
- [ ] Documentation up to date
- [ ] Code mirrored in both root/ and backend/

---

## Dependencies Between Steps

```
Step 1 (Database) ──────────────┐
                                ├── Step 5 (Margins) ──┐
Step 2 (Gealan) ───┐           │                       │
                    ├── Step 4 ─┤                       ├── Step 8 (Integration)
Step 3 (Holz) ─────┘   (Alu)   │                       │
                                ├── Step 6 (Discounts) ─┘
                                │
                                └── Step 7 (Configurations)
```

- **Steps 2, 3, 4** can run in parallel (independent manufacturer integrations)
- **Steps 5, 6, 7** depend on Step 1 (database)
- **Step 8** depends on all previous steps

---

## Files That Will Be Modified

| File | Changes |
|------|---------|
| `src/data/basePrices.js` | Add Gealan, Holz, Alu matrices; route by manufacturer |
| `src/data/profileMultipliers.js` | Add Gealan, Holz, Alu profiles; organize by manufacturer |
| `src/data/surcharges.js` | Add Gealan, Holz, Alu surcharges; organize by manufacturer |
| `src/engine/priceCalculator.js` | Pass manufacturer through formula; add margin step |
| `src/engine/surchargeCalculator.js` | Route surcharge lookup by manufacturer |
| `src/routes/auth.js` | Replace in-memory store with database queries |
| `src/routes/berechnen.js` | Accept manufacturer parameter |
| `src/routes/options.js` | Accept manufacturer parameter; return per-manufacturer options |
| `src/routes/warenkorb.js` | Accept manufacturer parameter |
| `src/app.js` | Register new routes (margins, discounts, configurations) |

## New Files to Create

| File | Purpose |
|------|---------|
| `src/routes/margins.js` | Margin CRUD endpoints (admin) |
| `src/routes/discounts.js` | Discount CRUD + validation endpoints |
| `src/routes/configurations.js` | Configuration save/load/share endpoints |
| `tests/gealan.test.js` | Gealan pricing tests |
| `tests/holz.test.js` | Holz pricing tests |
| `tests/alu.test.js` | Alu pricing tests |
| `tests/margins.test.js` | Margin system tests |
| `tests/discounts.test.js` | Discount engine tests |
| `tests/configurations.test.js` | Configuration API tests |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Gealan/Holz dimension ranges differ from Drutex | Medium | `getBasePrice()` already validates dimensions; add per-manufacturer range checks |
| Surcharge category IDs may conflict across manufacturers | High | Namespace surcharges by manufacturer (e.g., `drutex.fs1_01`, `gealan.fs1_01`) |
| Database migration breaks existing tests | High | Use test database (separate from dev); add setup/teardown in Jest |
| In-memory auth tests break after DB migration | Medium | Mock database in tests OR use test DB with beforeAll/afterAll |
| Formula change for margins breaks existing pricing | Medium | Run existing 49 priceCalculator tests after every formula change |
| Root/backend mirroring forgotten | Medium | Add checklist item to every step: "mirror to backend/" |

---

## Decisions Needed Before Starting

These decisions should be made before writing code:

1. **Discount stacking:** Do multiple discounts stack (additive) or does best-one-wins?
2. **Manufacturer IDs:** Use slugs (`drutex`, `gealan`, `holz`, `alu`) or database IDs?
3. **Test database:** Use same DB with test schema prefix, or separate test DB?
4. **Margin default:** What is the default global margin percentage? (Docs suggest 70%)
5. **Alu product type:** Is Alu Balkontür a "manufacturer" or a separate "product category"?
6. **Backward compatibility:** Should `manufacturer` default to `drutex` when omitted (recommended: yes)?

---

## Estimated Test Count After Phase 2

| Suite | Current | Expected |
|-------|---------|----------|
| priceCalculator.test.js | 49 | 80+ (add Gealan, Holz, Alu, margin tests) |
| api.test.js | 35 | 55+ (add manufacturer param tests, new endpoints) |
| auth.test.js | 16 | 20+ (add DB-backed auth tests) |
| gealan.test.js | — | 15+ (Gealan-specific pricing) |
| holz.test.js | — | 15+ (Holz-specific pricing) |
| alu.test.js | — | 10+ (Alu-specific pricing) |
| margins.test.js | — | 15+ (margin CRUD + resolution) |
| discounts.test.js | — | 20+ (5 discount types + validation) |
| configurations.test.js | — | 15+ (save/load/share/delete) |
| **Total** | **100** | **245+** |
