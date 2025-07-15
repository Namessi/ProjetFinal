const categoryModel = require('../models/categoryModel');

/**
 * Crée une nouvelle catégorie pour l'utilisateur authentifié
 * POST /api/categories/
 * Body attendu : { name, type }
 * L’ID utilisateur est extrait du token JWT (req.user.id)
 */
async function createCategory(req, res) {
  try {
    console.log("🔍 REQ.USER =", req.user);
    console.log("🔍 BODY =", req.body);

    const id_user = req.user.id;
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: 'Nom et type requis' });
    }

    const categoryId = await categoryModel.createCategory(id_user, name, type);
    res.status(201).json({ message: 'Catégorie créée', categoryId });
  } catch (error) {
    console.error('Erreur dans createCategory :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la catégorie' });
  }
}

/**
 * Récupère toutes les catégories d’un utilisateur
 * GET /api/categories/:userId
 */
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

/**
 * Met à jour une catégorie existante
 * PUT /api/categories/:categoryId
 * Body attendu : { name, type }
 */
async function updateCategory(req, res) {
  try {
    const id_categorie = req.params.categoryId;
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: 'Nom et type requis pour la mise à jour' });
    }

    await categoryModel.updateCategory(id_categorie, name, type);
    res.json({ message: 'Catégorie mise à jour' });
  } catch (error) {
    console.error('Erreur dans updateCategory :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la catégorie' });
  }
}

/**
 * Supprime une catégorie
 * DELETE /api/categories/:categoryId
 */
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
