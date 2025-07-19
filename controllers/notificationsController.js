const notificationsModel = require('../models/notificationsModel');

// =====================================================
// Créer une notification pour un utilisateur
// Route : POST /api/notifications/user/:userId
// =====================================================
async function createNotification(req, res) {
  try {
    const id_user = req.params.userId;
    const { titre, message, type } = req.body;

    if (!titre || !message) {
      return res.status(400).json({ message: 'Le titre et le message sont requis.' });
    }

    const notificationId = await notificationsModel.createNotification(id_user, {
      titre,
      message,
      type: type || 'info'
    });

    res.status(201).json({ message: 'Notification créée', notificationId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Récupérer les notifications d’un utilisateur
// Route : GET /api/notifications/user/:userId
// =====================================================
async function getNotificationsByUser(req, res) {
  try {
    const id_user = req.params.userId;
    const notifications = await notificationsModel.getNotificationsByUser(id_user);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Marquer une notification comme lue
// Route : PUT /api/notifications/:notificationId/read
// =====================================================
async function markAsRead(req, res) {
  try {
    const id_notification = req.params.notificationId;
    const result = await notificationsModel.markAsRead(id_notification);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }

    res.json({ message: 'Notification marquée comme lue' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// =====================================================
// Supprimer une notification
// Route : DELETE /api/notifications/:notificationId
// =====================================================
async function deleteNotification(req, res) {
  try {
    const id_notification = req.params.notificationId;
    const result = await notificationsModel.deleteNotification(id_notification);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notification non trouvée ou déjà supprimée' });
    }

    res.json({ message: 'Notification supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification
};
