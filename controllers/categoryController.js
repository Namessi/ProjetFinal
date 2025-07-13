// controllers/categoryController.js

const categoryModel = require('../models/categoryModel');

// =====================================================
// Créer une catégorie
// Body attendu : { nom, type }
// L’ID utilisateur est récupéré depuis le token (req.user.id_user)
// =====================================================
async function createCategory(req, res) {
  try {
    const id_user = req.user.id_user;
    const { nom, type } = req.body;

    if (!nom || !type) {
      return res.status(400).json({ message: 'Nom et type requis' });
    }

    const categoryId = await categoryModel.createCategory(id_user, nom, type);
    res.status(201).json({ message: 'Catégorie créée', categoryId });
  } catch (error) {
    console.error('Erreur dans createCategory :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la catégorie' });
  }
}

// =====================================================
// Récupérer les catégories d’un utilisateur
// Paramètre attendu : :userId dans l’URL
// =====================================================
async function getUserCategories(req, res) {
  try {
    const id_user = req.params.userId;
    const categories = await categoryModel.getCategoriesByUserId(id_user);
    res.json(categories);
  } catch (error) {
    console.error('Erreur dans getUserCategories :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des catégories' });
  }
}

// =====================================================
// Mettre à jour une catégorie
// Paramètre : :categoryId
// Body attendu : { nom, type }
// =====================================================
async function updateCategory(req, res) {
  try {
    const id_categorie = req.params.categoryId;
    const { nom, type } = req.body;

    if (!nom || !type) {
      return res.status(400).json({ message: 'Nom et type requis pour la mise à jour' });
    }

    await categoryModel.updateCategory(id_categorie, nom, type);
    res.json({ message: 'Catégorie mise à jour' });
  } catch (error) {
    console.error('Erreur dans updateCategory :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la catégorie' });
  }
}

// =====================================================
// Supprimer une catégorie
// Paramètre : :categoryId
// =====================================================
async function deleteCategory(req, res) {
  try {
    const id_categorie = req.params.categoryId;
    await categoryModel.deleteCategory(id_categorie);
    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    console.error('Erreur dans deleteCategory :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de la catégorie' });
  }
}

module.exports = {
  createCategory,
  getUserCategories,
  updateCategory,
  deleteCategory,
};
