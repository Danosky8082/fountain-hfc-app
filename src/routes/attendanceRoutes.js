// src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(verifyToken);

// ─── Routes ──────────────────────────────────────────────────
router.get('/current-session', attendanceController.getOrCreateCurrentSession);
router.post('/mark', attendanceController.markAttendance);  // ← This should be POST
router.post('/submit-week', attendanceController.submitWeek);

module.exports = router;