const express = require('express');
const router = express.Router();

// Contrôleur des rapports
const reportController = require('../controllers/reportController');

// Import du middleware d'authentification
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Créer un rapport
// Méthode : POST
// URL : /api/reports/
// Body attendu : { titre, contenu }
// Accès : Authentifié uniquement
// =====================================================
router.post('/', authenticateToken, reportController.createReport);

// =====================================================
// Récupérer tous les rapports d’un utilisateur
// Méthode : GET
// URL : /api/reports/:userId
// Accès : Authentifié uniquement
// =====================================================
router.get('/:userId', authenticateToken, reportController.getUserReports);

// =====================================================
// Récupérer un rapport par son ID
// Méthode : GET
// URL : /api/reports/detail/:reportId
// Accès : Authentifié uniquement
// =====================================================
router.get('/detail/:reportId', authenticateToken, reportController.getReportById);

// =====================================================
// Mettre à jour un rapport
// Méthode : PUT
// URL : /api/reports/:reportId
// Body attendu : { titre, contenu }
// Accès : Authentifié uniquement
// =====================================================
router.put('/:reportId', authenticateToken, reportController.updateReport);

// =====================================================
// Supprimer un rapport
// Méthode : DELETE
// URL : /api/reports/:reportId
// Accès : Authentifié uniquement
// =====================================================
router.delete('/:reportId', authenticateToken, reportController.deleteReport);

module.exports = router;
