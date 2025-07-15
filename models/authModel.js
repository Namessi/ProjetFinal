const db = require('../db/connection');

async function findUserByEmail(email) {
  const [rows] = await db.query(
    `SELECT u.id, u.username, u.email, u.password, r.nom_role AS role
     FROM users u
     LEFT JOIN roles r ON u.id_role = r.id_role
     WHERE u.email = ?`,
    [email]
  );
  return rows[0];
}

async function createUser(username, email, hashedPassword) {
  const [result] = await db.query(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashedPassword]
  );
  return result.insertId;
}

module.exports = {
  findUserByEmail,
  createUser,
};
