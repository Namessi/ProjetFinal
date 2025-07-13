// routes/reports.js

const express = require('express');
const router = express.Router();

// Contrôleur pour la gestion des rapports
const reportController = require('../controllers/reportController');

// Middleware d'authentification pour sécuriser les routes
const authenticateToken = require('../middleware/authMiddleware');

// =====================================================
// Créer un rapport personnalisé
// URL : POST /api/reports
// Accès : Authentifié uniquement
// Body : { titre, contenu, periode, etc. }
// =====================================================
router.post('/', authenticateToken, reportController.createReport);

// =====================================================
// Récupérer tous les rapports d’un utilisateur
// URL : GET /api/reports/user/:userId
// Accès : Authentifié uniquement
// =====================================================
router.get('/user/:userId', authenticateToken, reportController.getUserReports);

// =====================================================
// Récupérer un rapport spécifique par son ID
// URL : GET /api/reports/:reportId
// Accès : Authentifié uniquement
// =====================================================
router.get('/:reportId', authenticateToken, reportController.getReportById);

// =====================================================
// Mettre à jour un rapport existant
// URL : PUT /api/reports/:reportId
// Accès : Authentifié uniquement
// Body : { titre, contenu, etc. }
// =====================================================
router.put('/:reportId', authenticateToken, reportController.updateReport);

// =====================================================
// Supprimer un rapport
// URL : DELETE /api/reports/:reportId
// Accès : Authentifié uniquement
// =====================================================
router.delete('/:reportId', authenticateToken, reportController.deleteReport);

// Exportation du routeur
module.exports = router;
