// server.js
// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// On importe les modules nécessaires
const express = require('express'); // Framework pour créer le serveur
const cors = require('cors');       // Pour gérer les accès cross-origin (ex: React + API)
const app = express();              // On crée une instance de l'application Express
const PORT = process.env.PORT || 3000; // Port sur lequel le serveur va écouter (3000 par défaut)

// Middleware : fonctions qui s'exécutent à chaque requête
app.use(cors());           // Autorise les requêtes venant d'autres domaines (utile pour le front)
app.use(express.json());   // Permet de lire le corps des requêtes en JSON

// Import des fichiers de routes (chaque fichier gère un groupe d'URL)
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const budgetRoutes = require('./routes/budgets');
const reportRoutes = require('./routes/reports');
const settingsRoutes = require('./routes/settings');

// On "monte" (utilise) les routes sur des chemins spécifiques
app.use('/api/auth', authRoutes);           // Toutes les routes liées à l'authentification seront accessibles via /api/auth
app.use('/api/users', userRoutes);           // Gestion des utilisateurs : /api/users
app.use('/api/transactions', transactionRoutes); // Gestion des transactions : /api/transactions
app.use('/api/categories', categoryRoutes);       // Gestion des catégories : /api/categories
app.use('/api/budgets', budgetRoutes);             // Gestion des budgets : /api/budgets
app.use('/api/reports', reportRoutes);             // Gestion des rapports : /api/reports
app.use('/api/settings', settingsRoutes);          // Gestion des paramètres utilisateurs : /api/settings

// Lancement du serveur, écoute des requêtes sur le port défini
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
// Middleware global de gestion des erreurs
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);
