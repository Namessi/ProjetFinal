const db = require('../db/connection');

// =====================================================
// Créer une catégorie pour un utilisateur
// Paramètres :
//  - id_user : identifiant de l'utilisateur
//  - name : nom de la catégorie
//  - type : type de la catégorie ('revenu' ou 'depense')
// Retourne : l'id de la catégorie créée
// =====================================================
async function createCategory(id_user, name, type) {
  const [result] = await db.query(
    'INSERT INTO categories (id_user, name, type) VALUES (?, ?, ?)',
    [id_user, name, type]
  );
  return result.insertId;
}

// =====================================================
// Récupérer toutes les catégories d’un utilisateur
// Paramètre : id_user (identifiant utilisateur)
// Retourne : tableau des catégories associées à l'utilisateur
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
// Paramètres :
//  - category_id : identifiant de la catégorie à modifier
//  - name : nouveau nom de la catégorie
//  - type : nouveau type ('revenu' ou 'depense')
// =====================================================
async function updateCategory(category_id, name, type) {
  await db.query(
    'UPDATE categories SET name = ?, type = ? WHERE category_id = ?',
    [name, type, category_id]
  );
}

// =====================================================
// Supprimer une catégorie
// Paramètre : category_id (identifiant de la catégorie)
// =====================================================
async function deleteCategory(category_id) {
  await db.query(
    'DELETE FROM categories WHERE category_id = ?',
    [category_id]
  );
}

module.exports = {
  createCategory,
  getCategoriesByUserId,
  updateCategory,
  deleteCategory,
};
