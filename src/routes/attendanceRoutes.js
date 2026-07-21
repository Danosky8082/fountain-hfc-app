// src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes protected by JWT
router.get('/current-session', verifyToken, attendanceController.getOrCreateCurrentSession);
router.post('/mark', verifyToken, attendanceController.markAttendance);
router.post('/submit-week', verifyToken, attendanceController.submitWeek);

module.exports = router;