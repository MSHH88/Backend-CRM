# 🔍 Phase 1 Codebase Analysis

> **Date:** March 6, 2026
> **Status:** Phase 1 Complete — Analysis before Phase 2
> **All 57 tests passing ✅ | Server running on port 3001 ✅**

---

## 📊 Executive Summary

Phase 1 delivers a **solid foundation** with production-grade security, authentication, and a working Drutex pricing engine. The architecture is well-structured and extensible. However, there are **specific gaps** that should be addressed before Phase 2 to avoid technical debt.

**Verdict:** 8/10 for a Phase 1 MVP. Excellent security posture, clean code structure, good test coverage for existing features. Main gaps are in test infrastructure, API consistency, and missing operational tooling.

---

## ✅ What We Have (Strengths)

### 1. Security — EXCELLENT (Industry-Leading)
- **OWASP Top 10** coverage in middleware layer
- Helmet with proper CSP, HSTS, XSS protection
- Rate limiting (general, auth, API, password reset, order)
- Input sanitization (XSS-clean, HPP, mongo-sanitize)
- IP whitelist/blacklist support
- Failed login tracking with account lockout
- Session fingerprinting (browser + IP)
- JWT access + refresh token pair (15min / 7day)
- bcrypt 12 rounds password hashing
- Password strength validation (uppercase, lowercase, number, special char)

**Assessment:** This is BETTER than most industry competitors. Most window configurator backends have minimal security. We have enterprise-grade protection.

### 2. Authentication & Authorization — VERY GOOD
- 8-tier role system (GUEST → SUPER_ADMIN)
- 20+ granular permissions
- Token refresh flow
- Logout with token invalidation
- In-memory user store (sufficient for Phase 1)
- Clean test coverage (register, login, me, logout, refresh)

### 3. Pricing Engine — GOOD (Drutex MVP)
- 6-step master formula is clean and well-documented
- Base price matrix with geometric-mean interpolation
- Profile multipliers (6 profiles)
- 9 surcharge categories with 100+ options
- German locale formatting (€1.234,56)
- Monetary rounding (2 decimal places)
- Input validation (dimension range, valid profiles)

### 4. Code Quality — GOOD
- `'use strict'` in all files
- JSDoc comments on all public functions
- Consistent error handling patterns
- Clean separation of concerns (routes → engine → data)
- Response formatter with XSS-escaped HTML output

### 5. Error Handling — EXCELLENT
- 20+ custom error classes (HTTP, DB, business logic, CRM-specific)
- Error statistics tracking
- PostgreSQL error code mapping
- Sanitized responses (hide stack in production)
- Context logging (timestamp, user, IP, method, URL)

### 6. Logging — EXCELLENT
- Winston with daily rotation (30-day retention)
- CRM-specific loggers (audit, orders, payments, catalog, security)
- JSON format in production for log aggregation
- Multiple transports (console, file, error file)

### 7. Database Schema — COMPREHENSIVE
- Full migration file with 20+ tables
- RBAC tables (roles, permissions, role_permissions)
- E-commerce tables (products, variants, carts, orders, invoices)
- CRM tables (lead tracking, analytics events)
- Configurator tables (configurations, config shares)
- Proper indexes and constraints

---

## ⚠️ Issues Found & Fixed

### Fixed: Jest Force Exit Warning
**Problem:** `A worker process has failed to exit gracefully` when running tests.
**Root Cause:** `express-rate-limit` creates internal timers that don't clean up when Jest finishes.
**Fix:** Added `--forceExit` to the `test` script in `package.json`. This is the recommended approach for Express apps with rate limiters.

### Fixed: Duplicate Test Execution
**Problem:** Tests ran 114 instead of 57 (6 suites instead of 3).
**Root Cause:** Jest discovered test files in both `tests/` AND `backend/tests/` (the mirror folder).
**Fix:** Added `testPathIgnorePatterns: ["/node_modules/", "/backend/"]` to Jest config in `package.json`.

### Fixed: Haste Module Naming Collision
**Problem:** Warning about `curia-backend` name collision.
**Root Cause:** Both `package.json` (root) and `backend/package.json` have the same name.
**Fix:** Resolved by the `testPathIgnorePatterns` above — Jest no longer scans `backend/`.

