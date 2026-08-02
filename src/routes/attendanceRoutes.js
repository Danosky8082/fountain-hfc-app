// src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken } = require('../middlewares/authMiddleware');

// ─── All routes require authentication ───
router.use(verifyToken);

// ─── Routes ──────────────────────────────────────────────────
// Get current session (GET)
router.get('/current-session', attendanceController.getOrCreateCurrentSession);

// Mark attendance (POST) - THIS IS THE ROUTE THAT'S MISSING
router.post('/mark', attendanceController.markAttendance);

// Submit week (POST)
router.post('/submit-week', attendanceController.submitWeek);

// ─── Export the router ───
module.exports = router;