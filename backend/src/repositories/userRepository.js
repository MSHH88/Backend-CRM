'use strict';

/**
 * CURIA Backend - User Repository
 *
 * Data access layer for user operations.
 * Abstracts storage — in-memory for tests, PostgreSQL for production.
 *
 * This follows the Repository Pattern so the rest of the application never
 * touches raw storage directly.  Swap the backing store by calling
 * `connectDatabase(db)` once during server startup.
 */

// ─── In-Memory Store (test / fallback) ──────────────────────────────────────
const memoryStore = {
  users: [],
  nextId: 1,
};

// ─── Database Reference ─────────────────────────────────────────────────────
let db = null;

/**
 * Wire the repository to a live database module.
 * Pass the object returned by `require('../config/database')`.
 * Once called every subsequent operation goes through PostgreSQL.
 */
const connectDatabase = (database) => {
  db = database;
};

/**
 * @returns {boolean} true when a database connection is active
 */
const isConnected = () => db !== null;

// ─── Column Mapping (camelCase ↔ snake_case) ────────────────────────────────

const toSnake = (obj) => {
  const map = {
    passwordHash: 'password_hash',
    firstName: 'first_name',
    lastName: 'last_name',
    isActive: 'is_active',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    emailVerified: 'email_verified',
    emailVerifiedAt: 'email_verified_at',
    lastLoginAt: 'last_login_at',
    failedLoginAttempts: 'failed_login_attempts',
    lockedUntil: 'locked_until',
    companyName: 'company_name',
    vatId: 'vat_id',
    phoneNumber: 'phone_number',
    role: 'role_id',
  };

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[map[key] || key] = value;
  }
  return result;
};

const toCamel = (row) => {
  if (!row) return null;
  const map = {
    password_hash: 'passwordHash',
    first_name: 'firstName',
    last_name: 'lastName',
    is_active: 'isActive',
    created_at: 'createdAt',
    updated_at: 'updatedAt',
    email_verified: 'emailVerified',
    email_verified_at: 'emailVerifiedAt',
    last_login_at: 'lastLoginAt',
    failed_login_attempts: 'failedLoginAttempts',
    locked_until: 'lockedUntil',
    company_name: 'companyName',
    vat_id: 'vatId',
    phone_number: 'phoneNumber',
    role_id: 'role',
  };

  const result = {};
  for (const [key, value] of Object.entries(row)) {
    result[map[key] || key] = value;
  }
  return result;
};

// ─── CRUD Operations ────────────────────────────────────────────────────────

/**
 * Find a user by email address (case-insensitive).
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
const findByEmail = async (email) => {
  const normalized = email.toLowerCase().trim();

  if (db) {
    const row = await db.findOne('users', { email: normalized });
    return toCamel(row);
  }

  return memoryStore.users.find((u) => u.email === normalized) || null;
};

/**
 * Find a user by primary key.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
const findById = async (id) => {
  if (db) {
    const row = await db.findOne('users', { id });
    return toCamel(row);
  }

  return memoryStore.users.find((u) => u.id === id) || null;
};

/**
 * Create a new user record.
 * @param {Object} data  – { email, passwordHash, firstName, lastName, role, isActive }
 * @returns {Promise<Object>} The created user
 */
const create = async (data) => {
  if (db) {
    const snakeData = toSnake(data);
    const row = await db.insert('users', snakeData);
    return toCamel(row);
  }

  // In-memory fallback
  const user = {
    id: memoryStore.nextId++,
    ...data,
    createdAt: data.createdAt || new Date().toISOString(),
  };
  memoryStore.users.push(user);
  return user;
};

/**
 * Update an existing user.
 * @param {number|string} id
 * @param {Object} data  – fields to update (camelCase)
 * @returns {Promise<Object|null>} The updated user
 */
const update = async (id, data) => {
  if (db) {
    const snakeData = toSnake(data);
    const rows = await db.update('users', snakeData, { id });
    return rows.length ? toCamel(rows[0]) : null;
  }

  const user = memoryStore.users.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
};

/**
 * Delete a user by id.
 * @param {number|string} id
 * @returns {Promise<boolean>}
 */
const remove = async (id) => {
  if (db) {
    const count = await db.remove('users', { id });
    return count > 0;
  }

  const idx = memoryStore.users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  memoryStore.users.splice(idx, 1);
  return true;
};

/**
 * Count all users (optionally filtered).
 * @param {Object} [conditions]
 * @returns {Promise<number>}
 */
const count = async (conditions = {}) => {
  if (db) {
    return db.count('users', toSnake(conditions));
  }

  if (Object.keys(conditions).length === 0) {
    return memoryStore.users.length;
  }

  return memoryStore.users.filter((u) =>
    Object.entries(conditions).every(([k, v]) => u[k] === v),
  ).length;
};

/**
 * Reset in-memory store.  Only used by tests — has no effect when
 * connected to a real database (use transactions + rollback instead).
 */
const clear = () => {
  memoryStore.users.length = 0;
  memoryStore.nextId = 1;
};

// ─── Exports ────────────────────────────────────────────────────────────────
module.exports = {
  connectDatabase,
  isConnected,
  findByEmail,
  findById,
  create,
  update,
  remove,
  count,
  clear,
};
