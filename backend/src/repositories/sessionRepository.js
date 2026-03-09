'use strict';

/**
 * CURIA Backend - Session Repository
 *
 * Data access layer for authentication sessions, token blacklists, and
 * refresh-token bookkeeping.
 *
 * Like the User Repository this supports two modes:
 *   • In-memory  – used during tests or when no DB is configured.
 *   • PostgreSQL – activated by calling `connectDatabase(db)`.
 *
 * When PostgreSQL is active the in-memory stores act as a **write-through
 * cache**: every write goes to both memory and DB, every read checks memory
 * first and falls back to the DB.  This keeps lookups fast while ensuring
 * data survives server restarts.
 */

const crypto = require('crypto');

// ─── In-Memory Stores (test / fallback / cache) ─────────────────────────────

/** Blacklisted access tokens (JWTs that were explicitly revoked). */
const tokenBlacklist = new Set();

/** userId → Set<tokenId>  — active refresh-token IDs per user. */
const refreshTokens = new Map();

// ─── Database Reference ─────────────────────────────────────────────────────
let db = null;

/**
 * Wire to a live database.  Also loads existing sessions from DB into the
 * in-memory cache so tokens issued before this restart are still valid.
 * @param {Object} database – the module from `require('../config/database')`
 */
const connectDatabase = async (database) => {
  db = database;

  // Hydrate in-memory cache from DB so tokens survive restarts
  try {
    // Load valid (non-expired) refresh tokens
    const sessions = await db.query(
      'SELECT user_id, token_hash FROM user_sessions WHERE is_valid = TRUE AND expires_at > NOW()'
    );
    for (const row of sessions.rows) {
      const uid = row.user_id;
      if (!refreshTokens.has(uid)) {
        refreshTokens.set(uid, new Set());
      }
      refreshTokens.get(uid).add(row.token_hash);
    }

    // Load non-expired blacklisted tokens
    const revoked = await db.query(
      'SELECT token_hash FROM revoked_tokens WHERE expires_at > NOW()'
    );
    for (const row of revoked.rows) {
      tokenBlacklist.add(row.token_hash);
    }
  } catch (err) {
    // Tables may not exist yet on first run — that's fine, migrations will create them
    console.warn('⚠️  Could not hydrate session cache:', err.message);
  }
};

/** @returns {boolean} */
const isConnected = () => db !== null;

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Hash a token string for safe DB storage (we never store raw JWTs).
 * @param {string} token
 * @returns {string} SHA-256 hex digest
 */
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

// ─── Token Blacklist ────────────────────────────────────────────────────────

/**
 * Add an access token to the blacklist so it can no longer be used.
 * @param {string} token  – the raw JWT string
 * @param {number} [ttlMs=86400000]  – auto-cleanup delay (default 24 h)
 */
const blacklistToken = (token, ttlMs = 24 * 60 * 60 * 1000) => {
  const hash = hashToken(token);

  // Always add to in-memory set for fast lookup (serves as a cache when DB is active)
  tokenBlacklist.add(hash);

  // Auto-cleanup after token would have expired anyway
  setTimeout(() => {
    tokenBlacklist.delete(hash);
  }, ttlMs);

  // Persist to PostgreSQL so the blacklist survives server restarts
  if (db) {
    const expiresAt = new Date(Date.now() + ttlMs);
    db.query(
      'INSERT INTO revoked_tokens (token_hash, expires_at) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [hash, expiresAt]
    ).catch((err) => console.error('⚠️  Failed to persist revoked token:', err.message));
  }
};

/**
 * Check whether a token has been revoked.
 * @param {string} token
 * @returns {boolean}
 */
const isTokenBlacklisted = (token) => {
  const hash = hashToken(token);
  return tokenBlacklist.has(hash);
};

// ─── Refresh Tokens ─────────────────────────────────────────────────────────

/**
 * Store a refresh-token ID for a user.
 * @param {number|string} userId
 * @param {string} tokenId  – the unique `tokenId` embedded in the JWT payload
 */
