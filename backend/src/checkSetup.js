'use strict';

/**
 * CURIA Backend — Pre-flight Setup Check
 *
 * Run this BEFORE `npm start` to verify your environment is correct.
 * Usage: node src/checkSetup.js
 *
 * Checks:
 *   1. .env file exists
 *   2. Required values are set (not template placeholders)
 *   3. PostgreSQL is reachable with those credentials
 *   4. Target database exists (or can be auto-created)
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// ── Helpers ───────────────────────────────────────────────────────────────────

const PASS = '✅';
const FAIL = '❌';
const WARN = '⚠️';
let failures = 0;

function check(ok, passMsg, failMsg) {
  if (ok) {
    console.log(`  ${PASS} ${passMsg}`);
  } else {
    console.log(`  ${FAIL} ${failMsg}`);
    failures++;
  }
  return ok;
}

// ── 1. Check .env file ───────────────────────────────────────────────────────

console.log('\n=== CURIA Pre-flight Check ===\n');
console.log('1) Checking .env file…');

const envPath = path.join(__dirname, '..', '.env');
const envExists = fs.existsSync(envPath);
check(envExists, '.env file found', `.env file NOT found at ${envPath}\n     Fix: run  cp .env.example .env  then edit the password`);

if (!envExists) {
  console.log(`\n${FAIL} Cannot continue without .env file.\n`);
  process.exit(1);
}

// ── 2. Check required values ─────────────────────────────────────────────────

require('dotenv').config({ path: envPath });

console.log('\n2) Checking .env values…');

const host = process.env.DB_HOST || 'localhost';
const port = parseInt(process.env.DB_PORT, 10) || 5432;
const name = process.env.DB_NAME || 'curia';
const user = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || '';

console.log(`     DB_HOST     = ${host}`);
console.log(`     DB_PORT     = ${port}`);
console.log(`     DB_NAME     = ${name}`);
console.log(`     DB_USER     = ${user}`);
console.log(`     DB_PASSWORD = ${password ? '****** (' + password.length + ' chars)' : '(empty)'}`);
console.log('');

check(password.length > 0, 'DB_PASSWORD is set', 'DB_PASSWORD is EMPTY — set it in .env');

const placeholders = ['yourpassword', 'PUT_YOUR_PASSWORD_HERE', 'your_password', 'password'];
const isPlaceholder = placeholders.includes(password);
check(!isPlaceholder, 'DB_PASSWORD is not a placeholder',
  `DB_PASSWORD is still "${password}" — change it to your real PostgreSQL password in .env`);

if (password.length === 0 || isPlaceholder) {
  console.log(`\n${FAIL} Fix your .env password first, then run this check again.`);
  console.log(`     Open it:  open -e .env\n`);
  process.exit(1);
}

// ── 3. Test PostgreSQL connection ────────────────────────────────────────────

console.log('3) Testing PostgreSQL connection…');
console.log(`     Connecting to → ${user}@${host}:${port}/postgres …`);

async function runChecks() {
  // First, try connecting to the default "postgres" database
  const client = new Client({
    host,
    port,
    database: 'postgres',
    user,
    password,
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    check(true, `Connected to PostgreSQL at ${host}:${port}`);

    // Check if the target database exists
    const res = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [name]
    );

    if (res.rowCount > 0) {
      check(true, `Database "${name}" exists`);
    } else {
      console.log(`  ${WARN} Database "${name}" does not exist yet — npm start will auto-create it`);
    }

    await client.end();
  } catch (error) {
    await client.end().catch(() => {});

    if (error.message.includes('password authentication failed')) {
      check(false, '', `Wrong password for user "${user}"`);
      console.log(`\n     Your .env has DB_PASSWORD=${password}`);
      console.log('     But PostgreSQL rejected it.');
      console.log('     The password you need is the one PGAdmin asks when you connect to "PostgreSQL 18".');
      console.log('     Fix it in .env:  open -e .env\n');
    } else if (error.code === 'ECONNREFUSED') {
      check(false, '', `PostgreSQL is not running on ${host}:${port}`);
      console.log('\n     Open PGAdmin → right-click "PostgreSQL 18" → Connect');
      console.log('     If it still fails, restart your Mac.\n');
    } else if (error.message.includes('does not exist')) {
      check(false, '', `Role/user "${user}" does not exist`);
      console.log(`\n     Try: run  whoami  in Terminal and set DB_USER to that value in .env\n`);
    } else {
      check(false, '', `Connection error: ${error.message}`);
    }
    printSummary();
    process.exit(1);
  }

  // ── 4. Test connection to target database ──────────────────────────────

  console.log(`\n4) Testing connection to "${name}" database…`);

  const targetClient = new Client({
    host,
    port,
    database: name,
    user,
    password,
    connectionTimeoutMillis: 10000,
  });

  try {
    await targetClient.connect();
    check(true, `Connected to database "${name}"`);
    await targetClient.end();
  } catch (error) {
    await targetClient.end().catch(() => {});
    if (error.message.includes('does not exist')) {
      console.log(`  ${WARN} Database "${name}" doesn't exist yet — npm start will create it automatically`);
    } else {
      check(false, '', `Could not connect to "${name}": ${error.message}`);
    }
  }

  printSummary();
}

function printSummary() {
  console.log('\n' + '='.repeat(40));
  if (failures === 0) {
    console.log(`${PASS} ALL CHECKS PASSED — run  npm start`);
  } else {
    console.log(`${FAIL} ${failures} check(s) failed — fix the issues above`);
  }
  console.log('='.repeat(40) + '\n');
}

runChecks().catch((err) => {
  console.error(`\n${FAIL} Unexpected error:`, err.message);
  process.exit(1);
});
