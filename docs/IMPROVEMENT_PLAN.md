# CURIA Backend — Improvement Plan

> Living document. Check off items as they're completed.

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done |
| 🔧 | In Progress |
| 📋 | Planned |

---

## Phase 1 — Quick Wins (this PR)

- [x] **ESLint** — already configured with `eslint:recommended` + custom rules
- [x] **Prettier** — added `.prettierrc`, `eslint-config-prettier`, `npm run format` / `npm run format:check`
- [x] **GitHub Actions CI** — `ci.yml` runs lint + tests on Node 18/20 for every push/PR
- [x] **Standardized API routes** — new clean paths alongside legacy aliases:
  | New (RESTful) | Legacy (kept for backward compat) |
  |---|---|
  | `POST /api/v1/pricing/calculate/` | `POST /api/v1/berechnen/` and `POST /ajax/berechnen/` |
  | `POST /api/v1/pricing/cart/` | `POST /api/v1/warenkorb/` and `POST /ajax/addWarenkorb/` |
  | `GET  /api/v1/pricing/options/` | `GET  /api/v1/options/` and `GET  /ajax/getOptions/` |
- [x] **Configurable discounts** — `calculatePrice()` already accepts `pricingOptions` per request with `productDiscount`, `categoryDiscount`, `globalDiscount`, `discountRate`, `quantityTiers`

---

## Phase 2 — Database & Persistence

- [ ] **Connect PostgreSQL** — the `pg` driver and `config/database.js` are ready; add connection pooling and health-check integration
- [ ] **Run schema migrations** — create tables for `users`, `products`, `orders`, `cart_items`, `pricing_rules`
- [ ] **DB-driven pricing rules** — move surcharge amounts, profile multipliers, and discount tiers from JSON files into Postgres tables
- [ ] **Session / cart persistence** — store shopping cart in DB instead of in-memory
- [ ] **Add a migration tool** — e.g. `node-pg-migrate` or `knex` migrations for version-controlled schema changes

---

## Phase 3 — API Hardening

- [ ] **Input validation** — add `express-validator` checks to all endpoints (dependency already installed)
- [ ] **Request rate limiting per route** — fine-tune rate limits for auth vs pricing vs options
- [ ] **API response envelope** — consistent `{ success, data, error, meta }` wrapper across all endpoints
- [ ] **Pagination & filtering** — add pagination to future list endpoints (products, orders, users)
- [ ] **OpenAPI / Swagger docs** — complete Swagger annotations for every route (Swagger UI already mounted at `/api-docs`)

---

## Phase 4 — Observability & Reliability

- [ ] **Structured logging with Winston** — replace `console.log` in dev logger with Winston JSON transport (Winston is already a dependency)
- [ ] **Correlation IDs** — add `X-Request-Id` header to trace requests through logs
- [ ] **Health check enhancements** — add version, git SHA, memory usage, and DB latency to `/health`
- [ ] **Graceful shutdown** — handle `SIGTERM`/`SIGINT` to drain connections before exit
- [ ] **Error tracking** — integrate Sentry or similar for production error monitoring

---

## Phase 5 — DevOps & Deployment

- [ ] **Docker support** — add `Dockerfile` and `docker-compose.yml` (app + Postgres)
- [ ] **Environment configs** — separate `.env.development`, `.env.test`, `.env.production` templates
- [ ] **CD pipeline** — auto-deploy to staging on `develop` merge, production on `main` tag
- [ ] **Database backups** — automated Postgres backup schedule

---

## Phase 6 — Feature Expansion

- [ ] **Multi-material support** — load Gealan PVC, Holz (wood), and Alu (aluminum) datasets into pricing engine
- [ ] **User management CRUD** — admin endpoints for customer/dealer accounts
- [ ] **Order management** — create, update, status tracking for orders
- [ ] **PDF quote generation** — generate downloadable price quotes from cart
- [ ] **Email notifications** — order confirmation and status update emails
- [ ] **Audit trail** — log all pricing changes and admin actions

---

## Additional Improvements (Beyond Top 5)

| # | Improvement | Priority | Effort |
|---|---|---|---|
| 6 | Complete Swagger/OpenAPI docs for all routes | Medium | Low |
| 7 | Add Docker + docker-compose for local dev | Medium | Medium |
| 8 | Structured logging with Winston (replace console.log) | Medium | Low |
| 9 | Input validation with express-validator on all endpoints | High | Medium |
| 10 | Correlation IDs for request tracing | Low | Low |
| 11 | Response envelope standardization | Medium | Medium |
| 12 | Multi-material pricing (Gealan, Holz, Alu) | High | High |
| 13 | PDF quote generation | Medium | Medium |
| 14 | Database migrations tool | High | Low |
| 15 | Graceful shutdown handler | Medium | Low |

---

*Last updated: March 2026*
