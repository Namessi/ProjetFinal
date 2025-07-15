const settingsModel = require('../models/settingsModel');

/**
 * Récupère les paramètres d’un utilisateur donné
 * GET /api/settings/:userId
 * Accès sécurisé via middleware d’authentification
 */
async function getUserSettings(req, res) {
  try {
    const id_user = req.params.userId;

    const settings = await settingsModel.getSettingsByUserId(id_user);

    if (!settings) {
      return res.status(404).json({ message: 'Paramètres non trouvés pour cet utilisateur' });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error('Erreur dans getUserSettings :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des paramètres' });
  }
}

/**
 * Met à jour les paramètres d’un utilisateur donné
 * PUT /api/settings/:userId
 * Body attendu : { theme, langue_preferree, ... }
 */
async function updateUserSettings(req, res) {
  try {
    const id_user = req.params.userId;
    const newSettings = req.body;

    if (!newSettings || Object.keys(newSettings).length === 0) {
      return res.status(400).json({ message: 'Aucun paramètre à mettre à jour' });
    }

    await settingsModel.updateSettings(id_user, newSettings);

    res.status(200).json({ message: 'Paramètres mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur dans updateUserSettings :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour des paramètres' });
  }
}

module.exports = {
  getUserSettings,
  updateUserSettings,
};
