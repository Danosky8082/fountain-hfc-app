const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All admin routes require authentication and admin role
router.use(verifyToken);

router.post('/fellowship', adminController.createFellowship);
router.post('/member', adminController.createMember);
router.get('/users', adminController.getUsersByRole);

router.get('/members', adminController.getAllMembers);

module.exports = router;