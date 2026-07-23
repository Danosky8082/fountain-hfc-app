const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(verifyToken);

// ─── Routes ──────────────────────────────────────────────────
router.get('/current', reportController.getCurrentReport);
router.get('/all', reportController.getAllReports);
router.get('/csv', reportController.exportCSV);
router.get('/:id/pdf', reportController.generatePDF);

// Update report – handles SAVE, FINALIZE, and RESET_TO_DRAFT via `action` field
router.put('/:id', reportController.updateReport);

module.exports = router;