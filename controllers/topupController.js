const topupModel = require('../models/topupModel');

// =====================================================
// Ajouter un rechargement
// Route : POST /api/topup/user/:userId
// Body : { amount, method }
// =====================================================
async function createTopup(req, res) {
  try {
    const userId = req.params.userId;
    const { amount, method } = req.body;

    if (!amount || !method) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }

    const newTopupId = await topupModel.createTopup(userId, amount, method);
    res.status(201).json({ message: 'Rechargement enregistré', topupId: newTopupId });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}

// =====================================================
// Récupérer l’historique des rechargements d’un utilisateur
// Route : GET /api/topup/user/:userId
// =====================================================
async function getTopupHistory(req, res) {
  try {
    const userId = req.params.userId;
    const topups = await topupModel.getTopupHistory(userId);
    res.json(topups);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}

// =====================================================
// Supprimer un rechargement
// Route : DELETE /api/topup/:topupId
// =====================================================
async function deleteTopup(req, res) {
  try {
    const userId = req.user.id;
    const topupId = req.params.topupId;

    const result = await topupModel.deleteTopup(userId, topupId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Rechargement non trouvé ou déjà supprimé' });
    }

    res.json({ message: 'Rechargement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}

module.exports = {
  createTopup,
  getTopupHistory,
  deleteTopup,
};
