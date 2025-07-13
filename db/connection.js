// db/connection.js
const mysql = require('mysql2/promise'); // Version avec promesses pour async/await
require('dotenv').config(); // Charge les variables d’environnement depuis .env

// Création d'un pool de connexions à la base de données
const pool = mysql.createPool({
  host: process.env.DB_HOST,         // Adresse du serveur MySQL
  user: process.env.DB_USER,         // Nom d'utilisateur
  password: process.env.DB_PASSWORD, // Mot de passe
  database: process.env.DB_NAME,     // Nom de la base de données
  waitForConnections: true,          // File d'attente si toutes les connexions sont utilisées
  connectionLimit: 10,               // Nombre max de connexions simultanées
  queueLimit: 0                      // 0 = file d’attente illimitée
});

module.exports = pool; // Export du pool pour être utilisé dans tous les models
