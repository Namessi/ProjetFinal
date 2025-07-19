const express = require('express');
const router = express.Router();
const recipientsController = require('../controllers/recipientsController');
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Ajouter un nouveau contact (interne ou externe)
// POST /api/recipients/user/:userId
// Body :
//    - Interne : { destinataire_id, alias }
//    - Externe : { name, iban, bank_name }
// =====================================================
router.post('/user/:userId', authenticateToken, recipientsController.addRecipient);

// =====================================================
// Obtenir tous les contacts d’un utilisateur
// GET /api/recipients/user/:userId
// =====================================================
router.get('/user/:userId', authenticateToken, recipientsController.getAllRecipients);

// =====================================================
// Supprimer un contact
// DELETE /api/recipients/:recipientId
// =====================================================
router.delete('/:recipientId', authenticateToken, recipientsController.deleteRecipient);

// =====================================================
// Mettre à jour un destinataire
// PUT /api/recipients/:recipientId
// Body : { alias?, name?, iban?, bank_name? }
// =====================================================
router.put('/:recipientId', authenticateToken, recipientsController.updateRecipient);

module.exports = router;
