// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get token from the "Authorization" header (e.g., "Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Split "Bearer " and take the token

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data (id, role, fellowshipId) to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};

module.exports = { verifyToken };