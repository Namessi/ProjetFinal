const express = require('express');
const router = express.Router();

// Contrôleur dédié à la gestion des budgets
const budgetController = require('../controllers/budgetController');

// Import du middleware
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Créer un nouveau budget
// URL : POST /api/budgets/
// Accès : Authentifié uniquement
// =====================================================
router.post('/', authenticateToken, budgetController.createBudget);

// =====================================================
// Obtenir tous les budgets d’un utilisateur
// URL : GET /api/budgets/:userId
// Accès : Authentifié uniquement
// =====================================================
router.get('/:userId', authenticateToken, budgetController.getUserBudgets);

// =====================================================
// Mettre à jour un budget existant
// URL : PUT /api/budgets/:budgetId
// Accès : Authentifié uniquement
// =====================================================
router.put('/:budgetId', authenticateToken, budgetController.updateBudget);

// =====================================================
// Supprimer un budget
// URL : DELETE /api/budgets/:budgetId
// Accès : Authentifié uniquement
// =====================================================
router.delete('/:budgetId', authenticateToken, budgetController.deleteBudget);

// Exportation du routeur
module.exports = router;
