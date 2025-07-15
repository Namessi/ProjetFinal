// models/budgetModel.js

const db = require('../db/connection');

// Créer un budget
async function createBudget(user_id, category_id, amount, start_date) {
  const [result] = await db.query(
    'INSERT INTO budgets (user_id, category_id, amount, start_date) VALUES (?, ?, ?, ?)',
    [user_id, category_id, amount, start_date]
  );
  return result.insertId;
}

// Récupérer tous les budgets d’un utilisateur
async function getBudgetsByUserId(user_id) {
  const [rows] = await db.query(
    'SELECT * FROM budgets WHERE user_id = ?',
    [user_id]
  );
  return rows;
}

// Mettre à jour un budget existant
async function updateBudget(budget_id, category_id, amount, start_date) {
  await db.query(
    'UPDATE budgets SET category_id = ?, amount = ?, start_date = ? WHERE id_budget = ?',
    [category_id, amount, start_date, budget_id]
  );
}

// Supprimer un budget
async function deleteBudget(budget_id) {
  await db.query('DELETE FROM budgets WHERE id_budget = ?', [budget_id]);
}

module.exports = {
  createBudget,
  getBudgetsByUserId,
  updateBudget,
  deleteBudget,
};
