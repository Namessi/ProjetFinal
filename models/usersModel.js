const db = require('../db/connection');

// Récupérer un utilisateur par son ID
async function getUserById(userId) {
  const [rows] = await db.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [userId]);
  return rows[0];
}

// Mettre à jour un utilisateur (les champs à mettre à jour sont dans updateData)
async function updateUser(userId, updateData) {
  const keys = Object.keys(updateData);
  const values = Object.values(updateData);

  if (keys.length === 0) throw new Error('Aucune donnée à mettre à jour');

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  values.push(userId);

  const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
  await db.query(sql, values);
}

// Supprimer un utilisateur par son ID
async function deleteUser(userId) {
  await db.query('DELETE FROM users WHERE id = ?', [userId]);
}

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};
