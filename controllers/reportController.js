const reportModel = require('../models/reportModel');

/**
 * Crée un nouveau rapport pour l'utilisateur authentifié
 * POST /api/reports/
 * Body attendu : { titre, contenu }
 * L’ID utilisateur est extrait du token JWT (req.user.id)
 */
async function createReport(req, res) {
  try {
    const id_user = req.user.id;
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

/**
 * Récupère tous les rapports d’un utilisateur
 * GET /api/reports/:userId
 */
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

/**
 * Récupère un rapport par son ID
 * GET /api/reports/detail/:reportId
 */
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

/**
 * Met à jour un rapport existant
 * PUT /api/reports/:reportId
 * Body attendu : { titre, contenu }
 */
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

/**
 * Supprime un rapport
 * DELETE /api/reports/:reportId
 */
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
