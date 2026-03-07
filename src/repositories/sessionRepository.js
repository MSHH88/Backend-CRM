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
 * The in-memory mode is functionally identical to the Phase 1 auth
 * middleware so all existing tests continue to pass unchanged.
 */

// ─── In-Memory Stores (test / fallback) ─────────────────────────────────────

/** Blacklisted access tokens (JWTs that were explicitly revoked). */
const tokenBlacklist = new Set();

/** userId → Set<tokenId>  — active refresh-token IDs per user. */
const refreshTokens = new Map();

// ─── Database Reference ─────────────────────────────────────────────────────
let db = null;

/**
 * Wire to a live database.
 * @param {Object} database – the module from `require('../config/database')`
 */
const connectDatabase = (database) => {
  db = database;
};

/** @returns {boolean} */
const isConnected = () => db !== null;

// ─── Token Blacklist ────────────────────────────────────────────────────────

/**
 * Add an access token to the blacklist so it can no longer be used.
 * @param {string} token  – the raw JWT string
 * @param {number} [ttlMs=86400000]  – auto-cleanup delay (default 24 h)
 */
const blacklistToken = (token, ttlMs = 24 * 60 * 60 * 1000) => {
  // Always add to in-memory set for fast lookup (serves as a cache when DB is active)
  tokenBlacklist.add(token);

  // Auto-cleanup after token would have expired anyway
  setTimeout(() => {
    tokenBlacklist.delete(token);
  }, ttlMs);

  // TODO: When PostgreSQL is live, also persist to a `revoked_tokens` table
  // so the blacklist survives server restarts.
};

/**
 * Check whether a token has been revoked.
 * @param {string} token
 * @returns {boolean}
 */
const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
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

  // TODO: When PostgreSQL is live, also persist to `user_sessions` table
  // so sessions survive server restarts.
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
};

/**
 * Revoke ALL refresh tokens for a user (e.g. password change, "log out everywhere").
 * @param {number|string} userId
 */
const revokeAllUserTokens = (userId) => {
  refreshTokens.delete(userId);
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
  tokensArray
    .slice(0, userTokens.size - maxSessions)
    .forEach((t) => userTokens.delete(t));
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
