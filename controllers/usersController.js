const usersModel = require('../models/usersModel');

// =====================================================
// 1. Récupérer tous les utilisateurs (ADMIN uniquement)
// =====================================================
async function getAllUsers(req, res) {
  try {
    // Supposé que le middleware a déjà validé le rôle admin
    const users = await usersModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des utilisateurs',
      error: error.message,
    });
  }
}

// =====================================================
// 2. Récupérer un utilisateur par son ID
// =====================================================
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

// =====================================================
// 3. Mettre à jour un utilisateur
// =====================================================
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

// =====================================================
// 4. Supprimer un utilisateur
// =====================================================
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
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
