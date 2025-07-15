const transactionsModel = require('../models/transactionsModel');

// =====================================================
// Récupérer toutes les transactions d’un utilisateur
// Route : GET /api/transactions/user/:userId
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
// Route : GET /api/transactions/:transactionId
// L’utilisateur est authentifié (id dans token)
// =====================================================
async function getTransactionById(req, res) {
  try {
    const id_user = req.user.id;
    const id_transaction = req.params.transactionId;

    const transaction = await transactionsModel.getTransactionById(id_user, id_transaction);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction non trouvée' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.',
      details: error.message,
    });
  }
}

// =====================================================
// Ajouter une nouvelle transaction
// Route : POST /api/transactions/user/:userId
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
// Route : PUT /api/transactions/:transactionId
// =====================================================
async function updateTransaction(req, res) {
  try {
    const id_user = req.user.id;
    const id_transaction = req.params.transactionId;
    const updateData = req.body;

    const result = await transactionsModel.updateTransaction(id_user, id_transaction, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaction non trouvée ou non modifiée' });
    }

    res.json({ message: 'Transaction mise à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Supprimer une transaction
// Route : DELETE /api/transactions/:transactionId
// =====================================================
async function deleteTransaction(req, res) {
  try {
    const id_user = req.user.id;
    const id_transaction = req.params.transactionId;

    const result = await transactionsModel.deleteTransaction(id_user, id_transaction);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaction non trouvée ou déjà supprimée' });
    }

    res.json({ message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur.', error: error.message });
  }
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
