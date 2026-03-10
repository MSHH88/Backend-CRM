'use strict';

// Suppress DEP0169 (url.parse) from Express 4.x internal dependencies.
// This warning comes from the parseurl package used by Express, not our code.
// It will be resolved when upgrading to Express 5.x.
// Override emitWarning (catches it before stderr) + emit (safety net).
const _emitWarning = process.emitWarning;
process.emitWarning = function (warning, typeOrOptions, code, ...rest) {
  if (code === 'DEP0169') return;
  if (typeof typeOrOptions === 'object' && typeOrOptions && typeOrOptions.code === 'DEP0169') return;
  return _emitWarning.call(this, warning, typeOrOptions, code, ...rest);
};
const originalEmit = process.emit;
process.emit = function (event, warning) {
  if (event === 'warning' && warning && warning.code === 'DEP0169') {
    return false;
  }
  return originalEmit.apply(process, arguments);
};

require('dotenv').config();
const app = require('./app');
const { initializeDatabase } = require('./config/dbInit');
const { closePool } = require('./config/database');

const PORT = process.env.PORT || 3001;

// ── Start server & initialise database ────────────────────────────────────────
const server = app.listen(PORT, async () => {
  console.log('='.repeat(50));
  console.log('🚀 CURIA Backend Server Started');
  console.log('='.repeat(50));
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/v1`);
  console.log('='.repeat(50));

  // Attempt to connect to PostgreSQL (falls back to in-memory if unavailable)
  await initializeDatabase();
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
const gracefulShutdown = (signal) => {
  console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    try {
      await closePool();
    } catch (error) {
      /* pool may not be connected — safe to ignore */
      void error;
    }
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
  // Force-close keep-alive connections so shutdown is immediate (Node ≥18.2)
  if (typeof server.closeAllConnections === 'function') {
    server.closeAllConnections();
  }
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});
