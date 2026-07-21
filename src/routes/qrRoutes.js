const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Protected route – only logged-in users can generate QR
router.get('/member/:memberId', verifyToken, qrController.generateMemberQR);

module.exports = router;