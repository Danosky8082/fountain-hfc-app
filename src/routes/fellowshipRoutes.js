// src/routes/fellowshipRoutes.js
const express = require('express');
const router = express.Router();
const fellowshipController = require('../controllers/fellowshipController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes here are protected by the verifyToken middleware
// The user must be logged in with a valid JWT.

// GET /api/fellowship/members - List all members in the FL's fellowship
router.get('/members', verifyToken, fellowshipController.getMembers);

// GET /api/fellowship/details - Get fellowship info (name, location)
router.get('/details', verifyToken, fellowshipController.getFellowshipDetails);

module.exports = router;