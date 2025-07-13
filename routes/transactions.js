// routes/transactions.js

const express = require('express');
const router = express.Router();

// Contrôleur pour les transactions
const transactionsController = require('../controllers/transactionsController');

// Middleware JWT pour sécuriser toutes les routes
const authenticateToken = require('../middleware/authMiddleware');

// =====================================================
// Récupérer toutes les transactions d’un utilisateur
// URL : GET /api/transactions/user/:userId
// Accès : Authentifié
// =====================================================
router.get('/user/:userId', authenticateToken, transactionsController.getAllTransactions);

// =====================================================
// Récupérer une transaction spécifique
// URL : GET /api/transactions/:transactionId
// Accès : Authentifié
// =====================================================
router.get('/:transactionId', authenticateToken, transactionsController.getTransactionById);

// =====================================================
// Ajouter une nouvelle transaction
// URL : POST /api/transactions/user/:userId
// Body : { montant, description, date, id_categorie }
// Accès : Authentifié
// =====================================================
router.post('/user/:userId', authenticateToken, transactionsController.createTransaction);

// =====================================================
// Modifier une transaction existante
// URL : PUT /api/transactions/:transactionId
// Body : { montant, description, etc. }
// Accès : Authentifié
// =====================================================
router.put('/:transactionId', authenticateToken, transactionsController.updateTransaction);

// =====================================================
// Supprimer une transaction
// URL : DELETE /api/transactions/:transactionId
// Accès : Authentifié
// =====================================================
router.delete('/:transactionId', authenticateToken, transactionsController.deleteTransaction);

module.exports = router;
