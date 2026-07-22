const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes require authentication (but not admin role)
router.post('/', verifyToken, memberController.createMember);

module.exports = router;