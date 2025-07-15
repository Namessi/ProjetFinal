# Backend - Application de gestion de budget personnel

Ce dépôt contient **le backend complet** d'une application de gestion de budget personnel.  
Il s'agit d'un serveur API développé avec **Node.js**, structuré selon le modèle **MVC** (Modèle – Vue – Contrôleur), et connecté à une base de données **MySQL**.  
Ce backend gère l’ensemble des fonctionnalités liées aux utilisateurs, transactions, budgets, paramètres, catégories et rapports.

---

## 🔧 Technologies & Modules utilisés

- **Node.js** (JavaScript côté serveur)
- **Express.js** (framework HTTP léger et rapide)
- **MySQL2** (client pour interagir avec la base de données MySQL)
- **dotenv** (pour la gestion des variables d’environnement)
- **jsonwebtoken** (authentification via tokens JWT)
- **bcryptjs** (hachage sécurisé des mots de passe)
- **cors** (autorisation des requêtes cross-origin)
- **morgan** (logs de requêtes HTTP pour le développement)
- **nodemon** (rechargement automatique du serveur)

---

## 📁 Structure du projet

backend :
- controllers :
    - authController.js
    - budgetController.js
    - categoryController.js
    - reportController.js
    - settingsController.js
    - transactionsController.js
    - usersController.js
- models :
    - authModel.js
    - budgetModel.js
    - categoryModel.js
    - reportModel.js
    - settingsModel.js
    - transactionsModel.js
    - usersModel.js
- routes :
    - auth.js
    - budget.js
    - categories.js
    - reports.js
    - settings.js
    - transactions.js
    - users.js
- database :
    - connection.js
    - queries.sql (requêtes préparées ou inserts manuels)
- middleware :
    - authMiddleware.js
- utils :
    - jwtHelper.js
    - passwordUtils.js
    - errorHandler.js

Autres fichiers :
- .env
- .gitignore
- package.json
- package-lock.json
- server.js

---

## ✅ Fonctionnalités principales

- Authentification sécurisée (inscription, connexion, JWT, hash des mots de passe)
- Gestion complète des utilisateurs
- CRUD complet sur les transactions
- Gestion et suivi des budgets mensuels
- Paramètres personnalisés par utilisateur (thème, langue, notifications…)
- Catégorisation des dépenses et revenus
- Rapports personnalisés et statistiques mensuelles
- Middleware d’authentification et gestion des rôles (admin/utilisateur)
- Architecture MVC claire et évolutive

📌 Exemples d’Endpoints

Authentification

- POST /api/auth/register → Création d’un compte utilisateur
- POST /api/auth/login → Connexion et génération d’un token JWT

Utilisateurs

- GET /api/users → Liste des utilisateurs (admin uniquement)
- GET /api/users/:id → Récupérer un utilisateur
- PUT /api/users/:id → Modifier un utilisateur
- DELETE /api/users/:id → Supprimer un utilisateur

Transactions

- POST /api/transactions/user/:userId → Créer une transaction
- GET /api/transactions/user/:userId → Récupérer les transactions
- PUT /api/transactions/:transactionId → Modifier une transaction
- DELETE /api/transactions/:transactionId → Supprimer une transaction

Budgets

- POST /api/budgets → Créer un budget
- GET /api/budgets/:userId → Voir les budgets d’un utilisateur
- PUT /api/budgets/:budgetId → Mettre à jour un budget
- DELETE /api/budgets/:budgetId → Supprimer un budget

Catégories

- POST /api/categories → Créer une catégorie
- GET /api/categories/:userId → Récupérer catégories d’un utilisateur
- PUT /api/categories/:categoryId → Modifier une catégorie
- DELETE /api/categories/:categoryId → Supprimer une catégorie

Paramètres utilisateur

- GET /api/settings/:userId → Voir préférences
- PUT /api/settings/:userId → Modifier préférences

Rapports

- POST /api/reports → Créer un rapport
- GET /api/reports/:userId → Récupérer rapports
- GET /api/reports/detail/:reportId → Détails d’un rapport
- PUT /api/reports/:reportId → Mettre à jour un rapport
- DELETE /api/reports/:reportId → Supprimer un rapport

🧪 Tests réalisés (Postman)

Toutes les routes listées ci-dessus ont été testées avec succès, incluant :

- Inscription, connexion et JWT
- Gestion complète des utilisateurs, transactions, budgets, catégories
- Gestion des paramètres utilisateur
- CRUD complet des rapports personnalisés

✅ Bonnes pratiques

- Architecture MVC respectée
- Gestion centralisée des erreurs
- Protection des routes via middleware JWT
- Variables sensibles en .env
- Code clair, commenté et indenté
- Routes RESTful cohérentes
- Mots de passe hashés (bcryptjs)

🔐 Sécurité

- Authentification JWT avec clé secrète sécurisée
- Contrôle d’accès basé sur rôles (admin/utilisateur)
- Middleware d’authentification sur routes sensibles

📂 Étapes suivantes

- Développement frontend (React ou Angular à définir)
- Intégration complète avec ce backend
- Ajout de tests automatisés et optimisation

✍️ Auteur

Kossi Boris Namessi
Développeur Web Full Stack – Formation RNCP – 2025
📩 boris.namessi@outlook.fr