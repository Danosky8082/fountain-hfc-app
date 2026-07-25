const app = require('./app');

// ─── Catch uncaught errors (helps debug crashes) ──────────────
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}