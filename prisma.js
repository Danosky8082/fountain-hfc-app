// src/prisma.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

// ─── Build DATABASE_URL from Railway Variables ──────────────────
function buildDatabaseUrl() {
  // Check if DATABASE_URL is already set (preferred)
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Build from individual Railway PostgreSQL variables
  const host = process.env.PGHOST;
  const port = process.env.PGPORT;
  const user = process.env.PGUSER || process.env.POSTGRES_USER;
  const password = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD;
  const database = process.env.PGDATABASE || process.env.POSTGRES_DB;

  // Check if all required variables exist
  if (host && port && user && password && database) {
    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
  }

  // Fallback: check for DATABASE_URL one more time
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // If nothing works, throw an error
  throw new Error('Could not build DATABASE_URL. Please set DATABASE_URL environment variable.');
}

const databaseUrl = buildDatabaseUrl();
console.log(`✅ Database URL built successfully (host: ${process.env.PGHOST || 'from DATABASE_URL'})`);

// ─── Configure Pool with Railway settings ──────────────────────
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false, // Required for Railway
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxUses: 7500,
  allowExitOnIdle: true,
});

const adapter = new PrismaPg(pool);

// ─── Create Prisma Client ──────────────────────────────────────
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    adapter,
    log: ['error', 'warn'],
    errorFormat: 'pretty',
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter,
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });
  }
  prisma = global.prisma;
}

// ─── Test Connection ────────────────────────────────────────────
const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    const result = await prisma.$queryRaw`SELECT NOW() as current_time, version() as version`;
    console.log(`✅ Database version: ${result[0]?.version?.split(' ')[0] || 'unknown'}`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('📋 Connection details:', {
      host: process.env.PGHOST || 'using DATABASE_URL',
      database: process.env.PGDATABASE || 'using DATABASE_URL',
      ssl: 'enabled (rejectUnauthorized: false)',
    });
    return false;
  }
};

