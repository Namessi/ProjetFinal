const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; // Nombre de rounds pour le hashage

/**
 * Hash un mot de passe en utilisant bcrypt
 * @param {string} password - Mot de passe en clair
 * @returns {Promise<string>} - Mot de passe hashé
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare un mot de passe en clair avec un hash bcrypt
 * @param {string} password - Mot de passe en clair
 * @param {string} hashedPassword - Mot de passe hashé en base
 * @returns {Promise<boolean>} - true si correspondance, false sinon
 */
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
