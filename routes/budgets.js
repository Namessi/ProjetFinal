const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Middleware d'authentification pour sécuriser les routes
const authenticateToken = require('../middleware/authMiddleware');

// Créer un nouveau budget (protégé)
router.post('/', authenticateToken, budgetController.createBudget);

// Obtenir tous les budgets d’un utilisateur (protégé)
router.get('/:userId', authenticateToken, budgetController.getUserBudgets);

// Mettre à jour un budget existant (protégé)
router.put('/:budgetId', authenticateToken, budgetController.updateBudget);

// Supprimer un budget (protégé)
router.delete('/:budgetId', authenticateToken, budgetController.deleteBudget);

module.exports = router;

