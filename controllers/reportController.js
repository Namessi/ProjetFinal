const reportModel = require('../models/reportModel');

// Créer un rapport
async function createReport(req, res) {
  try {
    const { userId, title, content, createdAt } = req.body;
    const reportId = await reportModel.createReport(userId, title, content, createdAt);
    res.status(201).json({ message: 'Rapport créé', reportId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Récupérer tous les rapports d’un utilisateur
async function getUserReports(req, res) {
  try {
    const userId = req.params.userId;
    const reports = await reportModel.getReportsByUserId(userId);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Récupérer un rapport par son ID
async function getReportById(req, res) {
  try {
    const reportId = req.params.reportId;
    const report = await reportModel.getReportById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour un rapport
async function updateReport(req, res) {
  try {
    const reportId = req.params.reportId;
    const { title, content } = req.body;
    await reportModel.updateReport(reportId, title, content);
    res.json({ message: 'Rapport mis à jour' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Supprimer un rapport
async function deleteReport(req, res) {
  try {
    const reportId = req.params.reportId;
    await reportModel.deleteReport(reportId);
    res.json({ message: 'Rapport supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createReport,
  getUserReports,
  getReportById,
  updateReport,
  deleteReport,
};
