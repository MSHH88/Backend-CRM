'use strict';

/**
 * CURIA Backend - Main Application
 *
 * Reconciled from:
 *  - Backend branch (security, middleware, config, logging, graceful shutdown)
 *  - PR #1 (pricing engine routes: berechnen, warenkorb, getOptions)
 *
 * Middleware chain:
 *  1. Helmet (security headers)
 *  2. CORS
 *  3. Compression
 *  4. Rate limiting on /api/ routes
 *  5. Body parsing (JSON + URL-encoded)
 *  6. Request logging (dev mode)
 *  7. Routes
 *  8. 404 handler
 *  9. Global error handler
 */

require('dotenv').config();

const express     = require('express');
const cors        = require('cors');
const helmet      = require('helmet');
const rateLimit   = require('express-rate-limit');
const compression = require('compression');

// ── Pricing engine routes (from PR #1) ──────────────────────────────────────
const berechnenRouter  = require('./routes/berechnen');
const warenkorbRouter  = require('./routes/warenkorb');
const optionsRouter    = require('./routes/options');

const app = express();

// =============================================================================
// SECURITY MIDDLEWARE
// =============================================================================

app.use(helmet());

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL,
      process.env.CORS_ORIGIN,
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.use(cors(corsOptions));

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: '15 minutes',
  },
});
app.use('/api/', limiter);

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
// TRUST PROXY (for reverse proxies like Render / Railway)
// =============================================================================
app.set('trust proxy', 1);

// =============================================================================
// ROUTES
// =============================================================================

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'CURIA Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
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
      berechnen: 'POST /ajax/berechnen/',
      warenkorb: 'POST /ajax/addWarenkorb/',
      options: 'GET /ajax/getOptions/',
    },
  });
});

// ── Pricing engine routes (from PR #1) ──────────────────────────────────────
app.use('/ajax/berechnen',    berechnenRouter);
app.use('/ajax/addWarenkorb', warenkorbRouter);
app.use('/ajax/getOptions',   optionsRouter);

// ── Placeholder routes (Phase 1 Steps 1.8–1.10, Phase 2+) ──────────────────
// app.use('/api/v1/auth',     require('./routes/auth'));
// app.use('/api/v1/users',    require('./routes/users'));
// app.use('/api/v1/products', require('./routes/products'));
// app.use('/api/v1/orders',   require('./routes/orders'));

// =============================================================================
// ERROR HANDLING
// =============================================================================

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'Route nicht gefunden.',
    statusCode: 404,
  });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.statusCode || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message,
    statusCode: err.statusCode || 500,
  });
});

module.exports = app;
