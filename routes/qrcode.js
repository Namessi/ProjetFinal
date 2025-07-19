const express = require('express');
const router = express.Router();

// Contrôleur QR Code
const qrcodeController = require('../controllers/qrcodeController');

// Middleware d’authentification
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Générer un QR code lié à l’utilisateur connecté
// URL : GET /api/qrcode/generate
// Accès : Authentifié
// =====================================================
router.get('/generate', authenticateToken, qrcodeController.generateQrcode);

// =====================================================
// Lire un QR code (contenu encodé à décoder)
// URL : POST /api/qrcode/decode
// Body : { qrData }
// Accès : Authentifié
// =====================================================
router.post('/decode', authenticateToken, qrcodeController.decodeQrcode);

module.exports = router;