// ─── Graceful Shutdown ──────────────────────────────────────────
const gracefulShutdown = async () => {
  console.log('🛑 Shutting down database connections...');
  try {
    await prisma.$disconnect();
    await pool.end();
    console.log('✅ Database shutdown complete');
  } catch (error) {
    console.error('❌ Error during database shutdown:', error);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// ─── Exports ────────────────────────────────────────────────────
module.exports = {
  prisma,
  pool,
  testConnection,
  gracefulShutdown,
};

// Auto-connect on import
if (process.env.NODE_ENV !== 'test') {
  testConnection();
}

module.exports.default = prisma;





// // src/prisma.js
// const { PrismaClient } = require('@prisma/client');
// const { PrismaPg } = require('@prisma/adapter-pg');
// const { Pool } = require('pg');
// require('dotenv').config();

// // ─── Database Connection Configuration ─────────────────────
// const databaseUrl = process.env.DATABASE_URL;

// if (!databaseUrl) {
//   console.error('❌ DATABASE_URL is not defined in environment variables');
//   process.exit(1);
// }

// // ─── Configure Pool with better settings ──────────────────
// const pool = new Pool({
//   connectionString: databaseUrl,
//   ssl: {
//     rejectUnauthorized: false, // Required for Railway/PostgreSQL
//   },
//   max: 20, // Maximum number of clients in the pool
//   idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
//   connectionTimeoutMillis: 2000, // How long to wait for a connection
//   maxUses: 7500, // Close connections after this many uses (prevents memory leaks)
//   allowExitOnIdle: true, // Allow the pool to close connections when the app exits
// });

// // ─── Create Prisma Adapter ─────────────────────────────────
// const adapter = new PrismaPg(pool);

// // ─── Create Singleton Prisma Client ───────────────────────
// let prisma;

// if (process.env.NODE_ENV === 'production') {
//   // In production, create a new instance
//   prisma = new PrismaClient({
//     adapter,
//     log: ['error', 'warn'],
//     errorFormat: 'pretty',
//   });
// } else {
//   // In development, use a global variable to prevent multiple instances
//   // during hot reloading
//   if (!global.prisma) {
//     global.prisma = new PrismaClient({
//       adapter,
//       log: ['query', 'info', 'warn', 'error'],
//       errorFormat: 'pretty',
//     });
//   }
//   prisma = global.prisma;
// }

// // ─── Test Database Connection ──────────────────────────────
// const testConnection = async () => {
//   try {
//     await prisma.$connect();
//     console.log('✅ Database connected successfully');
    
//     // Test query to verify connection
//     const result = await prisma.$queryRaw`SELECT NOW() as current_time, version() as version`;
//     console.log(`✅ Database version: ${result[0]?.version?.split(' ')[0] || 'unknown'}`);
//     console.log(`✅ Database time: ${result[0]?.current_time || 'unknown'}`);
    
//     // Get database stats
//     const stats = await prisma.$queryRaw`
//       SELECT 
//         (SELECT COUNT(*) FROM "User") as users,
//         (SELECT COUNT(*) FROM "Fellowship") as fellowships,
//         (SELECT COUNT(*) FROM "Member") as members,
//         (SELECT COUNT(*) FROM "AttendanceSession") as sessions
//     `;
    
//     console.log('📊 Database stats:', {
//       users: parseInt(stats[0]?.users) || 0,
//       fellowships: parseInt(stats[0]?.fellowships) || 0,
//       members: parseInt(stats[0]?.members) || 0,
//       sessions: parseInt(stats[0]?.sessions) || 0,
//     });
    
//     return true;
//   } catch (error) {
//     console.error('❌ Database connection failed:', error.message);
//     console.error('❌ Please check your DATABASE_URL and network connectivity');
//     return false;
//   }
// };

// // ─── Connection Pool Event Handlers ──────────────────────
// pool.on('connect', () => {
//   console.log('🔌 New database client connected');
// });

// pool.on('acquire', () => {
//   // console.log('🔒 Database client acquired');
// });

// pool.on('remove', () => {
//   // console.log('🔓 Database client removed from pool');
// });

// pool.on('error', (err) => {
//   console.error('❌ Unexpected database pool error:', err);
// });

// // ─── Graceful Shutdown Handler ────────────────────────────
// const gracefulShutdown = async () => {
//   console.log('🛑 Shutting down database connections...');
  
//   try {
//     await prisma.$disconnect();
//     console.log('✅ Prisma client disconnected');
    
//     await pool.end();
//     console.log('✅ Database pool closed');
    
//     console.log('✅ Database shutdown complete');
//   } catch (error) {
//     console.error('❌ Error during database shutdown:', error);
//     process.exit(1);
//   }
// };

// // Handle process signals
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGINT', gracefulShutdown);
// process.on('beforeExit', gracefulShutdown);

// // ─── Utility Functions ─────────────────────────────────────

// // Check database health
// const checkDatabaseHealth = async () => {
//   try {
//     const startTime = Date.now();
//     await prisma.$queryRaw`SELECT 1`;
//     const endTime = Date.now();
    
//     return {
//       status: 'healthy',
//       responseTime: endTime - startTime,
//       timestamp: new Date().toISOString(),
//     };
//   } catch (error) {
//     return {
//       status: 'unhealthy',
//       error: error.message,
//       timestamp: new Date().toISOString(),
//     };
//   }
// };

// // Get database metrics
// const getDatabaseMetrics = async () => {
//   try {
//     const result = await prisma.$queryRaw`
//       SELECT 
//         (SELECT COUNT(*) FROM "User") as "users",
//         (SELECT COUNT(*) FROM "Fellowship") as "fellowships",
//         (SELECT COUNT(*) FROM "Member") as "members",
//         (SELECT COUNT(*) FROM "AttendanceSession") as "sessions",
//         (SELECT COUNT(*) FROM "AttendanceRecord") as "records",
//         (SELECT COUNT(*) FROM "MonthlyReport") as "reports"
//     `;
    
//     return {
//       users: parseInt(result[0]?.users) || 0,
//       fellowships: parseInt(result[0]?.fellowships) || 0,
//       members: parseInt(result[0]?.members) || 0,
//       sessions: parseInt(result[0]?.sessions) || 0,
//       records: parseInt(result[0]?.records) || 0,
//       reports: parseInt(result[0]?.reports) || 0,
//     };
//   } catch (error) {
//     console.error('❌ Failed to get database metrics:', error);
//     return null;
//   }
// };

// // ─── Transaction Helper ─────────────────────────────────────
// const transaction = async (callback) => {
//   try {
//     return await prisma.$transaction(async (tx) => {
//       return await callback(tx);
//     });
//   } catch (error) {
//     console.error('❌ Transaction failed:', error);
//     throw error;
//   }
// };

// // ─── Query Logger (Development Only) ─────────────────────
// const logQuery = (query, params) => {
//   if (process.env.NODE_ENV === 'development') {
//     console.log(`📝 Query: ${query}`);
//     console.log(`📊 Params:`, params);
//   }
// };

// // ─── Export Enhanced Prisma Client ──────────────────────
// module.exports = {
//   prisma,
//   pool,
//   testConnection,
//   checkDatabaseHealth,
//   getDatabaseMetrics,
//   transaction,
//   logQuery,
//   gracefulShutdown,
// };

// // ─── Auto-connect on import ──────────────────────────────
// // Test connection automatically when imported
// if (process.env.NODE_ENV !== 'test') {
//   testConnection();
// }

// // ─── Export prisma as default for backward compatibility ─
// module.exports.default = prisma;