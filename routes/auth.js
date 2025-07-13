// routes/auth.js

// On importe Express et on initialise le routeur
const express = require('express');
const router = express.Router();

// On importe le contrôleur correspondant à l'authentification
const authController = require('../controllers/authController');

// =====================================================
// Route : inscription d’un nouvel utilisateur
// URL : POST /api/auth/register
// Accès : public
// =====================================================
router.post('/register', authController.register);

// =====================================================
// Route : connexion d’un utilisateur existant
// URL : POST /api/auth/login
// Accès : public
// =====================================================
router.post('/login', authController.login);

// On exporte le routeur pour l'utiliser dans server.js
module.exports = router;
