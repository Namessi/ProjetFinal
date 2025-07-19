const db = require('../db/connection');

// =====================================================
// Ajouter un destinataire interne (utilisateur existant)
// =====================================================
async function addInternalRecipient(user_id, destinataire_id, alias) {
  const [result] = await db.query(
    `INSERT INTO recipients (user_id, destinataire_id, alias, type, created_at) 
     VALUES (?, ?, ?, 'interne', NOW())`,
    [user_id, destinataire_id, alias]
  );
  return result.insertId;
}

// =====================================================
// Ajouter un destinataire externe (bancaire : IBAN, etc.)
// =====================================================
async function addExternalRecipient(user_id, name, iban, bank_name, type = 'iban') {
  const [result] = await db.query(
    `INSERT INTO recipients (user_id, name, iban, bank_name, type, created_at) 
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [user_id, name, iban, bank_name, type]
  );
  return result.insertId;
}

// =====================================================
// Obtenir la liste des destinataires (internes + externes)
// =====================================================
async function getRecipientsByUserId(user_id) {
  const [rows] = await db.query(
    `SELECT 
       r.id,
       r.type,
       r.alias,
       r.name,
       r.iban,
       r.bank_name,
       r.created_at,
       u.username AS destinataire_nom,
       u.email AS destinataire_email
     FROM recipients r
     LEFT JOIN users u ON r.destinataire_id = u.id
     WHERE r.user_id = ?`,
    [user_id]
  );
  return rows;
}

// =====================================================
// Supprimer un destinataire
// =====================================================
async function deleteRecipient(recipient_id) {
  const [result] = await db.query(
    `DELETE FROM recipients WHERE id = ?`,
    [recipient_id]
  );
  return result;
}

// =====================================================
// Mettre à jour un destinataire (interne ou externe)
// =====================================================
async function updateRecipient(id, { alias, name, iban, bank_name }) {
  const [result] = await db.query(
    `UPDATE recipients
     SET alias = COALESCE(?, alias),
         name = COALESCE(?, name),
         iban = COALESCE(?, iban),
         bank_name = COALESCE(?, bank_name)
     WHERE id = ?`,
    [alias, name, iban, bank_name, id]
  );
  return result;
}

module.exports = {
  addInternalRecipient,
  addExternalRecipient,
  getRecipientsByUserId,
  deleteRecipient,
  updateRecipient,
};
