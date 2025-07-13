// models/transactionsModel.js

const db = require('../db/connection');

// =====================================================
// Récupérer toutes les transactions d’un utilisateur
// =====================================================
async function getTransactionsByUserId(user_id) {
  const [rows] = await db.query(
    'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC',
    [user_id]
  );
  return rows;
}

// =====================================================
// Récupérer une transaction spécifique par ID
// =====================================================
async function getTransactionById(user_id, transaction_id) {
  const [rows] = await db.query(
    'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
    [transaction_id, user_id]
  );
  return rows[0]; // une seule transaction
}

// =====================================================
// Créer une nouvelle transaction
// transactionData = { amount, category_id, date, description }
// =====================================================
async function createTransaction(user_id, transactionData) {
  const { amount, category_id, date, description } = transactionData;
  const [result] = await db.query(
    `INSERT INTO transactions (user_id, amount, category_id, date, description) 
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, amount, category_id, date, description]
  );
  return result.insertId;
}

// =====================================================
// Mettre à jour une transaction
// updateData = { amount, description, ... }
// =====================================================
async function updateTransaction(user_id, transaction_id, updateData) {
  const keys = Object.keys(updateData);
  const values = Object.values(updateData);

  if (keys.length === 0) throw new Error('Aucune donnée à mettre à jour');

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  values.push(user_id, transaction_id);

  const sql = `UPDATE transactions SET ${setClause} WHERE user_id = ? AND id = ?`;
  await db.query(sql, values);
}

// =====================================================
// Supprimer une transaction
// =====================================================
async function deleteTransaction(user_id, transaction_id) {
  await db.query(
    'DELETE FROM transactions WHERE user_id = ? AND id = ?',
    [user_id, transaction_id]
  );
}

module.exports = {
  getTransactionsByUserId,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
