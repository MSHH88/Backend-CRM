'use strict';

/**
 * CURIA Backend - Main Application
 *
 * Reconciled from:
 *  - Backend branch (security, middleware, config, logging, graceful shutdown)
 *  - PR #1 (pricing engine routes: berechnen, warenkorb, getOptions)
 *
 * Middleware chain:
 *  1. Trust proxy
 *  2. Security (helmet, CORS, rate limiting, XSS, HPP, mongo-sanitize)
 *  3. Compression
 *  4. Body parsing (JSON + URL-encoded)
 *  5. Request logging (dev mode)
 *  6. Routes
 *  7. 404 handler (from errorHandler.js)
 *  8. Global error handler (from errorHandler.js)
 */

require('dotenv').config();

const express     = require('express');
const compression = require('compression');
const rateLimit   = require('express-rate-limit');

// ── Security middleware (Step 1.8) ──────────────────────────────────────────
const { applySecurity }  = require('./middleware/security');

// ── Error handling middleware (Step 1.8) ─────────────────────────────────────
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// ── Route files ─────────────────────────────────────────────────────────────
const berechnenRouter  = require('./routes/berechnen');
const warenkorbRouter  = require('./routes/warenkorb');
const optionsRouter    = require('./routes/options');
const authRouter       = require('./routes/auth');

// ── Swagger API docs ────────────────────────────────────────────────────────
const swaggerUi   = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// =============================================================================
// TRUST PROXY (for reverse proxies like Render / Railway)
// =============================================================================
app.set('trust proxy', 1);

// =============================================================================
// SECURITY MIDDLEWARE (Step 1.8)
// Helmet, CORS, rate limiters, XSS-clean, HPP, mongo-sanitize, IP blocker,
// request sanitization, content-type validation, audit logging
// =============================================================================
applySecurity(app);

// =============================================================================
// COMPRESSION
// =============================================================================
app.use(compression());

// =============================================================================
// BODY PARSING
// =============================================================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================================================================
// REQUEST LOGGING (simple dev logger)
// =============================================================================
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`,
      );
    });
    next();
  });
}

// =============================================================================
// ROUTES
// =============================================================================

// ── Health check (includes DB status, rate-limited) ──────────────────────────
const healthLimiter = rateLimit({ windowMs: 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false });
app.get('/health', healthLimiter, async (_req, res) => {
  let dbStatus = 'not_configured';

  // Only check DB if credentials are set
  if (process.env.DB_PASSWORD) {
    try {
      const { pool } = require('./config/database');
      await pool.query('SELECT 1');
      dbStatus = 'connected';
    } catch (_err) {
      dbStatus = 'disconnected';
    }
  }

  res.status(200).json({
    status: 'ok',
    message: 'CURIA Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    database: dbStatus,
  });
});

// ── API version info ──────────────────────────────────────────────────────────
app.get('/api/v1', (_req, res) => {
  res.status(200).json({
    name: 'CURIA API',
    version: '1.0.0',
    description: 'Backend API for CURIA CRM and E-Commerce Platform',
    endpoints: {
      health: '/health',
      api: '/api/v1',
      auth: '/api/v1/auth',
      berechnen: 'POST /api/v1/berechnen/',
      warenkorb: 'POST /api/v1/warenkorb/',
      options: 'GET /api/v1/options/',
    },
  });
});

// ── Pricing engine routes (standardized under /api/v1/) ─────────────────────
app.use('/api/v1/berechnen',  berechnenRouter);
app.use('/api/v1/warenkorb',  warenkorbRouter);
app.use('/api/v1/options',    optionsRouter);

// ── Legacy /ajax/ aliases (backward compatibility) ──────────────────────────
app.use('/ajax/berechnen',    berechnenRouter);
app.use('/ajax/addWarenkorb', warenkorbRouter);
app.use('/ajax/getOptions',   optionsRouter);

// ── Auth routes (Step 1.10) ─────────────────────────────────────────────────
app.use('/api/v1/auth',       authRouter);

// ── Swagger API documentation ───────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Placeholder routes (Phase 2+) ───────────────────────────────────────────
// app.use('/api/v1/users',    require('./routes/users'));
// app.use('/api/v1/products', require('./routes/products'));
// app.use('/api/v1/orders',   require('./routes/orders'));

// =============================================================================
// ERROR HANDLING (from errorHandler.js middleware)
// =============================================================================
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
