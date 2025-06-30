// models/auth/authModel.js

const db = require('../db/connection'); // Connexion MySQL

// 🔎 Obtenir un utilisateur par son email
async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]); // Retourne l'utilisateur (ou undefined)
    });
  });
}

// ➕ Créer un nouvel utilisateur
async function createUser(username, email, hashedPassword) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId); // Retourne l'ID du nouvel utilisateur
    });
  });
}

module.exports = {
  getUserByEmail,
  createUser,
};
