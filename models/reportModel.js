// models/reportModel.js

const db = require('../db/connection');

// =====================================================
// Créer un rapport personnalisé
// Reçoit : id_user, titre, contenu
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
// =====================================================
async function updateReport(id_report, titre, contenu) {
  await db.query(
    'UPDATE reports SET titre = ?, contenu = ? WHERE id_report = ?',
    [titre, contenu, id_report]
  );
}

// =====================================================
// Supprimer un rapport
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
