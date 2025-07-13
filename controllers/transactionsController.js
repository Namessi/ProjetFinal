// controllers/transactionsController.js

const transactionsModel = require('../models/transactionsModel');

// =====================================================
// Récupérer toutes les transactions d’un utilisateur
// Route : GET /api/transactions/:id_user
// =====================================================
async function getAllTransactions(req, res) {
  try {
    const id_user = req.params.userId;
    const transactions = await transactionsModel.getTransactionsByUserId(id_user);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Récupérer une transaction par son ID
// Route : GET /api/transactions/:id_user/:id_transaction
// =====================================================
async function getTransactionById(req, res) {
  try {
    const { userId: id_user, transactionId: id_transaction } = req.params;
    const transaction = await transactionsModel.getTransactionById(id_user, id_transaction);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction non trouvée' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Ajouter une nouvelle transaction
// Route : POST /api/transactions/:id_user
// Body : { montant, id_categorie, date_transaction, description }
// =====================================================
async function createTransaction(req, res) {
  try {
    const id_user = req.params.userId;
    const transactionData = req.body;
    const transactionId = await transactionsModel.createTransaction(id_user, transactionData);
    res.status(201).json({ message: 'Transaction créée', transactionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Mettre à jour une transaction
// Route : PUT /api/transactions/:id_user/:id_transaction
// Body : { montant, description, ... }
// =====================================================
async function updateTransaction(req, res) {
  try {
    const { userId: id_user, transactionId: id_transaction } = req.params;
    const updateData = req.body;
    await transactionsModel.updateTransaction(id_user, id_transaction, updateData);
    res.json({ message: 'Transaction mise à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Supprimer une transaction
// Route : DELETE /api/transactions/:id_user/:id_transaction
// =====================================================
async function deleteTransaction(req, res) {
  try {
    const { userId: id_user, transactionId: id_transaction } = req.params;
    await transactionsModel.deleteTransaction(id_user, id_transaction);
    res.json({ message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Export des fonctions pour les routes
module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
