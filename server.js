// server.js

// ============================================================
// Chargement des variables d'environnement (.env)
// Permet d'utiliser des variables comme PORT, DB_HOST, etc.
// ============================================================
require('dotenv').config();

// ============================================================
// Importation des modules nécessaires
// ============================================================
const express = require('express');         // Framework principal
const cors = require('cors');               // Pour accepter les requêtes cross-origin (ex: React + API)
const morgan = require('morgan');           // Pour afficher les requêtes HTTP dans la console
const helmet = require('helmet');           // Pour sécuriser les headers HTTP (anti XSS, clickjacking, etc.)
const compression = require('compression'); // Pour compresser les réponses HTTP (améliore les perfs)

const app = express();                      // Création de l'application Express
const PORT = process.env.PORT || 3000;      // Port d'écoute du serveur (depuis .env ou 3000 par défaut)

// ============================================================
// Nettoyage de la console à chaque démarrage
// (utile pendant le développement)
// ============================================================
console.clear();

// ============================================================
// Middlewares globaux
// ============================================================
app.use(cors());                    // Autorise les appels depuis d'autres origines (utile avec un front externe)
app.use(express.json());           // Permet de lire les requêtes en JSON
app.use(helmet());                 // Active les headers de sécurité
app.use(compression());           // Compresse les réponses HTTP
app.use(morgan('dev'));           // Affiche les requêtes HTTP dans la console (GET /api/users 200 - 15ms)

// ============================================================
// Importation des fichiers de routes (structure MVC)
// ============================================================
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const budgetRoutes = require('./routes/budgets');
const reportRoutes = require('./routes/reports');
const settingsRoutes = require('./routes/settings');

// ============================================================
// Utilisation des routes avec préfixe /api/
// ============================================================
app.use('/api/auth', authRoutes);           // Inscription, connexion, JWT
app.use('/api/users', userRoutes);          // Gestion des utilisateurs
app.use('/api/transactions', transactionRoutes); // Ajout, modif, suppression de transactions
app.use('/api/categories', categoryRoutes); // Liste et gestion des catégories
app.use('/api/budgets', budgetRoutes);      // Définition et récupération de budgets
app.use('/api/reports', reportRoutes);      // Rapports personnalisés
app.use('/api/settings', settingsRoutes);   // Préférences utilisateurs (langue, thème, etc.)

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
