// models/budgetModel.js

const db = require('../db/connection');

// =====================================================
// Créer un budget
// Reçoit : ID utilisateur, ID catégorie, montant, période (mois ciblé)
// =====================================================
async function createBudget(id_user, id_categorie, montant, periode) {
  const [result] = await db.query(
    'INSERT INTO budgets (id_user, id_categorie, montant, periode) VALUES (?, ?, ?, ?)',
    [id_user, id_categorie, montant, periode]
  );
  return result.insertId;
}

// =====================================================
// Récupérer tous les budgets d’un utilisateur
// =====================================================
async function getBudgetsByUserId(id_user) {
  const [rows] = await db.query(
    'SELECT * FROM budgets WHERE id_user = ?',
    [id_user]
  );
  return rows;
}

// =====================================================
// Mettre à jour un budget existant
// =====================================================
async function updateBudget(id_budget, id_categorie, montant, periode) {
  await db.query(
    'UPDATE budgets SET id_categorie = ?, montant = ?, periode = ? WHERE id_budget = ?',
    [id_categorie, montant, periode, id_budget]
  );
}

// =====================================================
// Supprimer un budget
// =====================================================
async function deleteBudget(id_budget) {
  await db.query('DELETE FROM budgets WHERE id_budget = ?', [id_budget]);
}

module.exports = {
  createBudget,
  getBudgetsByUserId,
  updateBudget,
  deleteBudget,
};
