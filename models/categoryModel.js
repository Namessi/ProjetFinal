// models/categoryModel.js

const db = require('../db/connection');

// =====================================================
// Créer une catégorie pour un utilisateur
// Reçoit : id_user, nom, type ('revenu' ou 'depense')
// =====================================================
async function createCategory(id_user, nom, type) {
  const [result] = await db.query(
    'INSERT INTO categories (id_user, nom, type) VALUES (?, ?, ?)',
    [id_user, nom, type]
  );
  return result.insertId;
}

// =====================================================
// Récupérer toutes les catégories d’un utilisateur
// =====================================================
async function getCategoriesByUserId(id_user) {
  const [rows] = await db.query(
    'SELECT * FROM categories WHERE id_user = ?',
    [id_user]
  );
  return rows;
}

// =====================================================
// Mettre à jour une catégorie existante
// =====================================================
async function updateCategory(id_categorie, nom, type) {
  await db.query(
    'UPDATE categories SET nom = ?, type = ? WHERE id_categorie = ?',
    [nom, type, id_categorie]
  );
}

// =====================================================
// Supprimer une catégorie
// =====================================================
async function deleteCategory(id_categorie) {
  await db.query(
    'DELETE FROM categories WHERE id_categorie = ?',
    [id_categorie]
  );
}

module.exports = {
  createCategory,
  getCategoriesByUserId,
  updateCategory,
  deleteCategory,
};
