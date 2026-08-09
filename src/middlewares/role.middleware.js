const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ 
        error: `Acceso denegado. Se requiere rol: [${allowedRoles.join(', ')}].` 
      });
    }
    next();
  };
};

module.exports = { requireRole };