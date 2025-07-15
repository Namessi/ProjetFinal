const express = require('express');
const router = express.Router();

// Contrôleur pour la gestion des paramètres utilisateurs
const settingsController = require('../controllers/settingsController');

// Import du middleware d'authentification
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Obtenir les paramètres d’un utilisateur
// Méthode : GET
// URL : /api/settings/:userId
// Accès : Authentifié uniquement
// =====================================================
router.get('/:userId', authenticateToken, settingsController.getUserSettings);

// =====================================================
// Mettre à jour les paramètres d’un utilisateur
// Méthode : PUT
// URL : /api/settings/:userId
// Body attendu : { theme, langue_preferree, notifications_email, ... }
// Accès : Authentifié uniquement
// =====================================================
router.put('/:userId', authenticateToken, settingsController.updateUserSettings);

module.exports = router;
