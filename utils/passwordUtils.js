const bcrypt = require('bcrypt');

// Nombre de tours pour le sel bcrypt (plus il est élevé, plus c'est sécurisé mais lent)
const SALT_ROUNDS = 10;

/**
 * Hash un mot de passe en clair
 * @param {string} password - Mot de passe fourni par l'utilisateur
 * @returns {Promise<string>} - Mot de passe hashé avec bcrypt
 */
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare un mot de passe en clair avec son hash
 * @param {string} password - Mot de passe entré par l'utilisateur
 * @param {string} hashedPassword - Mot de passe déjà hashé (depuis la base de données)
 * @returns {Promise<boolean>} - true si les deux correspondent, sinon false
 */
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
