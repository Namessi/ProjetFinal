const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

// Middleware d'authentification pour sécuriser les routes
const authenticateToken = require('../middleware/authMiddleware');

// Récupérer toutes les transactions d’un utilisateur (protégé)
router.get('/:userId', authenticateToken, transactionsController.getAllTransactions);

// Récupérer une transaction par son ID (protégé)
router.get('/:userId/:transactionId', authenticateToken, transactionsController.getTransactionById);

// Ajouter une nouvelle transaction (protégé)
router.post('/:userId', authenticateToken, transactionsController.createTransaction);

// Mettre à jour une transaction existante (protégé)
router.put('/:userId/:transactionId', authenticateToken, transactionsController.updateTransaction);

// Supprimer une transaction (protégé)
router.delete('/:userId/:transactionId', authenticateToken, transactionsController.deleteTransaction);

module.exports = router;

