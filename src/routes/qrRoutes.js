const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

// Public route with token query param (no middleware, we verify inside)
router.get('/member/:memberId', qrController.generateMemberQR);

module.exports = router;