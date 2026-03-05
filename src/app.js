'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const routes     = require('./routes');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/', routes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route nicht gefunden.' });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Interner Serverfehler.' });
});

module.exports = app;
