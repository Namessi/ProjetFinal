const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// Middleware général pour vérifier un token valide
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant, accès refusé' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }

    req.user = user; // contient : id, email, role
    next();
  });
}

// Middleware spécialisé : accès uniquement aux admins
function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé : admin uniquement' });
  }
  next();
}

module.exports = {
  authenticateToken,
  requireAdmin
};
