const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour l'inscription d'un nouvel utilisateur
router.post('/register', authController.register);

// Route pour la connexion d'un utilisateur existant
router.post('/login', authController.login);

module.exports = router;
