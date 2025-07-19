const db = require('../db/connection');

// =====================================================
// Créer un nouveau rechargement
// =====================================================
async function createTopup(userId, amount, method) {
  const [result] = await db.query(
    `INSERT INTO topups (user_id, amount, method)
     VALUES (?, ?, ?)`,
    [userId, amount, method]
  );
  return result.insertId;
}

// =====================================================
// Récupérer l’historique des rechargements d’un utilisateur
// =====================================================
async function getTopupHistory(userId) {
  const [rows] = await db.query(
    `SELECT * FROM topups WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

// =====================================================
// Supprimer un rechargement
// =====================================================
async function deleteTopup(userId, topupId) {
  const [result] = await db.query(
    `DELETE FROM topups WHERE user_id = ? AND id = ?`,
    [userId, topupId]
  );
  return result;
}

module.exports = {
  createTopup,
  getTopupHistory,
  deleteTopup,
};
