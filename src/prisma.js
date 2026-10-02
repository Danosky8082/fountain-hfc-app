// src/prisma.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

// ─── Validate DATABASE_URL early ────────────────────────────────
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set. Database connection will fail.');
}

// ─── Create the connection pool with lifecycle settings ────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // Keep the pool small on Render's free tier (512MB RAM, 1 CPU)
  max: 5,

  // Close idle connections after 10s. This MUST be shorter than
  // your database provider's server-side idle timeout, otherwise
  // the server kills connections while the pool still thinks
  // they're alive — which is what caused the
  // "Connection terminated unexpectedly" crash on spin-up.
  idleTimeoutMillis: 10000,

  // Fail fast (10s) if the database is unreachable, instead of
  // hanging the request indefinitely.
  connectionTimeoutMillis: 10000,

  // Allow the Node process to exit cleanly when the pool is idle.
  // Important on Render so restarts/spin-downs don't hang.
  allowExitOnIdle: true,
});

// ─── Handle pool errors so a dead connection doesn't crash ─────
// Without this listener, an error on an idle client is an
// unhandled 'error' event, which terminates the whole Node process.
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client:', err.message);
  // The pool automatically removes broken connections.
  // Just log here — don't rethrow.
});

// ─── Optional: log when a new connection is established ────────
pool.on('connect', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔌 New PostgreSQL client connected');
  }
});

// ─── Create the Prisma adapter and client ──────────────────────
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['error'], // Only log errors in production to keep logs clean
});

// ─── Graceful shutdown ─────────────────────────────────────────
// Ensures connections are released on SIGTERM/SIGINT (Render sends
// SIGTERM on redeploys and spin-downs).
const shutdown = async (signal) => {
  console.log(`🛑 prisma.js received ${signal}, closing pool...`);
  try {
    await prisma.$disconnect();
    await pool.end();
    console.log('✅ Prisma and pool closed cleanly');
  } catch (err) {
    console.error('❌ Error during prisma shutdown:', err.message);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ─── Export ────────────────────────────────────────────────────
module.exports = prisma;