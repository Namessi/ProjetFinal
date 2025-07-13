// controllers/budgetController.js

const budgetModel = require('../models/budgetModel');

// =====================================================
// Créer un budget
// Body attendu : { id_categorie, montant, periode }
// L’ID utilisateur est extrait du token (middleware JWT)
// =====================================================
async function createBudget(req, res) {
  try {
    const id_user = req.user.id_user; // récupéré via le middleware authenticateToken
    const { id_categorie, montant, periode } = req.body;

    if (!id_categorie || !montant || !periode) {
      return res.status(400).json({ message: 'Champs requis : catégorie, montant, période' });
    }

    const budgetId = await budgetModel.createBudget(id_user, id_categorie, montant, periode);
    res.status(201).json({ message: 'Budget créé', budgetId });
  } catch (error) {
    console.error('Erreur dans createBudget :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du budget' });
  }
}

// =====================================================
// Obtenir tous les budgets d’un utilisateur
// L’ID utilisateur est passé en paramètre d’URL
// =====================================================
async function getUserBudgets(req, res) {
  try {
    const id_user = req.params.userId;
    const budgets = await budgetModel.getBudgetsByUserId(id_user);
    res.json(budgets);
  } catch (error) {
    console.error('Erreur dans getUserBudgets :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des budgets' });
  }
}

// =====================================================
// Mettre à jour un budget
// Body attendu : { id_categorie, montant, periode }
// =====================================================
async function updateBudget(req, res) {
  try {
    const id_budget = req.params.budgetId;
    const { id_categorie, montant, periode } = req.body;

    if (!id_categorie || !montant || !periode) {
      return res.status(400).json({ message: 'Champs requis : catégorie, montant, période' });
    }

    await budgetModel.updateBudget(id_budget, id_categorie, montant, periode);
    res.json({ message: 'Budget mis à jour' });
  } catch (error) {
    console.error('Erreur dans updateBudget :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du budget' });
  }
}

// =====================================================
// Supprimer un budget
// =====================================================
async function deleteBudget(req, res) {
  try {
    const id_budget = req.params.budgetId;
    await budgetModel.deleteBudget(id_budget);
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
