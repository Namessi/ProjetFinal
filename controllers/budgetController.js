const budgetModel = require('../models/budgetModel');

// Créer un budget
async function createBudget(req, res) {
  try {
    const { userId, category, amount, startDate, endDate } = req.body;
    const budgetId = await budgetModel.createBudget(userId, category, amount, startDate, endDate);
    res.status(201).json({ message: 'Budget créé', budgetId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir les budgets d’un utilisateur
async function getUserBudgets(req, res) {
  try {
    const userId = req.params.userId;
    const budgets = await budgetModel.getBudgetsByUserId(userId);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour un budget
async function updateBudget(req, res) {
  try {
    const budgetId = req.params.budgetId;
    const { category, amount, startDate, endDate } = req.body;
    await budgetModel.updateBudget(budgetId, category, amount, startDate, endDate);
    res.json({ message: 'Budget mis à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Supprimer un budget
async function deleteBudget(req, res) {
  try {
    const budgetId = req.params.budgetId;
    await budgetModel.deleteBudget(budgetId);
    res.json({ message: 'Budget supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createBudget,
  getUserBudgets,
  updateBudget,
  deleteBudget,
};
