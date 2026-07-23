const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(verifyToken);

router.get('/current-session', attendanceController.getOrCreateCurrentSession);
router.post('/mark', attendanceController.markAttendance);
router.post('/submit-week', attendanceController.submitWeek);

module.exports = router;