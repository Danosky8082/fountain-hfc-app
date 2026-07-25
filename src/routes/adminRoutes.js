const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const qrController = require('../controllers/qrController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

// All admin routes require authentication and ADMIN role
router.use(verifyToken);
router.use(requireRole(['ADMIN']));

// ─── Users ──────────────────────────────────────────────────────
router.get('/users', adminController.getUsersByRole);
router.post('/user', adminController.createUser);
router.put('/user/:id', adminController.updateUserRole);

// ─── Fellowships ──────────────────────────────────────────────
router.post('/fellowship', adminController.createFellowship);
router.get('/fellowships', adminController.getAllFellowships);
router.put('/fellowship/:id', adminController.updateFellowship);
router.delete('/fellowship/:id', adminController.deleteFellowship);

// ─── Members ──────────────────────────────────────────────────
router.post('/member', adminController.createMember);
router.get('/members', adminController.getAllMembers);
router.put('/member/:id', adminController.updateMember);
router.delete('/member/:id', adminController.deleteMember);

// ─── Attendance Correction ───────────────────────────────────
router.post('/attendance/correct', adminController.correctAttendance);

// ─── Batch QR ────────────────────────────────────────────────
router.get('/qr/batch', qrController.generateBatchQR);

router.get('/export/all', adminController.verifyAdmin, require('../controllers/exportController').exportAllData);
// or use requireRole(['ADMIN']) – we already have that middleware
router.get('/export/all', requireRole(['ADMIN']), require('../controllers/exportController').exportAllData);

module.exports = router;