const transfersModel = require('../models/transfersModel');

// =====================================================
// Créer un transfert
// Route : POST /api/transfers/user/:userId
// =====================================================
async function createTransfer(req, res) {
  try {
    const sender_id = req.params.userId;
    const { recipient_id, amount, type, transaction_id, message } = req.body;

    if (!amount || !type) {
      return res.status(400).json({ message: 'Les champs "amount" et "type" sont requis.' });
    }

    const transferId = await transfersModel.createTransfer({
      sender_id,
      recipient_id: recipient_id || null,
      amount,
      type,
      transaction_id: transaction_id || null,
      message: message || null
    });

    res.status(201).json({ message: 'Transfert effectué', transferId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Récupérer tous les transferts d’un utilisateur
// Route : GET /api/transfers/user/:userId
// =====================================================
async function getTransfersByUser(req, res) {
  try {
    const id_user = req.params.userId;
    const results = await transfersModel.getTransfersByUser(id_user);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Supprimer un transfert
// Route : DELETE /api/transfers/:transferId
// =====================================================
async function deleteTransfer(req, res) {
  try {
    const transferId = req.params.transferId;
    const result = await transfersModel.deleteTransfer(transferId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transfert non trouvé ou déjà supprimé' });
    }

    res.json({ message: 'Transfert supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTransfer,
  getTransfersByUser,
  deleteTransfer
};
