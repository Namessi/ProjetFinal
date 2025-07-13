// routes/settings.js

const express = require('express');
const router = express.Router();

// Contrôleur pour la gestion des paramètres utilisateurs
const settingsController = require('../controllers/settingsController');

// Middleware pour sécuriser les routes via JWT
const authenticateToken = require('../middleware/authMiddleware');

// =====================================================
// Obtenir les paramètres d’un utilisateur
// URL : GET /api/settings/:userId
// Accès : Authentifié
// =====================================================
router.get('/:userId', authenticateToken, settingsController.getUserSettings);

// =====================================================
// Mettre à jour les paramètres d’un utilisateur
// URL : PUT /api/settings/:userId
// Accès : Authentifié
// Body attendu : { theme, langue_preferree, notifications_email, etc. }
// =====================================================
router.put('/:userId', authenticateToken, settingsController.updateUserSettings);

module.exports = router;
