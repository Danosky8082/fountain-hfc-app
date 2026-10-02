// src/prisma.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

// ─── Startup marker (helps you confirm this file is actually deployed) ─
console.log('🔧 prisma.js loaded — retry wrapper active');

// ─── Validate DATABASE_URL early ────────────────────────────────
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set. Database connection will fail.');
}

// ─── Create the connection pool ────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  idleTimeoutMillis: 0,            // Disable idle reaping (works around Prisma pg adapter bug)
  connectionTimeoutMillis: 30000,  // Give the free DB time to wake up
  allowExitOnIdle: false,
});

// ─── Handle pool errors so a dead connection doesn't crash the process ─
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client:', err.message);
});

pool.on('connect', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔌 New PostgreSQL client connected');
  }
});

// ─── Create the Prisma adapter and client ──────────────────────
const adapter = new PrismaPg(pool);
const rawPrisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['error'],
});

// ─── Retry helper ──────────────────────────────────────────────
// Detects transient connection errors and retries with a fresh connection.
const TRANSIENT_ERROR_PATTERNS = [
  'Connection terminated unexpectedly',
  'Connection terminated',
  'ECONNRESET',
  'ETIMEDOUT',
  'EPIPE',
  'Client has encountered a connection error',
  'Server has closed the connection',
  'Timed out fetching a new connection',
  'Can\'t reach database server',
];

const isTransientError = (error) => {
  const msg = (error && error.message) || '';
  return TRANSIENT_ERROR_PATTERNS.some((p) => msg.includes(p));
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Run a Prisma operation with automatic retry on transient
 * connection failures. Retries up to `maxRetries` times with
 * exponential backoff.
 *
 * @param {Function} operation - async () => any
 * @param {Object}   opts
 * @param {number}   opts.maxRetries - default 3
 * @param {number}   opts.baseDelay  - ms, default 500
 */
const withRetry = async (operation, { maxRetries = 3, baseDelay = 500 } = {}) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isTransientError(error) || attempt === maxRetries) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1); // 500, 1000, 2000
      console.warn(
        `⚠️  Transient DB error (attempt ${attempt}/${maxRetries}): ` +
        `${error.message}. Retrying in ${delay}ms...`
      );

      // Force the pool to drop any dead clients before retrying
      try {
        await pool.query('SELECT 1');
      } catch {
        // ignore — the retry itself will establish a new connection
      }

      await sleep(delay);
    }
  }

  throw lastError;
};

// ─── Wrap Prisma's model methods with retry logic ──────────────
// We use a Proxy so every prisma.user.findUnique(), prisma.oTP.create(),
// etc. automatically goes through withRetry — no controller changes needed.
const RETRYABLE_METHODS = new Set([
  'findUnique', 'findUniqueOrThrow',
  'findFirst', 'findFirstOrThrow',
  'findMany', 'count', 'aggregate', 'groupBy',
  'create', 'createMany', 'update', 'updateMany', 'upsert',
  'delete', 'deleteMany',
  'queryRaw', 'executeRaw',
  '$queryRaw', '$executeRaw',
  '$transaction',
]);

const wrapModel = (model) => {
  return new Proxy(model, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);
      if (typeof original === 'function' && RETRYABLE_METHODS.has(prop)) {
        return (...args) => withRetry(() => original.apply(target, args));
      }
      return original;
    },
  });
};

const prisma = new Proxy(rawPrisma, {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);

    // Client-level methods ($connect, $disconnect, $queryRaw, ...)
    if (typeof value === 'function' && RETRYABLE_METHODS.has(prop)) {
      return (...args) => withRetry(() => value.apply(target, args));
    }

    // Model accessors (user, oTP, fellowship, member, ...) — wrap them
    if (
      value &&
      typeof value === 'object' &&
      !prop.startsWith('$') &&
      !prop.startsWith('_')
    ) {
      return wrapModel(value);
    }

    return value;
  },
});

// ─── Graceful shutdown ─────────────────────────────────────────
const shutdown = async (signal) => {
  console.log(`🛑 prisma.js received ${signal}, closing pool...`);
  try {
    await rawPrisma.$disconnect();
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