// src/routes/fellowshipRoutes.js
const express = require('express');
const router = express.Router();
const fellowshipController = require('../controllers/fellowshipController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

// ─── All routes are protected ──────────────────────────
router.use(verifyToken);

// ─── Public Fellowship Routes (for all authenticated users) ──
router.get('/members', fellowshipController.getMembers);
router.get('/details', fellowshipController.getFellowshipDetails);
router.get('/list', fellowshipController.getAllFellowships);

// ─── Admin Only Routes ──────────────────────────────────
router.post('/', checkRole(['ADMIN']), fellowshipController.createFellowship);
router.put('/:id', checkRole(['ADMIN']), fellowshipController.updateFellowship);
router.delete('/:id', checkRole(['ADMIN']), fellowshipController.deleteFellowship);

// ─── Stats Route (Admin & HOD) ─────────────────────────
router.get('/:fellowshipId/stats', checkRole(['ADMIN', 'HOD']), fellowshipController.getFellowshipStats);

module.exports = router;