const jwt = require('jsonwebtoken');

// Clé secrète utilisée pour signer les tokens JWT
// Elle doit être définie dans le fichier .env pour des raisons de sécurité
const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key';

/**
 * Génère un token JWT avec une durée d'expiration de 24h
 * @param {object} payload - Les données à inclure dans le token (ex : { id, email })
 * @returns {string} - Le token JWT signé
 */
function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
}

module.exports = {
  generateToken,
};
