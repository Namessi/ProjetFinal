const budgetModel = require('../models/budgetModel');

/**
 * Crée un nouveau budget pour un utilisateur
 * POST /api/budgets/
 * Body attendu : { category_id, amount, start_date }
 * L'ID utilisateur est extrait du token JWT (req.user.id)
 */
async function createBudget(req, res) {
  try {
    const user_id = req.user.id;
    const { category_id, amount, start_date } = req.body;

    console.log("📥 REQ.USER =", req.user);
    console.log("📥 BODY =", req.body);

    // Validation des champs obligatoires
    if (!category_id || !amount || !start_date) {
      return res.status(400).json({ message: 'Champs requis : catégorie, montant, date' });
    }

    // Appel au modèle pour créer le budget
    const budget_id = await budgetModel.createBudget(user_id, category_id, amount, start_date);

    res.status(201).json({ message: 'Budget créé', budget_id });
  } catch (error) {
    console.error('Erreur dans createBudget :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du budget' });
  }
}

/**
 * Récupère tous les budgets d’un utilisateur
 * GET /api/budgets/:userId
 */
async function getUserBudgets(req, res) {
  try {
    const user_id = req.params.userId;
    const budgets = await budgetModel.getBudgetsByUserId(user_id);
    res.json(budgets);
  } catch (error) {
    console.error('Erreur dans getUserBudgets :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des budgets' });
  }
}

/**
 * Met à jour un budget existant
 * PUT /api/budgets/:budgetId
 * Body attendu : { category_id, amount, start_date }
 */
async function updateBudget(req, res) {
  try {
    const budget_id = req.params.budgetId;
    const { category_id, amount, start_date } = req.body;

    // Validation des champs obligatoires
    if (!category_id || !amount || !start_date) {
      return res.status(400).json({ message: 'Champs requis : catégorie, montant, date' });
    }

    await budgetModel.updateBudget(budget_id, category_id, amount, start_date);
    res.json({ message: 'Budget mis à jour' });
  } catch (error) {
    console.error('Erreur dans updateBudget :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du budget' });
  }
}

/**
 * Supprime un budget
 * DELETE /api/budgets/:budgetId
 */
async function deleteBudget(req, res) {
  try {
    const budget_id = req.params.budgetId;
    await budgetModel.deleteBudget(budget_id);
    res.json({ message: 'Budget supprimé' });
  } catch (error) {
    console.error('Erreur dans deleteBudget :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du budget' });
  }
}

module.exports = {
  createBudget,
  getUserBudgets,
  updateBudget,
  deleteBudget,
};
