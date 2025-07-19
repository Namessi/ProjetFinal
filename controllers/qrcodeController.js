const qrcodeModel = require('../models/qrcodeModel');
const QRCode = require('qrcode');

// =====================================================
// Générer un QR code à partir de l’ID utilisateur
// Route : GET /api/qrcode/generate
// =====================================================
async function generateQrcode(req, res) {
  try {
    const id_user = req.user.id;

    // Donnée encodée dans le QR (modifiable : id, email, username...)
    const qrContent = JSON.stringify({ id_user });

    // Génération de l’image en base64
    const qrCodeImage = await QRCode.toDataURL(qrContent);

    res.status(200).json({ qrCodeImage });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la génération du QR code', error: error.message });
  }
}

// =====================================================
// Décoder un QR code (envoi d’une string encodée)
// Route : POST /api/qrcode/decode
// Body : { qrData }
// =====================================================
async function decodeQrcode(req, res) {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({ message: 'Aucune donnée à décoder' });
    }

    // Lecture / extraction du contenu du QR code
    const parsed = JSON.parse(qrData);

    // Optionnel : vérifier que l’ID utilisateur existe réellement
    const userInfo = await qrcodeModel.getUserInfoById(parsed.id_user);

    if (!userInfo) {
      return res.status(404).json({ message: 'Utilisateur non trouvé via QR code' });
    }

    res.status(200).json({ message: 'QR code valide', utilisateur: userInfo });
  } catch (error) {
    res.status(400).json({ message: 'QR code invalide ou corrompu', error: error.message });
  }
}

module.exports = {
  generateQrcode,
  decodeQrcode,
};
