const rewardsModel = require('../models/rewardsModel');

// =====================================================
// Ajouter une nouvelle récompense ou des points
// =====================================================
async function addReward(req, res) {
  try {
    const userId = req.params.userId;
    const rewardData = req.body;

    const newRewardId = await rewardsModel.addReward(userId, rewardData);
    res.status(201).json({ message: 'Récompense ajoutée', rewardId: newRewardId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Obtenir les récompenses d’un utilisateur
// =====================================================
async function getRewardsByUser(req, res) {
  try {
    const userId = req.params.userId;
    const rewards = await rewardsModel.getRewardsByUserId(userId);
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Supprimer une récompense
// =====================================================
async function deleteReward(req, res) {
  try {
    const rewardId = req.params.rewardId;
    const result = await rewardsModel.deleteRewardById(rewardId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Récompense non trouvée' });
    }

    res.json({ message: 'Récompense supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addReward,
  getRewardsByUser,
  deleteReward,
};
