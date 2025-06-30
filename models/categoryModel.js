const db = require('../db/connection');

// Créer une catégorie
async function createCategory(userId, name) {
  const [result] = await db.query(
    'INSERT INTO categories (user_id, name) VALUES (?, ?)',
    [userId, name]
  );
  return result.insertId;
}

// Récupérer toutes les catégories d’un utilisateur
async function getCategoriesByUserId(userId) {
  const [rows] = await db.query('SELECT * FROM categories WHERE user_id = ?', [userId]);
  return rows;
}

// Mettre à jour une catégorie
async function updateCategory(categoryId, name) {
  await db.query(
    'UPDATE categories SET name = ? WHERE id = ?',
    [name, categoryId]
  );
}

// Supprimer une catégorie
async function deleteCategory(categoryId) {
  await db.query('DELETE FROM categories WHERE id = ?', [categoryId]);
}

module.exports = {
  createCategory,
  getCategoriesByUserId,
  updateCategory,
  deleteCategory,
};
