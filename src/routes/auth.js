'use strict';

/**
 * CURIA Backend - Authentication Routes (Step 1.10)
 *
 * POST /api/v1/auth/register  - Register new user
 * POST /api/v1/auth/login     - Login and get token pair
 * POST /api/v1/auth/logout    - Invalidate token
 * POST /api/v1/auth/refresh   - Refresh token pair
 * GET  /api/v1/auth/me        - Get current user info
 */

const express = require('express');
const {
  hashPassword,
  comparePassword,
  validatePasswordStrength,
  generateTokenPair,
  refreshTokenPair,
  authenticate,
  revokeToken,
  ROLES,
} = require('../middleware/auth');
const {
  ValidationError,
  AuthenticationError,
  ConflictError,
} = require('../middleware/errorHandler');

const router = express.Router();

// In-memory user store (placeholder until PostgreSQL is connected in Phase 1 Week 2)
const users = [];
let nextUserId = 1;

/**
 * Clear all users (for testing)
 */
function clearUsers() {
  users.length = 0;
  nextUserId = 1;
}

/**
 * POST /api/v1/auth/register
 * Register a new user account.
 */
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // ── Validate input ────────────────────────────────────────────────────
    if (!email || !password) {
      throw new ValidationError('Email and password are required', [
        ...(!email ? [{ field: 'email', message: 'Email is required' }] : []),
        ...(!password ? [{ field: 'password', message: 'Password is required' }] : []),
      ]);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email format');
    }

    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.isValid) {
      throw new ValidationError('Password too weak', passwordCheck.errors);
    }

    // ── Check for duplicate email ─────────────────────────────────────────
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = users.find((u) => u.email === normalizedEmail);
    if (existingUser) {
      throw new ConflictError('A user with this email already exists');
    }

    // ── Create user ───────────────────────────────────────────────────────
    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: nextUserId++,
      email: normalizedEmail,
      passwordHash: hashedPassword,
      firstName: firstName || '',
      lastName: lastName || '',
      role: ROLES.CUSTOMER,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);

    // ── Generate tokens ───────────────────────────────────────────────────
    const tokens = generateTokenPair({ id: newUser.id, role: newUser.role });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
      tokens,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/auth/login
 * Authenticate user and return token pair.
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    // ── Find user ─────────────────────────────────────────────────────────
    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new AuthenticationError('Account is deactivated');
    }

    // ── Verify password ───────────────────────────────────────────────────
    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // ── Generate tokens ───────────────────────────────────────────────────
    const tokens = generateTokenPair({ id: user.id, role: user.role });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      tokens,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/auth/logout
 * Revoke the current access token.
 */
router.post('/logout', authenticate, (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      revokeToken(token);
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/auth/refresh
 * Use a refresh token to get a new token pair.
 */
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ValidationError('Refresh token is required');
    }

    const getUserById = async (userId) => users.find((u) => u.id === userId);
    const tokens = await refreshTokenPair(refreshToken, getUserById);

    res.status(200).json({
      success: true,
      tokens,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/auth/me
 * Return the currently authenticated user's info.
 */
router.get('/me', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.user.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

// Export both the router and test helper
module.exports = router;
module.exports.clearUsers = clearUsers;