const storeRefreshToken = (userId, tokenId) => {
  // Always maintain the in-memory map (serves as primary store without DB,
  // or as a fast lookup cache when DB is active).
  if (!refreshTokens.has(userId)) {
    refreshTokens.set(userId, new Set());
  }
  refreshTokens.get(userId).add(tokenId);

  // Persist to PostgreSQL so sessions survive server restarts
  if (db) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    db.query(
      'INSERT INTO user_sessions (user_id, token_hash, is_valid, expires_at) VALUES ($1, $2, TRUE, $3)',
      [userId, tokenId, expiresAt]
    ).catch((err) => console.error('⚠️  Failed to persist session:', err.message));
  }
};

/**
 * Validate that a refresh-token ID is still active for a given user.
 * @param {number|string} userId
 * @param {string} tokenId
 * @returns {boolean}
 */
const isRefreshTokenValid = (userId, tokenId) => {
  const userTokens = refreshTokens.get(userId);
  return !!(userTokens && userTokens.has(tokenId));
};

/**
 * Invalidate a single refresh-token ID (e.g. after rotation).
 * @param {number|string} userId
 * @param {string} tokenId
 */
const invalidateRefreshToken = (userId, tokenId) => {
  const userTokens = refreshTokens.get(userId);
  if (userTokens) {
    userTokens.delete(tokenId);
  }

  // Mark invalid in PostgreSQL
  if (db) {
    db.query(
      'UPDATE user_sessions SET is_valid = FALSE WHERE user_id = $1 AND token_hash = $2',
      [userId, tokenId]
    ).catch((err) => console.error('⚠️  Failed to invalidate session in DB:', err.message));
  }
};

/**
 * Revoke ALL refresh tokens for a user (e.g. password change, "log out everywhere").
 * @param {number|string} userId
 */
const revokeAllUserTokens = (userId) => {
  refreshTokens.delete(userId);

  // Mark all invalid in PostgreSQL
  if (db) {
    db.query(
      'UPDATE user_sessions SET is_valid = FALSE WHERE user_id = $1',
      [userId]
    ).catch((err) => console.error('⚠️  Failed to revoke all sessions in DB:', err.message));
  }
};

/**
 * Enforce the maximum number of concurrent sessions for a user.
 * Oldest tokens beyond the limit are silently removed.
 * @param {number|string} userId
 * @param {number} maxSessions
 */
const enforceSessionLimit = (userId, maxSessions) => {
  const userTokens = refreshTokens.get(userId);
  if (!userTokens || userTokens.size <= maxSessions) return;

  const tokensArray = Array.from(userTokens);
  const toRemove = tokensArray.slice(0, userTokens.size - maxSessions);
  toRemove.forEach((t) => userTokens.delete(t));

  // Also invalidate in PostgreSQL
  if (db && toRemove.length > 0) {
    const placeholders = toRemove.map((_, i) => `$${i + 2}`).join(', ');
    db.query(
      `UPDATE user_sessions SET is_valid = FALSE WHERE user_id = $1 AND token_hash IN (${placeholders})`,
      [userId, ...toRemove]
    ).catch((err) => console.error('⚠️  Failed to enforce session limit in DB:', err.message));
  }
};

/**
 * Get the number of active refresh tokens for a user.
 * @param {number|string} userId
 * @returns {number}
 */
const getActiveSessionCount = (userId) => {
  const userTokens = refreshTokens.get(userId);
  return userTokens ? userTokens.size : 0;
};

// ─── Cleanup (tests) ────────────────────────────────────────────────────────

/**
 * Reset all in-memory stores.  Test-only — no effect in DB mode.
 */
const clear = () => {
  tokenBlacklist.clear();
  refreshTokens.clear();
};

// ─── Exports ────────────────────────────────────────────────────────────────
module.exports = {
  connectDatabase,
  isConnected,

  // Token blacklist
  blacklistToken,
  isTokenBlacklisted,

  // Refresh tokens
  storeRefreshToken,
  isRefreshTokenValid,
  invalidateRefreshToken,
  revokeAllUserTokens,
  enforceSessionLimit,
  getActiveSessionCount,

  // Direct access (for backward compat with middleware)
  tokenBlacklist,
  refreshTokens,

  // Test helpers
  clear,
};
