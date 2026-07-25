// index.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

console.log('⏳ Loading app...');

try {
  const app = require('./app');
  console.log('✅ App loaded.');

  // ─── Catch uncaught errors ──────────────────────────────
  process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    // Log to file or monitoring service
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection:', reason);
    // Log to file or monitoring service
  });

  // ─── Graceful shutdown ──────────────────────────────────
  process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM signal, shutting down gracefully...');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT signal, shutting down gracefully...');
    process.exit(0);
  });

  const PORT = process.env.PORT || 5000;
  console.log(`⏳ Starting server on port ${PORT}...`);

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
  });

  // ─── Catch server errors ────────────────────────────────
  server.on('error', (err) => {
    console.error('❌ Server error:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use`);
      process.exit(1);
    }
  });

  // ─── Keep-alive for Railway ─────────────────────────────
  // Railway expects the server to respond to health checks
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

} catch (error) {
  console.error('❌ Fatal error loading app:', error);
  console.error(error.stack);
  process.exit(1);
}