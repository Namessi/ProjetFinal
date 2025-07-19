const express = require('express');
const router = express.Router();

// Contrôleur pour les rechargements
const topupController = require('../controllers/topupController');

// Middleware d’authentification
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Ajouter un rechargement de compte
// URL : POST /api/topup/user/:userId
// Body : { montant, mode_paiement }
// Accès : Authentifié
// =====================================================
router.post('/user/:userId', authenticateToken, topupController.createTopup);

// =====================================================
// Récupérer l’historique des rechargements d’un utilisateur
// URL : GET /api/topup/user/:userId
// Accès : Authentifié
// =====================================================
router.get('/user/:userId', authenticateToken, topupController.getTopupHistory);

// =====================================================
// Supprimer un rechargement spécifique
// URL : DELETE /api/topup/:topupId
// Accès : Authentifié
// =====================================================
router.delete('/:topupId', authenticateToken, topupController.deleteTopup);

module.exports = router;
