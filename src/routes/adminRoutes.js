const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

// All admin routes require authentication and ADMIN role
router.use(verifyToken);
router.use(requireRole(['ADMIN']));

// User management
router.get('/users', adminController.getUsersByRole);
router.post('/user', adminController.createUser);
router.put('/member/:id', adminController.updateMember);
router.delete('/member/:id', adminController.deleteMember);

// Fellowship management
router.post('/fellowship', adminController.createFellowship);

// Member management
router.post('/member', adminController.createMember);
router.get('/members', adminController.getAllMembers);

router.get('/fellowships', adminController.getAllFellowships);
router.put('/fellowship/:id', adminController.updateFellowship);
router.delete('/fellowship/:id', adminController.deleteFellowship);

module.exports = router;