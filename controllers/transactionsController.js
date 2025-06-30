const transactionsModel = require('../models/transactionsModel');

// Récupérer toutes les transactions d’un utilisateur
async function getAllTransactions(req, res) {
  try {
    const userId = req.params.userId;
    const transactions = await transactionsModel.getTransactionsByUserId(userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Récupérer une transaction par ID
async function getTransactionById(req, res) {
  try {
    const { userId, transactionId } = req.params;
    const transaction = await transactionsModel.getTransactionById(userId, transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction non trouvée' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Ajouter une nouvelle transaction
async function createTransaction(req, res) {
  try {
    const userId = req.params.userId;
    const transactionData = req.body;  // attend un objet avec les données de la transaction
    const transactionId = await transactionsModel.createTransaction(userId, transactionData);
    res.status(201).json({ message: 'Transaction créée', transactionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour une transaction
async function updateTransaction(req, res) {
  try {
    const { userId, transactionId } = req.params;
    const updateData = req.body;
    await transactionsModel.updateTransaction(userId, transactionId, updateData);
    res.json({ message: 'Transaction mise à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Supprimer une transaction
async function deleteTransaction(req, res) {
  try {
    const { userId, transactionId } = req.params;
    await transactionsModel.deleteTransaction(userId, transactionId);
    res.json({ message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