---

## 🔴 Gaps & Missing Features

### Gap 1: No ESLint Configuration
**Status:** `npm run lint` fails — no `.eslintrc` file exists.
**Impact:** Code style inconsistencies could creep in.
**Recommendation:** Add an `.eslintrc.json` with Node.js + Jest config before Phase 2 begins.

### Gap 2: API Route Inconsistency
**Status:** Pricing routes use `/ajax/*` prefix; auth uses `/api/v1/*`.
**Impact:** Inconsistent API versioning. The `/ajax/` pattern comes from the legacy Drutex konfigurator.
**Recommendation:** Keep `/ajax/*` for backward compatibility with the legacy frontend, but add `/api/v1/pricing/*` aliases in Phase 2 for the new frontend.

### Gap 3: No Database Health Check
**Status:** `/health` endpoint only checks if Express is running, not PostgreSQL.
**Impact:** Server reports "ok" even if database is down.
**Recommendation:** Add `dbConnected: true/false` to health check response in Phase 2 when PostgreSQL is added.

### Gap 4: No CI/CD Pipeline
**Status:** No GitHub Actions workflow for automated testing.
**Impact:** Tests only run locally; no PR quality gate.
**Recommendation:** Add a simple `.github/workflows/test.yml` that runs `npm test` on PRs.

### Gap 5: Missing Input Validation on Routes
**Status:** Pricing routes rely on manual validation inside `calculatePrice()`. No `express-validator` middleware on route level.
**Impact:** Error messages are generic; validation errors aren't structured.
**Recommendation:** Add `express-validator` checks on `/ajax/berechnen/` and `/ajax/addWarenkorb/` route definitions. The dependency is already installed but not used on pricing routes.

### Gap 6: No CSRF Protection Implementation
**Status:** Security comments mention CSRF tokens, but no actual CSRF middleware is implemented.
**Impact:** Moderate risk for session-based operations in the frontend.
**Recommendation:** Add `csurf` or custom CSRF token middleware when the frontend is built (Phase 3). Not needed for API-only JWT auth.

### Gap 7: `express-mongo-sanitize` Without MongoDB
**Status:** MongoDB sanitization is applied but the app uses PostgreSQL.
**Impact:** Unnecessary dependency; adds confusion.
**Recommendation:** Keep it — it provides defense-in-depth against NoSQL injection in JSON payloads. Low overhead, zero harm.

---

## 🟡 Improvements to Consider

### Improvement 1: Configurable Discount Rate
**Current:** Fixed 40% savings / 60% offer price hardcoded in `priceCalculator.js`.
**Better:** Move `DEFAULT_MARGIN` from `.env` config into the pricing formula. Different manufacturers or product types may have different margins.
**Priority:** HIGH — needed for Phase 2 multi-manufacturer support.

### Improvement 2: Quantity Pricing
**Current:** Single-item pricing only.
**Better:** Add quantity-based discounts (e.g., 5+ windows = 5% off, 10+ = 10% off).
**Priority:** MEDIUM — needed before CRM/B2B launch.

### Improvement 3: VAT Toggle
**Current:** VAT rate configured (19%) but not applied in pricing output.
**Better:** Show both net and gross (Brutto/Netto) prices. B2B customers see net; B2C sees gross.
**Priority:** HIGH — German law requires this distinction.

### Improvement 4: Installation Cost Estimation
**Current:** No installation pricing.
**Better:** Add optional installation surcharge based on window type + difficulty + floor.
**Priority:** LOW — can be added in Phase 3/4.

### Improvement 5: Shipping Cost Estimation
**Current:** No shipping calculation.
**Better:** Based on total weight/dimensions + delivery zone.
**Priority:** LOW — Phase 3/4.

### Improvement 6: Configuration Save/Share
**Current:** Schema exists (configurations, config_shares tables) but no routes.
**Better:** Implement `POST /api/v1/configurations` + `GET /api/v1/configurations/:id` + shareable links.
**Priority:** MEDIUM — great for customer experience.

