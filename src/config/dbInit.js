'use strict';

/**
 * CURIA Backend - Database Initialisation
 *
 * Orchestrates the startup sequence:
 *   1. Test the PostgreSQL connection
 *   2. Run migrations (CREATE TABLE IF NOT EXISTS …)
 *   3. Wire repositories to the live database
 *
 * When PostgreSQL is **not** reachable (e.g. in unit tests or local dev
 * without Docker) the application continues to run with in-memory storage.
 * This is intentional — it keeps the test suite fast and dependency-free.
 */

const db = require('./database');
const { runMigrations } = require('./migrations');
const userRepo = require('../repositories/userRepository');
const sessionRepo = require('../repositories/sessionRepository');

/**
 * Attempt to connect to PostgreSQL, run migrations, and wire repositories.
 *
 * @returns {Promise<boolean>} `true` when the database is live and ready,
 *   `false` when running in fallback (in-memory) mode.
 */
const initializeDatabase = async () => {
  try {
    // ── 1. Check connectivity ─────────────────────────────────────────────
    const connected = await db.checkConnection();
    if (!connected) {
      console.warn('⚠️  PostgreSQL not reachable — running with in-memory storage');
      return false;
    }

    // ── 2. Run migrations ─────────────────────────────────────────────────
    await runMigrations();

    // ── 3. Wire repositories ──────────────────────────────────────────────
    userRepo.connectDatabase(db);
    sessionRepo.connectDatabase(db);

    console.log('✅ Database initialised — repositories connected to PostgreSQL');
    return true;
  } catch (error) {
    console.error('❌ Database initialisation failed:', error.message);
    console.warn('⚠️  Falling back to in-memory storage');
    return false;
  }
};

module.exports = { initializeDatabase };
