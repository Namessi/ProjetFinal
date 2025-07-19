const db = require('../db/connection');

// =====================================================
// Ajouter une récompense ou des points
// =====================================================
async function addReward(userId, rewardData) {
  const { points, type, description } = rewardData;

  const [result] = await db.query(
    `INSERT INTO rewards (user_id, points, type, description)
     VALUES (?, ?, ?, ?)`,
    [userId, points, type, description]
  );

  return result.insertId;
}

// =====================================================
// Récupérer les récompenses d’un utilisateur
// =====================================================
async function getRewardsByUserId(userId) {
  const [rows] = await db.query(
    `SELECT * FROM rewards WHERE user_id = ? ORDER BY earned_at DESC`,
    [userId]
  );
  return rows;
}

// =====================================================
// Supprimer une récompense par ID
// =====================================================
async function deleteRewardById(rewardId) {
  const [result] = await db.query(
    `DELETE FROM rewards WHERE id = ?`,
    [rewardId]
  );
  return result;
}

module.exports = {
  addReward,
  getRewardsByUserId,
  deleteRewardById,
};
