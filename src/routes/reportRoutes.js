// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// ─── Routes ──────────────────────────────────────────────────
// Get current report (or create one)
router.get('/current', reportController.getCurrentReport);

// Get all reports (HOD dashboard)
router.get('/all', reportController.getAllReports);

// Export CSV
router.get('/csv', reportController.exportCSV);

// Download PDF - This route should NOT use the verifyToken middleware
// because we handle authentication manually via query param
router.get('/:id/pdf', reportController.generatePDF);

// Get single report by ID
router.get('/:id', reportController.getReportById);

// Update report
router.put('/:id', reportController.updateReport);

module.exports = router;