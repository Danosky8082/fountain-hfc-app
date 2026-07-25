try {
  console.log('⏳ Loading app...');
  const app = require('./app');
  console.log('✅ App loaded.');

  // ─── Catch uncaught errors ──────────────────────────────
  process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection:', reason);
  });

  const PORT = process.env.PORT || 5000;
  console.log(`⏳ Starting server on port ${PORT}...`);

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // ─── Catch server errors ────────────────────────────────
  server.on('error', (err) => {
    console.error('❌ Server error:', err);
  });

} catch (error) {
  console.error('❌ Fatal error loading app:', error);
  process.exit(1);
}