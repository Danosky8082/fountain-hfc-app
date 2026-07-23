const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/login', authController.login); // password login (HOD/ADMIN)
router.post('/request-otp', authController.requestOTP);
router.post('/verify-otp', authController.verifyOTP);
router.get('/me', verifyToken, authController.getMe);

module.exports = router;