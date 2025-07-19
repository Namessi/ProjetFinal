const express = require('express');
const router = express.Router();

// Contrôleur des transferts
const transfersController = require('../controllers/transfersController');

// Middleware d’authentification
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Créer un transfert (vers un utilisateur ou externe)
// URL : POST /api/transfers/user/:userId
// Body : { montant, type, destinataire (optional), description }
// Accès : Authentifié
// =====================================================
router.post('/user/:userId', authenticateToken, transfersController.createTransfer);

// =====================================================
// Récupérer tous les transferts d’un utilisateur
// URL : GET /api/transfers/user/:userId
// Accès : Authentifié
// =====================================================
router.get('/user/:userId', authenticateToken, transfersController.getTransfersByUser);

// =====================================================
// Supprimer un transfert
// URL : DELETE /api/transfers/:transferId
// Accès : Authentifié
// =====================================================
router.delete('/:transferId', authenticateToken, transfersController.deleteTransfer);

module.exports = router;
