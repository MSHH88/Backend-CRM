'use strict';

/**
 * CURIA Backend - Database Initialisation
 *
 * Orchestrates the startup sequence:
 *   0. Ensure the target database exists (auto-create if needed)
 *   1. Test the PostgreSQL connection
 *   2. Run migrations (CREATE TABLE IF NOT EXISTS …)
 *   3. Wire repositories to the live database
 *
 * When PostgreSQL is **not** reachable (e.g. in unit tests or local dev
 * without Docker) the application continues to run with in-memory storage.
 * This is intentional — it keeps the test suite fast and dependency-free.
 */

const { Client } = require('pg');
const db = require('./database');
const { runMigrations } = require('./migrations');
const userRepo = require('../repositories/userRepository');
const sessionRepo = require('../repositories/sessionRepository');

/**
 * Ensure the target database exists, creating it if necessary.
 * Connects to the default "postgres" database to check/create.
 *
 * @param {Object} dbConfig - Database configuration (host, port, name, user, password)
 * @returns {Promise<boolean>} `true` if the database exists (or was created),
 *   `false` if PostgreSQL is not reachable at all.
 */
const ensureDatabase = async (dbConfig) => {
  const { host, port, name, user, password } = dbConfig;
  const client = new Client({
    host,
    port,
    database: 'postgres', // connect to default database first
    user,
    password,
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();

    // Check if the target database already exists
    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [name]
    );

    if (result.rowCount === 0) {
      // Database does not exist — create it
      // Note: CREATE DATABASE cannot use parameterised queries, but `name`
      // comes from our own config (not user input). We validate it here.
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
        console.error(`❌ Invalid database name: "${name}"`);
        return false;
      }
      console.log(`📦 Database "${name}" not found — creating it now…`);
      await client.query(`CREATE DATABASE ${name}`);
      console.log(`✅ Database "${name}" created successfully!`);
    }

    return true;
  } catch (error) {
    // If we can't even connect to the "postgres" database, PostgreSQL isn't reachable
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      return false;
    }
    // Authentication or other errors — log but don't crash
    console.error('⚠️  Could not auto-create database:', error.message);
    return false;
  } finally {
    try { await client.end(); } catch (_) { /* ignore close errors */ }
  }
};

/**
 * Attempt to connect to PostgreSQL, run migrations, and wire repositories.
 *
 * @returns {Promise<boolean>} `true` when the database is live and ready,
 *   `false` when running in fallback (in-memory) mode.
 */
const initializeDatabase = async () => {
  try {
    // ── 0. Show connection target (helps diagnose .env issues) ────────────
    const config = require('./index');
    const { host, port, name, user } = config.database;
    console.log(`🔌 Connecting to PostgreSQL → ${user}@${host}:${port}/${name}`);

    // ── 0b. Auto-create database if it does not exist ─────────────────────
    const dbReachable = await ensureDatabase(config.database);
    if (!dbReachable) {
      console.warn('⚠️  PostgreSQL not reachable — running with in-memory storage');
      return false;
    }

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

module.exports = { initializeDatabase, ensureDatabase };
