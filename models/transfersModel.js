const db = require('../db/connection');

// =====================================================
// Créer un nouveau transfert
// =====================================================
async function createTransfer({ sender_id, recipient_id, amount, type, transaction_id, message }) {
  const [result] = await db.query(
    `INSERT INTO transfers (sender_id, recipient_id, amount, type, transaction_id, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [sender_id, recipient_id, amount, type, transaction_id, message]
  );
  return result.insertId;
}

// =====================================================
// Récupérer tous les transferts d’un utilisateur
// =====================================================
async function getTransfersByUser(user_id) {
  const [rows] = await db.query(
    `SELECT * FROM transfers 
     WHERE sender_id = ? OR recipient_id = ?
     ORDER BY created_at DESC`,
    [user_id, user_id]
  );
  return rows;
}

// =====================================================
// Supprimer un transfert par son ID
// =====================================================
async function deleteTransfer(transfer_id) {
  const [result] = await db.query(
    'DELETE FROM transfers WHERE id = ?',
    [transfer_id]
  );
  return result;
}

module.exports = {
  createTransfer,
  getTransfersByUser,
  deleteTransfer
};
