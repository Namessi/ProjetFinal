// server.js

// ============================================================
// Chargement des variables d'environnement (.env)
// Permet d'utiliser des variables comme PORT, DB_HOST, etc.
// ============================================================
require('dotenv').config();

// ============================================================
// Importation des modules nécessaires
// ============================================================
const express = require('express');          // Framework principal
const cors = require('cors');                  // Pour gérer les requêtes cross-origin
const morgan = require('morgan');              // Logger des requêtes HTTP
const helmet = require('helmet');              // Sécurité HTTP headers
const compression = require('compression');    // Compression des réponses HTTP

const app = express();                         // Création de l'application Express
const PORT = process.env.PORT || 3000;         // Port d'écoute (variable d'env ou 3000)

// ============================================================
// Nettoyage console au démarrage (utile en dev)
// ============================================================
console.clear();

// ============================================================
// Middlewares globaux
// ============================================================
app.use(cors());              // Autoriser appels cross-origin (ex: frontend React)
app.use(express.json());      // Parse JSON dans le body des requêtes
app.use(helmet());            // Sécuriser les headers HTTP
app.use(compression());       // Compresser les réponses HTTP
app.use(morgan('dev'));       // Logger les requêtes (ex: GET /api/users 200 - 15ms)

// ============================================================
// Importation des routes (pattern MVC)
// ============================================================
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const budgetRoutes = require('./routes/budgets');
const reportRoutes = require('./routes/reports');
const settingsRoutes = require('./routes/settings');
const transfersRoutes = require('./routes/transfers');
const notificationRoutes = require('./routes/notifications');
const topupRoutes = require('./routes/topup');
const recipientRoutes = require('./routes/recipients');
const rewardsRoutes = require('./routes/rewards');
const qrcodeRoutes = require('./routes/qrcode');


console.log('authRoutes =', typeof authRoutes);
console.log('userRoutes =', typeof userRoutes);
console.log('transactionRoutes =', typeof transactionRoutes);
console.log('categoryRoutes =', typeof categoryRoutes);
console.log('budgetRoutes =', typeof budgetRoutes);
console.log('reportRoutes =', typeof reportRoutes);
console.log('settingsRoutes =', typeof settingsRoutes);
console.log('transfersRoutes =', typeof transfersRoutes);
console.log('notificationRoutes =', typeof notificationRoutes);
console.log('topupRoutes =', typeof topupRoutes);
console.log('recipientRoutes =', typeof recipientRoutes);
console.log('rewardsRoutes =', typeof rewardsRoutes);
console.log('qrcodeRoutes =', typeof qrcodeRoutes);

// ============================================================
// Utilisation des routes avec préfixe /api/
// ============================================================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/transfers', transfersRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/topup', topupRoutes);
app.use('/api/recipients', recipientRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/qrcode', qrcodeRoutes);

// ============================================================
// Middleware de gestion des erreurs
// ============================================================
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

// ============================================================
// Démarrage du serveur
// ============================================================
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur : http://localhost:${PORT}`);
});
