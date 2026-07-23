const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(verifyToken);

// ─── Routes ──────────────────────────────────────────────────
// Get current report (or create one)
router.get('/current', reportController.getCurrentReport);

// Get all reports (HOD dashboard)
router.get('/all', reportController.getAllReports);

// Export CSV
router.get('/csv', reportController.exportCSV);

// Download PDF
router.get('/:id/pdf', reportController.generatePDF);

// Update report – handles SAVE, FINALIZE, and RESET_TO_DRAFT via `action` field
router.put('/:id', reportController.updateReport);

module.exports = router;