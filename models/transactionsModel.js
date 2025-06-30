const db = require('../db/connection');

// Récupérer toutes les transactions d’un utilisateur
async function getTransactionsByUserId(userId) {
  const [rows] = await db.query('SELECT * FROM transactions WHERE user_id = ?', [userId]);
  return rows;
}

// Récupérer une transaction par ID et utilisateur
async function getTransactionById(userId, transactionId) {
  const [rows] = await db.query('SELECT * FROM transactions WHERE id = ? AND user_id = ?', [transactionId, userId]);
  return rows[0];
}

// Créer une nouvelle transaction
async function createTransaction(userId, transactionData) {
  const { amount, category_id, date, description } = transactionData;
  const [result] = await db.query(
    `INSERT INTO transactions (user_id, amount, category_id, date, description) VALUES (?, ?, ?, ?, ?)`,
    [userId, amount, category_id, date, description]
  );
  return result.insertId;
}

// Mettre à jour une transaction existante
async function updateTransaction(userId, transactionId, updateData) {
  const keys = Object.keys(updateData);
  const values = Object.values(updateData);

  if (keys.length === 0) throw new Error('Aucune donnée à mettre à jour');

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  values.push(userId, transactionId);

  const sql = `UPDATE transactions SET ${setClause} WHERE user_id = ? AND id = ?`;
  await db.query(sql, values);
}

// Supprimer une transaction
async function deleteTransaction(userId, transactionId) {
  await db.query('DELETE FROM transactions WHERE user_id = ? AND id = ?', [userId, transactionId]);
}

module.exports = {
  getTransactionsByUserId,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
