const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Middleware d'authentification pour sécuriser les routes
const authenticateToken = require('../middleware/authMiddleware');

// Créer une nouvelle catégorie (protégé)
router.post('/', authenticateToken, categoryController.createCategory);

// Récupérer toutes les catégories d’un utilisateur (protégé)
router.get('/:userId', authenticateToken, categoryController.getUserCategories);

// Mettre à jour une catégorie (protégé)
router.put('/:categoryId', authenticateToken, categoryController.updateCategory);

// Supprimer une catégorie (protégé)
router.delete('/:categoryId', authenticateToken, categoryController.deleteCategory);

module.exports = router;

