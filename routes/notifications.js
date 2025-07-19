const express = require('express');
const router = express.Router();

// Contrôleur des notifications
const notificationsController = require('../controllers/notificationsController');

// Middleware d’authentification
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Créer une notification pour un utilisateur
// URL : POST /api/notifications/user/:userId
// Body : { titre, message, type ('info', 'alerte', etc.) }
// Accès : Authentifié
// =====================================================
router.post('/user/:userId', authenticateToken, notificationsController.createNotification);

// =====================================================
// Récupérer les notifications d’un utilisateur
// URL : GET /api/notifications/user/:userId
// Accès : Authentifié
// =====================================================
router.get('/user/:userId', authenticateToken, notificationsController.getNotificationsByUser);

// =====================================================
// Marquer une notification comme lue
// URL : PUT /api/notifications/:notificationId/read
// Accès : Authentifié
// =====================================================
router.put('/:notificationId/read', authenticateToken, notificationsController.markAsRead);

// =====================================================
// Supprimer une notification
// URL : DELETE /api/notifications/:notificationId
// Accès : Authentifié
// =====================================================
router.delete('/:notificationId', authenticateToken, notificationsController.deleteNotification);

module.exports = router;
