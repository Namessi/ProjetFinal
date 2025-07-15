const db = require('../db/connection');

// =====================================================
// Créer un rapport personnalisé
// Paramètres :
//  - id_user : identifiant de l'utilisateur
//  - titre : titre du rapport
//  - contenu : contenu du rapport
// Retourne : l'id du rapport créé
// =====================================================
async function createReport(id_user, titre, contenu) {
  const [result] = await db.query(
    'INSERT INTO reports (id_user, titre, contenu) VALUES (?, ?, ?)',
    [id_user, titre, contenu]
  );
  return result.insertId;
}

// =====================================================
// Récupérer tous les rapports d’un utilisateur
// Paramètre : id_user (identifiant utilisateur)
// Retourne : tableau des rapports de l'utilisateur
// =====================================================
async function getReportsByUserId(id_user) {
  const [rows] = await db.query(
    'SELECT * FROM reports WHERE id_user = ?',
    [id_user]
  );
  return rows;
}

// =====================================================
// Récupérer un rapport par son ID
// Paramètre : id_report (identifiant du rapport)
// Retourne : un objet rapport ou undefined si non trouvé
// =====================================================
async function getReportById(id_report) {
  const [rows] = await db.query(
    'SELECT * FROM reports WHERE id_report = ?',
    [id_report]
  );
  return rows[0];
}

// =====================================================
// Mettre à jour un rapport
// Paramètres :
//  - id_report : identifiant du rapport à modifier
//  - titre : nouveau titre
//  - contenu : nouveau contenu
// =====================================================
async function updateReport(id_report, titre, contenu) {
  await db.query(
    'UPDATE reports SET titre = ?, contenu = ? WHERE id_report = ?',
    [titre, contenu, id_report]
  );
}

// =====================================================
// Supprimer un rapport
// Paramètre : id_report (identifiant du rapport)
// =====================================================
async function deleteReport(id_report) {
  await db.query(
    'DELETE FROM reports WHERE id_report = ?',
    [id_report]
  );
}

module.exports = {
  createReport,
  getReportsByUserId,
  getReportById,
  updateReport,
  deleteReport,
};
