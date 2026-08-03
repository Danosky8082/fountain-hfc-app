// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middlewares/authMiddleware');

// ─── Routes ──────────────────────────────────────────────────

// Get current report (or create one) - Requires authentication
router.get('/current', verifyToken, reportController.getCurrentReport);

// Get all reports (HOD dashboard) - Requires authentication
router.get('/all', verifyToken, reportController.getAllReports);

// Export CSV - Requires authentication
router.get('/csv', verifyToken, reportController.exportCSV);

// Download PDF - NO middleware, handles auth manually via query param
router.get('/:id/pdf', reportController.generatePDF);

// Get single report by ID - Requires authentication
router.get('/:id', verifyToken, reportController.getReportById);

// Update report - Requires authentication
router.put('/:id', verifyToken, reportController.updateReport);

module.exports = router;