'use strict';

/**
 * CURIA Backend - Repository Tests
 *
 * Validates the data access layer (userRepository & sessionRepository)
 * in in-memory mode.  When a PostgreSQL instance is available these same
 * operations will be tested end-to-end by the DB integration tests.
 */

const userRepo = require('../src/repositories/userRepository');
const sessionRepo = require('../src/repositories/sessionRepository');

// ── Reset stores between every test ──────────────────────────────────────────
beforeEach(() => {
  userRepo.clear();
  sessionRepo.clear();
});

// ═══════════════════════════════════════════════════════════════════════════════
// User Repository
// ═══════════════════════════════════════════════════════════════════════════════
describe('userRepository (in-memory)', () => {
  const sampleUser = {
    email: 'alice@example.com',
    passwordHash: '$2a$12$fakehash',
    firstName: 'Alice',
    lastName: 'Smith',
    role: 1,
    isActive: true,
  };

  // ── create ────────────────────────────────────────────────────────────────
  test('create() returns a user with an auto-incremented id', async () => {
    const user = await userRepo.create(sampleUser);
    expect(user.id).toBe(1);
    expect(user.email).toBe('alice@example.com');
    expect(user.firstName).toBe('Alice');
    expect(user.isActive).toBe(true);
    expect(user.createdAt).toBeDefined();
  });

  test('create() increments id on each call', async () => {
    const u1 = await userRepo.create(sampleUser);
    const u2 = await userRepo.create({ ...sampleUser, email: 'bob@example.com' });
    expect(u2.id).toBe(u1.id + 1);
  });

  // ── findByEmail ───────────────────────────────────────────────────────────
  test('findByEmail() returns the user for a matching email', async () => {
    await userRepo.create(sampleUser);
    const found = await userRepo.findByEmail('alice@example.com');
    expect(found).not.toBeNull();
    expect(found.email).toBe('alice@example.com');
  });

  test('findByEmail() is case-insensitive', async () => {
    await userRepo.create(sampleUser);
    const found = await userRepo.findByEmail('ALICE@EXAMPLE.COM');
    expect(found).not.toBeNull();
  });

  test('findByEmail() returns null for non-existent email', async () => {
    const found = await userRepo.findByEmail('nobody@example.com');
    expect(found).toBeNull();
  });

  // ── findById ──────────────────────────────────────────────────────────────
  test('findById() returns the user for a matching id', async () => {
    const created = await userRepo.create(sampleUser);
    const found = await userRepo.findById(created.id);
    expect(found).not.toBeNull();
    expect(found.email).toBe('alice@example.com');
  });

  test('findById() returns null for non-existent id', async () => {
    const found = await userRepo.findById(999);
    expect(found).toBeNull();
  });

  // ── update ────────────────────────────────────────────────────────────────
  test('update() modifies existing user fields', async () => {
    const user = await userRepo.create(sampleUser);
    const updated = await userRepo.update(user.id, { firstName: 'Alicia' });
    expect(updated.firstName).toBe('Alicia');
    expect(updated.email).toBe('alice@example.com'); // unchanged
  });

  test('update() returns null for non-existent id', async () => {
    const result = await userRepo.update(999, { firstName: 'Ghost' });
    expect(result).toBeNull();
  });

  // ── remove ────────────────────────────────────────────────────────────────
  test('remove() deletes an existing user', async () => {
    const user = await userRepo.create(sampleUser);
    const removed = await userRepo.remove(user.id);
    expect(removed).toBe(true);
    const found = await userRepo.findById(user.id);
    expect(found).toBeNull();
  });

  test('remove() returns false for non-existent id', async () => {
    const removed = await userRepo.remove(999);
    expect(removed).toBe(false);
  });

  // ── count ─────────────────────────────────────────────────────────────────
  test('count() returns 0 when empty', async () => {
    expect(await userRepo.count()).toBe(0);
  });

  test('count() returns the number of users', async () => {
    await userRepo.create(sampleUser);
    await userRepo.create({ ...sampleUser, email: 'bob@example.com' });
    expect(await userRepo.count()).toBe(2);
  });

  test('count() with conditions filters results', async () => {
    await userRepo.create(sampleUser);
    await userRepo.create({ ...sampleUser, email: 'bob@example.com', isActive: false });
    expect(await userRepo.count({ isActive: true })).toBe(1);
    expect(await userRepo.count({ isActive: false })).toBe(1);
  });

  // ── clear ─────────────────────────────────────────────────────────────────
  test('clear() resets the store and id counter', async () => {
    await userRepo.create(sampleUser);
    userRepo.clear();
    expect(await userRepo.count()).toBe(0);
    const next = await userRepo.create(sampleUser);
    expect(next.id).toBe(1); // id counter reset
  });

  // ── isConnected ───────────────────────────────────────────────────────────
  test('isConnected() returns false in in-memory mode', () => {
    expect(userRepo.isConnected()).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Session Repository
// ═══════════════════════════════════════════════════════════════════════════════
describe('sessionRepository (in-memory)', () => {
  // ── Token Blacklist ────────────────────────────────────────────────────────
  test('blacklistToken() + isTokenBlacklisted() works', () => {
    expect(sessionRepo.isTokenBlacklisted('tok-abc')).toBe(false);
    sessionRepo.blacklistToken('tok-abc');
    expect(sessionRepo.isTokenBlacklisted('tok-abc')).toBe(true);
  });

  // ── Refresh Tokens ────────────────────────────────────────────────────────
  test('storeRefreshToken() + isRefreshTokenValid() works', () => {
    sessionRepo.storeRefreshToken(1, 'rt-001');
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-001')).toBe(true);
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-999')).toBe(false);
    expect(sessionRepo.isRefreshTokenValid(2, 'rt-001')).toBe(false);
  });

  test('invalidateRefreshToken() removes a single token', () => {
    sessionRepo.storeRefreshToken(1, 'rt-001');
    sessionRepo.storeRefreshToken(1, 'rt-002');
    sessionRepo.invalidateRefreshToken(1, 'rt-001');
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-001')).toBe(false);
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-002')).toBe(true);
  });

  test('revokeAllUserTokens() removes all tokens for a user', () => {
    sessionRepo.storeRefreshToken(1, 'rt-001');
    sessionRepo.storeRefreshToken(1, 'rt-002');
    sessionRepo.revokeAllUserTokens(1);
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-001')).toBe(false);
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-002')).toBe(false);
  });

  test('enforceSessionLimit() removes oldest tokens', () => {
    sessionRepo.storeRefreshToken(1, 'rt-a');
    sessionRepo.storeRefreshToken(1, 'rt-b');
    sessionRepo.storeRefreshToken(1, 'rt-c');
    sessionRepo.enforceSessionLimit(1, 2);
    // Oldest (rt-a) should be removed
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-a')).toBe(false);
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-b')).toBe(true);
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-c')).toBe(true);
  });

  test('getActiveSessionCount() returns correct count', () => {
    expect(sessionRepo.getActiveSessionCount(1)).toBe(0);
    sessionRepo.storeRefreshToken(1, 'rt-1');
    expect(sessionRepo.getActiveSessionCount(1)).toBe(1);
    sessionRepo.storeRefreshToken(1, 'rt-2');
    expect(sessionRepo.getActiveSessionCount(1)).toBe(2);
  });

  // ── Clear ─────────────────────────────────────────────────────────────────
  test('clear() resets all stores', () => {
    sessionRepo.blacklistToken('tok-x');
    sessionRepo.storeRefreshToken(1, 'rt-x');
    sessionRepo.clear();
    expect(sessionRepo.isTokenBlacklisted('tok-x')).toBe(false);
    expect(sessionRepo.isRefreshTokenValid(1, 'rt-x')).toBe(false);
  });

  // ── isConnected ───────────────────────────────────────────────────────────
  test('isConnected() returns false in in-memory mode', () => {
    expect(sessionRepo.isConnected()).toBe(false);
  });
});
