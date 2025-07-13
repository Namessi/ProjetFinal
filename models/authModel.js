// models/authModel.js
const db = require('../db/connection');

/**
 * Crée un utilisateur avec les bons champs : username, email, password
 */
async function createUser(username, email, hashedPassword) {
  const sql = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(sql, [username, email, hashedPassword]);
  return result.insertId;
}

/**
 * Cherche un utilisateur par e-mail
 */
async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail,
};
