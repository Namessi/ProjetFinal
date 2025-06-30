const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Middleware d'authentification pour sécuriser les routes
const authenticateToken = require('../middleware/authMiddleware');

// Récupérer les paramètres d’un utilisateur (protégé)
router.get('/:userId', authenticateToken, settingsController.getUserSettings);

// Mettre à jour les paramètres d’un utilisateur (protégé)
router.put('/:userId', authenticateToken, settingsController.updateUserSettings);

module.exports = router;
