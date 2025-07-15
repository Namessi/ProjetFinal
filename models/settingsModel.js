const db = require('../db/connection');

// =====================================================
// Obtenir les paramètres d’un utilisateur
// Retourne un objet avec les préférences (thème, langue, etc.)
// =====================================================
async function getSettingsByUserId(user_id) {
  const [rows] = await db.query(
    'SELECT * FROM settings WHERE user_id = ?',
    [user_id]
  );
  return rows[0]; // Retourne un seul objet de paramètres
}

// =====================================================
// Mettre à jour les paramètres d’un utilisateur
// settings = { theme: 'sombre', langue_preferree: 'fr', ... }
// Génère une requête SQL dynamique en fonction des clés reçues
// =====================================================
async function updateSettings(user_id, settings) {
  const keys = Object.keys(settings);
  const values = Object.values(settings);

  if (keys.length === 0) {
    throw new Error('Aucun paramètre à mettre à jour');
  }

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  values.push(user_id); // Pour le WHERE

  const sql = `UPDATE settings SET ${setClause} WHERE user_id = ?`;
  await db.query(sql, values);
}

// =====================================================
// Créer les paramètres par défaut pour un nouvel utilisateur
// =====================================================
async function createDefaultSettings(user_id) {
  const defaultSettings = {
    theme: 'clair',
    language: 'fr',
    email_notifications: true,
    preferred_currency: 'EUR',
    results_per_page: 10
  };

  await db.query(
    `INSERT INTO settings (user_id, theme, language, email_notifications, preferred_currency, results_per_page)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, defaultSettings.theme, defaultSettings.language, defaultSettings.email_notifications, defaultSettings.preferred_currency, defaultSettings.results_per_page]
  );
}

module.exports = {
  getSettingsByUserId,
  updateSettings,
  createDefaultSettings,
};
