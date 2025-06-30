const db = require('../db/connection');

// Récupérer les paramètres d’un utilisateur
async function getSettingsByUserId(userId) {
  const [rows] = await db.query('SELECT * FROM settings WHERE user_id = ?', [userId]);
  return rows[0];  // retourne l'objet des paramètres
}

// Mettre à jour les paramètres d’un utilisateur
async function updateSettings(userId, settings) {
  // Exemple simple, ici on considère que settings est un objet avec des clés correspondant aux colonnes de la table
  // Préparer la requête dynamique en fonction des clés reçues
  const keys = Object.keys(settings);
  const values = Object.values(settings);

  if (keys.length === 0) {
    throw new Error('Aucun paramètre à mettre à jour');
  }

  // Construction dynamique du SET clause : "col1 = ?, col2 = ?, ..."
  const setClause = keys.map(key => `${key} = ?`).join(', ');

  // Ajouter userId à la fin des valeurs pour le WHERE
  values.push(userId);

  const sql = `UPDATE settings SET ${setClause} WHERE user_id = ?`;
  await db.query(sql, values);
}

module.exports = {
  getSettingsByUserId,
  updateSettings,
};
