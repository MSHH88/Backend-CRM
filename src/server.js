'use strict';

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 CURIA Backend Server Started');
  console.log('='.repeat(50));
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/v1`);
  console.log('='.repeat(50));
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
const gracefulShutdown = (signal) => {
  console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
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
