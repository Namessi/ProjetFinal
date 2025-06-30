const settingsModel = require('../models/settingsModel');

// Récupérer les paramètres d’un utilisateur
async function getUserSettings(req, res) {
  try {
    const userId = req.params.userId;
    const settings = await settingsModel.getSettingsByUserId(userId);
    if (!settings) {
      return res.status(404).json({ message: 'Paramètres non trouvés' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour les paramètres d’un utilisateur
async function updateUserSettings(req, res) {
  try {
    const userId = req.params.userId;
    const newSettings = req.body;  // attend un objet avec les champs à modifier
    await settingsModel.updateSettings(userId, newSettings);
    res.json({ message: 'Paramètres mis à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUserSettings,
  updateUserSettings,
};
