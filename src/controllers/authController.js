// src/controllers/authController.js
const prisma = require('../prisma'); // <-- FIXED: using shared instance
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { churchId, password } = req.body;

    // 1. Validate input
    if (!churchId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Church ID and password are required.',
      });
    }

    // 2. Find the user in the database by churchId
    const user = await prisma.user.findUnique({
      where: { churchId: churchId.trim() },
      include: {
        leading: true,   // Get the fellowship they lead (if any)
        assisting: true, // Get the fellowship they assist (if any)
      },
    });

    // 3. If user doesn't exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Church ID or password.',
      });
    }

    // 4. Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Church ID or password.',
      });
    }

    // 5. Determine which fellowship they belong to (leader or associate)
    const fellowship = user.leading || user.assisting;
    if (!fellowship) {
      return res.status(403).json({
        success: false,
        message: 'This user is not assigned to any fellowship. Contact admin.',
      });
    }

    // 6. Generate JWT Token (expires in 7 days)
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        fellowshipId: fellowship.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 7. Send success response (exclude password hash)
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