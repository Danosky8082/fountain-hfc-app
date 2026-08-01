// src/middlewares/roleMiddleware.js

// ─── Check Role Middleware ──────────────────────────────
exports.checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized - No user context found' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Forbidden: ${req.user.role} role requires one of: ${roles.join(', ')}` 
      });
    }
    
    next();
  };
};

// ─── Require Role Middleware (alias for checkRole) ──────
exports.requireRole = (roles) => {
  return exports.checkRole(roles);
};