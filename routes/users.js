const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Middleware pour vérifier que l'utilisateur est connecté (token JWT valide)
const authenticateToken = require('../middleware/authMiddleware');

// Récupérer le profil d’un utilisateur (protégé : accessible uniquement si connecté)
router.get('/:userId', authenticateToken, usersController.getUserById);

// Mettre à jour le profil d’un utilisateur (protégé)
router.put('/:userId', authenticateToken, usersController.updateUser);

// Supprimer un utilisateur (protégé)
router.delete('/:userId', authenticateToken, usersController.deleteUser);

module.exports = router;
