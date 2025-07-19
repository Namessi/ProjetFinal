const db = require('../db/connection');

// =====================================================
// Créer une notification pour un utilisateur
// =====================================================
async function createNotification(user_id, data) {
  const { titre, message, type } = data;
  const [result] = await db.query(
    `INSERT INTO notifications (user_id, titre, message, type) 
     VALUES (?, ?, ?, ?)`,
    [user_id, titre, message, type]
  );
  return result.insertId;
}

// =====================================================
// Récupérer les notifications d’un utilisateur
// =====================================================
async function getNotificationsByUser(user_id) {
  const [rows] = await db.query(
    `SELECT * FROM notifications 
     WHERE user_id = ? 
     ORDER BY date_envoi DESC`,
    [user_id]
  );
  return rows;
}

// =====================================================
// Marquer une notification comme lue
// =====================================================
async function markAsRead(notification_id) {
  const [result] = await db.query(
    `UPDATE notifications 
     SET lue = 1 
     WHERE id = ?`,
    [notification_id]
  );
  return result;
}

// =====================================================
// Supprimer une notification
// =====================================================
async function deleteNotification(notification_id) {
  const [result] = await db.query(
    `DELETE FROM notifications 
     WHERE id = ?`,
    [notification_id]
  );
  return result;
}

module.exports = {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification
};
