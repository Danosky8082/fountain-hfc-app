const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const qrController = require('../controllers/qrController');

// All admin routes require authentication and ADMIN role
router.use(verifyToken);
router.use(requireRole(['ADMIN']));

// ─── User management ────────────────────────────────────────────
router.get('/users', adminController.getUsersByRole);
router.post('/user', adminController.createUser);
router.put('/user/:id', adminController.updateUserRole); // already exists

// ─── Fellowship management ──────────────────────────────────────
router.post('/fellowship', adminController.createFellowship);
router.get('/fellowships', adminController.getAllFellowships);
router.put('/fellowship/:id', adminController.updateFellowship);
router.delete('/fellowship/:id', adminController.deleteFellowship);

// ─── Member management ──────────────────────────────────────────
router.post('/member', adminController.createMember);
router.get('/members', adminController.getAllMembers);
router.put('/member/:id', adminController.updateMember);
router.delete('/member/:id', adminController.deleteMember);

// ─── Attendance correction ──────────────────────────────────────
router.post('/attendance/correct', adminController.correctAttendance);

// ─── Batch QR generation ────────────────────────────────────────
// (Already protected by ADMIN middleware above)
router.get('/qr/batch', qrController.generateBatchQR);

module.exports = router;