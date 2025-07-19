const db = require('../db/connection');

// =====================================================
// Récupérer les infos publiques d’un utilisateur via son ID
// Utilisé pour vérifier un QR code décodé
// =====================================================
async function getUserInfoById(id_user) {
  const [rows] = await db.query(
    `SELECT id, username, email, birth_date FROM users WHERE id = ?`,
    [id_user]
  );

  return rows[0];
}

module.exports = {
  getUserInfoById,
};
