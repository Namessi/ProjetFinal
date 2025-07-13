// controllers/reportController.js

const reportModel = require('../models/reportModel');

// =====================================================
// Créer un rapport
// Body attendu : { titre, contenu }
// ID utilisateur récupéré via le token
// =====================================================
async function createReport(req, res) {
  try {
    const id_user = req.user.id_user; // Authentifié via JWT
    const { titre, contenu } = req.body;

    if (!titre || !contenu) {
      return res.status(400).json({ message: 'Titre et contenu requis' });
    }

    const reportId = await reportModel.createReport(id_user, titre, contenu);
    res.status(201).json({ message: 'Rapport créé', reportId });
  } catch (error) {
    console.error('Erreur dans createReport :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du rapport' });
  }
}

// =====================================================
// Récupérer tous les rapports d’un utilisateur
// Paramètre : :userId
// =====================================================
async function getUserReports(req, res) {
  try {
    const id_user = req.params.userId;
    const reports = await reportModel.getReportsByUserId(id_user);
    res.json(reports);
  } catch (error) {
    console.error('Erreur dans getUserReports :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des rapports' });
  }
}

// =====================================================
// Récupérer un rapport par son ID
// Paramètre : :reportId
// =====================================================
async function getReportById(req, res) {
  try {
    const id_report = req.params.reportId;
    const report = await reportModel.getReportById(id_report);

    if (!report) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    res.json(report);
  } catch (error) {
    console.error('Erreur dans getReportById :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du rapport' });
  }
}

// =====================================================
// Mettre à jour un rapport
// Paramètre : :reportId
// Body attendu : { titre, contenu }
// =====================================================
async function updateReport(req, res) {
  try {
    const id_report = req.params.reportId;
    const { titre, contenu } = req.body;

    if (!titre || !contenu) {
      return res.status(400).json({ message: 'Titre et contenu requis pour la mise à jour' });
    }

    await reportModel.updateReport(id_report, titre, contenu);
    res.json({ message: 'Rapport mis à jour' });
  } catch (error) {
    console.error('Erreur dans updateReport :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du rapport' });
  }
}

// =====================================================
// Supprimer un rapport
// Paramètre : :reportId
// =====================================================
async function deleteReport(req, res) {
  try {
    const id_report = req.params.reportId;
    await reportModel.deleteReport(id_report);
    res.json({ message: 'Rapport supprimé' });
  } catch (error) {
    console.error('Erreur dans deleteReport :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du rapport' });
  }
}

module.exports = {
  createReport,
  getUserReports,
  getReportById,
  updateReport,
  deleteReport,
};
