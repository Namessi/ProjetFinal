const recipientsModel = require('../models/recipientsModel');

// =====================================================
// Ajouter un nouveau destinataire
// Route : POST /api/recipients/user/:userId
// =====================================================
async function addRecipient(req, res) {
  try {
    const id_user = req.params.userId;
    const { destinataire_id, alias, name, iban, bank_name, type } = req.body;

    let recipientId;

    if (destinataire_id) {
      // Cas 1 : destinataire interne
      recipientId = await recipientsModel.addInternalRecipient(id_user, destinataire_id, alias);
    } else if (name && iban && bank_name) {
      // Cas 2 : destinataire externe (banque)
      recipientId = await recipientsModel.addExternalRecipient(id_user, name, iban, bank_name, type || 'iban');
    } else {
      return res.status(400).json({ message: 'Données insuffisantes pour ajouter un destinataire' });
    }

    res.status(201).json({ message: 'Destinataire ajouté', recipientId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Obtenir tous les destinataires d’un utilisateur
// Route : GET /api/recipients/user/:userId
// =====================================================
async function getAllRecipients(req, res) {
  try {
    const id_user = req.params.userId;
    const recipients = await recipientsModel.getRecipientsByUserId(id_user);
    res.json(recipients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Supprimer un destinataire
// Route : DELETE /api/recipients/:recipientId
// =====================================================
async function deleteRecipient(req, res) {
  try {
    const recipientId = req.params.recipientId;
    const result = await recipientsModel.deleteRecipient(recipientId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Destinataire non trouvé' });
    }

    res.json({ message: 'Destinataire supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Mettre à jour un destinataire
// =====================================================
async function updateRecipient(req, res) {
  try {
    const recipientId = req.params.recipientId;
    const { alias, name, iban, bank_name } = req.body;

    const result = await recipientsModel.updateRecipient(recipientId, { alias, name, iban, bank_name });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Destinataire non trouvé' });
    }

    res.json({ message: 'Destinataire mis à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addRecipient,
  getAllRecipients,
  deleteRecipient,
  updateRecipient,
};
