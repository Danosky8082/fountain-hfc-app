// src/controllers/authController.js
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { churchId, password } = req.body;

    if (!churchId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Church ID and password are required.',
      });
    }

    const user = await prisma.user.findUnique({
      where: { churchId: churchId.trim() },
      include: {
        leading: true,
        assisting: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Church ID or password.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Church ID or password.',
      });
    }

    const fellowship = user.leading || user.assisting;
    if (!fellowship) {
      return res.status(403).json({
        success: false,
        message: 'This user is not assigned to any fellowship. Contact admin.',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        fellowshipId: fellowship.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        fellowship: {
          id: fellowship.id,
          name: fellowship.name,
          location: fellowship.location,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
};

// ✅ NEW: Get current user from token
exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        leading: true,
        assisting: true,
      },
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Determine which fellowship they belong to (leader or associate)
const fellowship = user.leading || user.assisting;

// ✅ Allow ADMIN and HOD to login without a fellowship
if (!fellowship && user.role !== 'ADMIN' && user.role !== 'HOD') {
  return res.status(403).json({
    success: false,
    message: 'This user is not assigned to any fellowship. Contact admin.',
  });
}

// 6. Generate JWT Token
const token = jwt.sign(
  {
    userId: user.id,
    role: user.role,
    fellowshipId: fellowship?.id || null, // null for ADMIN/HOD
  },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);