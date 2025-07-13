// routes/category.js

const express = require('express');
const router = express.Router();

// Contrôleur pour la gestion des catégories
const categoryController = require('../controllers/categoryController');

// Middleware pour sécuriser les routes via JWT
const authenticateToken = require('../middleware/authMiddleware');

// =====================================================
// Créer une nouvelle catégorie
// URL : POST /api/categories/
// Accès : Authentifié uniquement
// Body attendu : { nom, type }
// =====================================================
router.post('/', authenticateToken, categoryController.createCategory);

// =====================================================
// Récupérer toutes les catégories d’un utilisateur
// URL : GET /api/categories/:userId
// Accès : Authentifié uniquement
// =====================================================
router.get('/:userId', authenticateToken, categoryController.getUserCategories);

// =====================================================
// Mettre à jour une catégorie
// URL : PUT /api/categories/:categoryId
// Accès : Authentifié uniquement
// Body attendu : { nom, type }
// =====================================================
router.put('/:categoryId', authenticateToken, categoryController.updateCategory);

// =====================================================
// Supprimer une catégorie
// URL : DELETE /api/categories/:categoryId
// Accès : Authentifié uniquement
// =====================================================
router.delete('/:categoryId', authenticateToken, categoryController.deleteCategory);

// Exportation du routeur
module.exports = router;
