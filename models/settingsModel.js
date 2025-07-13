// models/settingsModel.js

const db = require('../db/connection');

// =====================================================
// Obtenir les paramètres d’un utilisateur
// Retourne un objet avec les préférences (thème, langue, etc.)
// =====================================================
async function getSettingsByUserId(id_user) {
  const [rows] = await db.query(
    'SELECT * FROM parametres_utilisateur WHERE id_user = ?',
    [id_user]
  );
  return rows[0]; // Retourne un seul objet de paramètres
}

// =====================================================
// Mettre à jour les paramètres d’un utilisateur
// settings = { theme: 'sombre', langue_preferree: 'fr', ... }
// Génère une requête SQL dynamique en fonction des clés reçues
// =====================================================
async function updateSettings(id_user, settings) {
  const keys = Object.keys(settings);
  const values = Object.values(settings);

  if (keys.length === 0) {
    throw new Error('Aucun paramètre à mettre à jour');
  }

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  values.push(id_user); // Pour le WHERE

  const sql = `UPDATE parametres_utilisateur SET ${setClause} WHERE id_user = ?`;
  await db.query(sql, values);
}

module.exports = {
  getSettingsByUserId,
  updateSettings,
};
