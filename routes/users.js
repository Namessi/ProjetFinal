const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Import des middlewares pour l'authentification et l'autorisation admin
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

// Debugging (peut être supprimé en production)
console.log('usersController.getAllUsers =', usersController.getAllUsers);
console.log('type =', typeof usersController.getAllUsers);

// =====================================================
// Récupérer tous les utilisateurs
// Route protégée, accessible uniquement aux admins
// Méthode : GET /api/users
// =====================================================
router.get('/', authenticateToken, requireAdmin, usersController.getAllUsers);

// =====================================================
// Récupérer un utilisateur par son ID
// Route protégée, accessible aux utilisateurs authentifiés
// Méthode : GET /api/users/:userId
// =====================================================
router.get('/:userId', authenticateToken, usersController.getUserById);

// =====================================================
// Mettre à jour le profil d’un utilisateur
// Route protégée, accessible aux utilisateurs authentifiés
// Méthode : PUT /api/users/:userId
// =====================================================
router.put('/:userId', authenticateToken, usersController.updateUser);

// =====================================================
// Supprimer un utilisateur
// Route protégée, accessible aux utilisateurs authentifiés
// Méthode : DELETE /api/users/:userId
// =====================================================
router.delete('/:userId', authenticateToken, usersController.deleteUser);

module.exports = router;