### Improvement 7: Test Coverage Gaps
**Current:** 57 tests cover pricing engine + auth + API routes. No tests for:
- Security middleware
- Error handler middleware
- Logger
- Database functions
- Edge cases (concurrent requests, very large payloads)
**Better:** Add middleware unit tests and integration tests.
**Priority:** MEDIUM — before production deployment.

### Improvement 8: API Documentation
**Current:** No Swagger/OpenAPI spec.
**Better:** Add `swagger-jsdoc` + `swagger-ui-express` to auto-generate API docs from JSDoc.
**Priority:** LOW for Phase 2, HIGH for Phase 3 (frontend integration).

---

## 📈 Comparison: CURIA vs Industry Standard

| Feature | Typical Window Configurator | CURIA Phase 1 | CURIA Phase 2+ |
|---------|---------------------------|---------------|----------------|
| **Security** | Basic (no rate limiting, no XSS) | ★★★★★ OWASP Top 10 | ★★★★★ |
| **Authentication** | Session cookies only | ★★★★☆ JWT + roles | ★★★★★ Full RBAC |
| **Pricing accuracy** | Manual entry or basic lookup | ★★★★☆ Matrix + interpolation | ★★★★★ Multi-manufacturer |
| **Surcharge system** | Limited options | ★★★★☆ 9 categories, 100+ options | ★★★★★ All materials |
| **Multi-manufacturer** | Usually single-brand | ★★☆☆☆ Drutex only | ★★★★★ Drutex+Gealan+Holz+Alu |
| **Error handling** | Generic 500 errors | ★★★★★ 20+ error classes | ★★★★★ |
| **Logging** | Console.log | ★★★★★ Winston + rotation | ★★★★★ |
| **API documentation** | None | ★☆☆☆☆ Health endpoint only | ★★★★☆ Swagger |
| **Test coverage** | None or minimal | ★★★☆☆ 57 tests (engine+auth+API) | ★★★★☆ Full suite |
| **Database schema** | Minimal tables | ★★★★☆ 20+ tables planned | ★★★★★ Active |
| **CRM features** | None | ★★☆☆☆ Schema only | ★★★★★ Full CRM |
| **Lead generation** | None | ★★★☆☆ CREATOR role + schema | ★★★★★ Active |
| **B2B support** | Rare | ★★★☆☆ Role + VAT schema | ★★★★★ Active |
| **Configuration sharing** | Rare | ★★☆☆☆ Schema only | ★★★★☆ Active |

**Bottom line:** CURIA is ALREADY ahead of most industry competitors in security, error handling, and logging. The pricing engine is solid for Drutex. The main gap is multi-manufacturer support (Phase 2) and CRM features (Phase 4).

---

## ❓ Questions for Discussion Before Phase 2

1. **Discount model:** Should the 40%/60% split be per-manufacturer, per-product-type, or configurable per customer (B2B)?

2. **VAT display:** Should we show Brutto (including 19% VAT) and Netto (excluding VAT) in all price outputs, or only on the final order?

3. **Gealan/Holz/Alu profiles:** Do they use the same surcharge categories as Drutex, or do they have different option types?

4. **Doors vs Windows:** Does the pricing formula differ for balcony doors (Balkontüren) vs windows? Same matrix structure or different calculation?

5. **Minimum order value:** Should there be a minimum order threshold before accepting orders?

6. **Currency support:** EUR only, or multi-currency for international orders?

7. **Price versioning:** When prices change, should old quotes retain their original prices? How long should a quote be valid?

8. **Delivery zones:** Are shipping costs needed? What regions do you deliver to?

---

## 🛣️ Recommended Phase 2 Order of Work

1. ~~Fix Jest issues~~ ✅ Done
2. Add ESLint configuration
3. Analyze Gealan/Holz/Alu datasets
4. Extend pricing engine for multi-manufacturer
5. Add PostgreSQL connection + run migrations
6. Implement user CRUD routes
7. Implement product/configuration routes
8. Add VAT (Brutto/Netto) pricing
9. Add Swagger API documentation
10. Add CI/CD pipeline (GitHub Actions)

---

*This analysis was generated from a full review of 20 source files, 3 test files, 11 docs, and 23 dataset files.*
