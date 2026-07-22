// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes protected by JWT
router.get('/current', verifyToken, reportController.getCurrentReport);
router.put('/:id', verifyToken, reportController.updateReport);
router.get('/all', verifyToken, reportController.getAllReports);
router.get('/:id/pdf', verifyToken, reportController.generatePDF);
router.get('/csv', verifyToken, reportController.exportCSV);

module.exports = router;