'use strict';

const request = require('supertest');
const app     = require('../src/app');

// Reset user store between tests
beforeEach(() => {
  const { clearUsers } = require('../src/routes/auth');
  clearUsers();
});

const VALID_USER = {
  email: 'test@example.com',
  password: 'SecureP@ss123!',
  firstName: 'Test',
  lastName: 'User',
};

// ── Registration ──────────────────────────────────────────────────────────────
describe('POST /api/v1/auth/register', () => {
  test('returns 201 for valid registration', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(VALID_USER);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('test@example.com');
    expect(res.body.user.firstName).toBe('Test');
    expect(res.body.tokens).toBeDefined();
    expect(res.body.tokens.accessToken).toBeDefined();
    expect(res.body.tokens.refreshToken).toBeDefined();
  });

  test('returns 400 when email is missing', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ password: 'SecureP@ss123!' });

    expect(res.status).toBe(400);
  });

  test('returns 400 when password is missing', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'test@example.com' });

    expect(res.status).toBe(400);
  });

  test('returns 400 for invalid email format', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'not-an-email', password: 'SecureP@ss123!' });

    expect(res.status).toBe(400);
  });

  test('returns 409 for duplicate email', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send(VALID_USER);

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(VALID_USER);

    expect(res.status).toBe(409);
  });

  test('password is not returned in response', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(VALID_USER);

    expect(res.body.user.password).toBeUndefined();
    expect(res.body.user.passwordHash).toBeUndefined();
  });
});

// ── Login ─────────────────────────────────────────────────────────────────────
describe('POST /api/v1/auth/login', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send(VALID_USER);
  });

  test('returns 200 and tokens for valid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: VALID_USER.email, password: VALID_USER.password });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.tokens.accessToken).toBeDefined();
    expect(res.body.tokens.refreshToken).toBeDefined();
  });

  test('returns 401 for wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: VALID_USER.email, password: 'WrongPassword1!' });

    expect(res.status).toBe(401);
  });

  test('returns 401 for non-existent email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nobody@example.com', password: 'AnyPass1!' });

    expect(res.status).toBe(401);
  });

  test('returns 400 when email is missing', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ password: 'SecureP@ss123!' });

    expect(res.status).toBe(400);
  });
});

// ── Get Current User ──────────────────────────────────────────────────────────
describe('GET /api/v1/auth/me', () => {
  test('returns 200 with user info when authenticated', async () => {
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send(VALID_USER);

    const token = regRes.body.tokens.accessToken;

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('test@example.com');
  });

  test('returns 401 without token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me');

    expect(res.status).toBe(401);
  });

  test('returns 401 with invalid token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer invalid-token-here');

    expect(res.status).toBe(401);
  });
});

// ── Logout ────────────────────────────────────────────────────────────────────
describe('POST /api/v1/auth/logout', () => {
  test('returns 200 when authenticated', async () => {
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send(VALID_USER);

    const token = regRes.body.tokens.accessToken;

    const res = await request(app)
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ── Token Refresh ─────────────────────────────────────────────────────────────
describe('POST /api/v1/auth/refresh', () => {
  test('returns new token pair with valid refresh token', async () => {
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send(VALID_USER);

    const refreshToken = regRes.body.tokens.refreshToken;

    const res = await request(app)
      .post('/api/v1/auth/refresh')
      .send({ refreshToken });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.tokens.accessToken).toBeDefined();
    expect(res.body.tokens.refreshToken).toBeDefined();
  });

  test('returns 400 when refresh token is missing', async () => {
    const res = await request(app)
      .post('/api/v1/auth/refresh')
      .send({});

    expect(res.status).toBe(400);
  });
});
