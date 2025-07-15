const db = require('../db/connection');

// =====================================================
// Récupérer tous les utilisateurs (pour les admins)
// =====================================================
async function getAllUsers() {
  const [rows] = await db.query(`
    SELECT 
      users.id, 
      users.username, 
      users.email, 
      users.created_at,
      roles.nom_role AS role
    FROM users
    LEFT JOIN roles ON users.id_role = roles.id_role
    ORDER BY users.created_at DESC
  `);
  return rows;
}

// =====================================================
// Récupérer un utilisateur par son ID
// =====================================================
async function getUserById(userId) {
  const [rows] = await db.query(
    `SELECT 
      users.id, 
      users.username, 
      users.email, 
      users.created_at,
      roles.nom_role AS role
     FROM users
     LEFT JOIN roles ON users.id_role = roles.id_role
     WHERE users.id = ?`,
    [userId]
  );
  return rows[0];
}

// =====================================================
// Mettre à jour un utilisateur
// =====================================================
async function updateUser(userId, updateData) {
  const keys = Object.keys(updateData);
  const values = Object.values(updateData);

  if (keys.length === 0) throw new Error('Aucune donnée à mettre à jour');

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  values.push(userId);

  const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
  await db.query(sql, values);
}

// =====================================================
// Supprimer un utilisateur
// =====================================================
async function deleteUser(userId) {
  await db.query('DELETE FROM users WHERE id = ?', [userId]);
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
