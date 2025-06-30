# Backend - Application de gestion de budget personnel

Ce dépôt contient **le backend complet** d'une application de gestion de budget personnel.  
Il s'agit d'un serveur API développé avec **Node.js**, structuré selon le modèle **MVC** (Modèle – Vue – Contrôleur), et connecté à une base de données **MySQL**.  
Ce backend gère l’ensemble des fonctionnalités liées aux utilisateurs, à leurs transactions, budgets, paramètres, catégories et rapports.

---

## 🔧 Technologies & Modules utilisés

- **Node.js** (JavaScript côté serveur)
- **Express.js** (framework HTTP léger et rapide)
- **MySQL2** (client pour interagir avec la base de données MySQL)
- **dotenv** (pour la gestion des variables d’environnement)
- **jsonwebtoken** (gestion des tokens JWT pour l’authentification)
- **bcryptjs** (hachage sécurisé des mots de passe)
- **cors** (autorisation des requêtes cross-origin)
- **morgan** (logs de requêtes HTTP pour le développement)
- **Nodemon** (utilitaire pour recharger automatiquement le serveur en développement)

---

## 📁 Structure du projet

backend/
├── controllers/
│   ├── authController.js
│   ├── budgetController.js
│   ├── categoryController.js
│   ├── reportController.js
│   ├── settingsController.js
│   ├── transactionsController.js
│   └── usersController.js
├── models/
│   ├── authModel.js
│   ├── budgetModel.js
│   ├── categoryModel.js
│   ├── reportModel.js
│   ├── settingsModel.js
│   ├── transactionsModel.js
│   └── usersModel.js
├── routes/
│   ├── auth.js
│   ├── budget.js
│   ├── categories.js
│   ├── reports.js
│   ├── settings.js
│   ├── transactions.js
│   └── users.js
├── database/
│   ├── connection.js
│   ├── errorHandler.js
│   ├── jwtHelper.js
│   ├── passwordUtils.js
│   ├── queries.js
│   └── schema.sql (à créer)
├── middleware/
│   └── authMiddleware.js
├── utils/
│   ├── errorHandler.js
│   ├── jwtHelper.js
│   └── passwordUtils.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js

Fonctionnalités principales

✅ Authentification sécurisée (inscription, connexion, JWT, hash des mots de passe)

✅ Gestion des utilisateurs (profil, suppression, mise à jour)

✅ Création et suivi de budgets

✅ Enregistrement des transactions (recettes, dépenses)

✅ Catégorisation des transactions

✅ Paramètres personnalisés par utilisateur

✅ Génération de rapports de dépenses et revenus

✅ Protection des routes par middleware JWT

✅ Modularisation claire (MVC, helpers, middleware, etc.)

Exemples d’Endpoints

Authentification
POST /auth/register → Créer un nouveau compte utilisateur

POST /auth/login → Connexion avec génération de token JWT

Utilisateurs
GET /users → Récupérer tous les utilisateurs

PUT /users/:id → Mettre à jour un utilisateur

DELETE /users/:id → Supprimer un utilisateur
Transactions
POST /transactions → Créer une nouvelle transaction

GET /transactions/:userId → Récupérer les transactions d’un utilisateur

Budgets
POST /budget → Définir un budget mensuel

GET /budget/:userId → Récupérer le budget d’un utilisateur

Catégories
GET /categories → Liste des catégories disponibles
Paramètres
GET /settings/:userId → Voir les paramètres

PUT /settings/:userId → Modifier les paramètres

Rapports
GET /reports/:userId → Générer un rapport personnalisé


✅ Bonnes pratiques suivies
Séparation claire des responsabilités

Gestion centralisée des erreurs

Middleware d’authentification

Réutilisation de code avec des utilitaires

Routes RESTful

🔐 Sécurité
Mots de passe hashés avec bcryptjs

Authentification via tokens JWT

Protection des routes sensibles

Variables d’environnement sécurisées avec dotenv


------


Étapes à venir

🔧 Création des tables SQL :
Le fichier database/schema.sql sera rempli pour créer toutes les tables nécessaires à l’application.

🧪 Tests avec Postman :
Tous les endpoints seront testés un par un (méthodes GET, POST, PUT, DELETE) pour valider le fonctionnement de l'API.

💻 Développement du Frontend :
Une fois la partie backend testée et fonctionnelle, nous développerons l’interface utilisateur avec HTML, CSS, JS (et éventuellement React).

