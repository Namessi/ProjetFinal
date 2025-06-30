const db = require('../db/connection');

// Créer un budget
async function createBudget(userId, category, amount, startDate, endDate) {
  const [result] = await db.query(
    'INSERT INTO budgets (user_id, category, amount, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
    [userId, category, amount, startDate, endDate]
  );
  return result.insertId;
}

// Récupérer tous les budgets d’un utilisateur
async function getBudgetsByUserId(userId) {
  const [rows] = await db.query('SELECT * FROM budgets WHERE user_id = ?', [userId]);
  return rows;
}

// Mettre à jour un budget
async function updateBudget(budgetId, category, amount, startDate, endDate) {
  await db.query(
    'UPDATE budgets SET category = ?, amount = ?, start_date = ?, end_date = ? WHERE id = ?',
    [category, amount, startDate, endDate, budgetId]
  );
}

// Supprimer un budget
async function deleteBudget(budgetId) {
  await db.query('DELETE FROM budgets WHERE id = ?', [budgetId]);
}

module.exports = {
  createBudget,
  getBudgetsByUserId,
  updateBudget,
  deleteBudget,
};
