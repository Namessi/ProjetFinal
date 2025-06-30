const categoryModel = require('../models/categoryModel');

// Créer une catégorie
async function createCategory(req, res) {
  try {
    const { userId, name } = req.body;
    const categoryId = await categoryModel.createCategory(userId, name);
    res.status(201).json({ message: 'Catégorie créée', categoryId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Récupérer les catégories d’un utilisateur
async function getUserCategories(req, res) {
  try {
    const userId = req.params.userId;
    const categories = await categoryModel.getCategoriesByUserId(userId);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour une catégorie
async function updateCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const { name } = req.body;
    await categoryModel.updateCategory(categoryId, name);
    res.json({ message: 'Catégorie mise à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Supprimer une catégorie
async function deleteCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    await categoryModel.deleteCategory(categoryId);
    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCategory,
  getUserCategories,
  updateCategory,
  deleteCategory,
};
