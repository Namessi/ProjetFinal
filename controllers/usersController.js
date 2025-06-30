const usersModel = require('../models/usersModel');

// Récupérer un utilisateur par son ID
async function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const user = await usersModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour un utilisateur
async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    const updateData = req.body;
    await usersModel.updateUser(userId, updateData);
    res.json({ message: 'Profil mis à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Supprimer un utilisateur
async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;
    await usersModel.deleteUser(userId);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};
