// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

// ─── Verify Token Middleware ──────────────────────────────
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database with relations
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        leading: true,
        assisting: true
      }
    });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Please login again.',
        code: 'USER_NOT_FOUND'
      });
    }

    // Check if user is active (if you have this field)
    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Check if user is blocked (optional)
    if (user.isBlocked === true) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked. Please contact support.',
        code: 'ACCOUNT_BLOCKED'
      });
    }

    // Add complete user object to request
    req.user = {
      userId: user.id,
      churchId: user.churchId,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      fellowshipId: user.leading?.id || user.assisting?.id || null,
      leadingFellowshipId: user.leading?.id || null,
      assistingFellowshipId: user.assisting?.id || null,
      // Include additional user data
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // Include full user object if needed
      _raw: user
    };

    // Log successful authentication
    console.log(`✅ User authenticated: ${user.email} (${user.role})`);

    next();
  } catch (error) {
    console.error('❌ Auth Middleware Error:', error);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
        code: 'INVALID_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      code: 'AUTH_FAILED',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Optional: Verify Token Sync Version ──────────────────
// If you need a synchronous version (for performance)
const verifyTokenSync = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ Auth Middleware Error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
        code: 'INVALID_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.',
      code: 'INVALID_TOKEN'
    });
  }
};

// ─── Optional: Extract Token Helper ──────────────────────
const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

// ─── Optional: Verify Token and Get User ──────────────────
const verifyAndGetUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        leading: true,
        assisting: true
      }
    });
    return user;
  } catch (error) {
    console.error('❌ Verify and Get User Error:', error);
    return null;
  }
};

// ─── Optional: Refresh Token Middleware ──────────────────
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token required',
        code: 'REFRESH_TOKEN_REQUIRED'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { 
        userId: user.id,
        role: user.role,
        fellowshipId: user.leading?.id || user.assisting?.id || null
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const newRefreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      }
    });

  } catch (error) {
    console.error('❌ Refresh Token Error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
        code: 'INVALID_REFRESH_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired. Please login again.',
        code: 'REFRESH_TOKEN_EXPIRED'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to refresh token',
      code: 'REFRESH_FAILED'
    });
  }
};

// ─── Export all middleware ───────────────────────────────
module.exports = { 
  verifyToken,
  verifyTokenSync,
  extractToken,
  verifyAndGetUser,
  refreshToken
};