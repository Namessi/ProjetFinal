const db = require('../db/connection');

// Créer un rapport
async function createReport(userId, title, content, createdAt) {
  const [result] = await db.query(
    'INSERT INTO reports (user_id, title, content, created_at) VALUES (?, ?, ?, ?)',
    [userId, title, content, createdAt]
  );
  return result.insertId;
}

// Récupérer tous les rapports d’un utilisateur
async function getReportsByUserId(userId) {
  const [rows] = await db.query('SELECT * FROM reports WHERE user_id = ?', [userId]);
  return rows;
}

// Récupérer un rapport par son ID
async function getReportById(reportId) {
  const [rows] = await db.query('SELECT * FROM reports WHERE id = ?', [reportId]);
  return rows[0];
}

// Mettre à jour un rapport
async function updateReport(reportId, title, content) {
  await db.query(
    'UPDATE reports SET title = ?, content = ? WHERE id = ?',
    [title, content, reportId]
  );
}

// Supprimer un rapport
async function deleteReport(reportId) {
  await db.query('DELETE FROM reports WHERE id = ?', [reportId]);
}

module.exports = {
  createReport,
  getReportsByUserId,
  getReportById,
  updateReport,
  deleteReport,
};
