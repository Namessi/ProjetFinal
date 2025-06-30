const jwt = require('jsonwebtoken');

// Clé secrète pour signer les tokens JWT, à déplacer en variable d'environnement pour plus de sécurité
const SECRET_KEY = process.env.JWT_SECRET || 'ta_cle_secrete_pour_jwt';

/**
 * Génère un token JWT avec une durée d'expiration de 24h
 * @param {object} payload - Objet avec les données à encoder (ex: id, email)
 * @returns {string} - Token JWT signé
 */
function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
}

module.exports = {
  generateToken,
};
