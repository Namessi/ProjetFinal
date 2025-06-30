const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Middleware d'authentification pour sécuriser les routes
const authenticateToken = require('../middleware/authMiddleware');

// Créer un nouveau rapport (protégé)
router.post('/', authenticateToken, reportController.createReport);

// Récupérer tous les rapports d’un utilisateur (protégé)
router.get('/:userId', authenticateToken, reportController.getUserReports);

// Récupérer un rapport par son ID (protégé)
router.get('/report/:reportId', authenticateToken, reportController.getReportById);

// Mettre à jour un rapport (protégé)
router.put('/:reportId', authenticateToken, reportController.updateReport);

// Supprimer un rapport (protégé)
router.delete('/:reportId', authenticateToken, reportController.deleteReport);

module.exports = router;
