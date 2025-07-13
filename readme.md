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
- Création et connexion utilisateur
- Ajout de transactions avec catégories
- Définition de budgets mensuels personnalisés
- Paramètres personnalisés par utilisateur
- Catégorisation : dépenses / revenus
- Génération de rapports mensuels
- Middleware d'authentification sur routes sensibles
- Structure MVC claire et scalable

---

## 📌 Exemples d’Endpoints

### 🔐 Authentification
- `POST /api/auth/register` → Créer un nouveau compte utilisateur
- `POST /api/auth/login` → Connexion avec génération de token JWT

### 👤 Utilisateurs
- `GET /api/users` → Récupérer tous les utilisateurs
- `PUT /api/users/:id` → Mettre à jour un utilisateur
- `DELETE /api/users/:id` → Supprimer un utilisateur

### 💸 Transactions
- `POST /api/transactions/user/:userId` → Créer une transaction
- `GET /api/transactions/user/:userId` → Récupérer les transactions
- `PUT /api/transactions/:transactionId` → Modifier une transaction
- `DELETE /api/transactions/:transactionId` → Supprimer une transaction

### 📊 Budgets
- `POST /api/budget` → Définir un budget mensuel
- `GET /api/budget/:userId` → Voir les budgets d’un utilisateur

### 🗂️ Catégories
- `GET /api/categories` → Liste des 16 catégories (alimentation, logement, revenus...)

### ⚙️ Paramètres
- `GET /api/settings/:userId` → Voir les préférences utilisateur
- `PUT /api/settings/:userId` → Modifier thème, langue, etc.

### 📈 Rapports
- `GET /api/reports/:userId` → Statistiques mensuelles (revenus - dépenses)

---

## 🧪 Tests réalisés (Postman)

- ✅ `POST /auth/register` (Inscription) → OK
- ✅ `POST /auth/login` (Connexion + Token) → OK
- ✅ `POST /transactions/user/:userId` (Création transaction) → OK

🔜 **Les autres routes seront testées plus tard**, après ce premier commit stable.

---

## ✅ Bonnes pratiques respectées

- Séparation des responsabilités (controllers, routes, models)
- Gestion centralisée des erreurs
- Middleware d’authentification pour sécuriser les accès
- Réutilisation de fonctions utilitaires
- Nom des routes cohérent avec REST
- Variables sensibles dans un `.env`

---

## 🔐 Sécurité

- Mots de passe hashés avec bcryptjs
- Authentification via tokens JWT
- Protection des routes avec middleware `authMiddleware.js`
- Rôles insérés en base pour une gestion future des permissions

---

## 📂 Étapes suivantes

- Tester les routes restantes sur Postman (budgets, paramètres, rapports, utilisateurs…)
- Développer le **frontend de l’application**
- 💡 j'hésites encore entre **React** ou **Angular**
- Ce sera connecté à cette API backend

---

## ✍️ Auteur

Boris N.  
Développeur Web Full Stack – Formation RNCP – 2025  
📩 boris.namessi@outlook.fr
