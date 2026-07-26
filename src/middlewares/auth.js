const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-jwt-secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const roles = req.user.role || req.user.roles || req.user.authorities || [];
  const hasRole = Array.isArray(roles)
    ? roles.includes('admin') || roles.includes('ROLE_ADMIN')
    : roles === 'admin';
  if (hasRole) {
    next();
  } else {
    return res.status(403).json({ error: 'Admin access required' });
  }
};

// Higher-order function for role-based authorization
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const userRoles = req.user.role
    ? [req.user.role]
    : (req.user.roles || req.user.authorities || []);
  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));
  if (hasPermission) {
    return next();
  }
  return res.status(403).json({ error: 'Insufficient permissions' });
};

module.exports = {
  isAuthenticated,
  isAdmin,
  authenticateJWT: isAuthenticated,
  authorize,
};
