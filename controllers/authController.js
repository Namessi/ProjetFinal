// controllers/authController.js
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtHelper');
const authModel = require('../models/authModel');

/**
 * Enregistre un nouvel utilisateur
 * Route : POST /api/auth/register
 */
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Vérification des champs obligatoires
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await authModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Cet e-mail est déjà utilisé.' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Enregistrer l'utilisateur
    const userId = await authModel.createUser(username, email, hashedPassword);

    // Générer un token
    const token = generateToken({ id: userId, email });

    res.status(201).json({
      message: 'Utilisateur enregistré avec succès.',
      userId,
      token,
    });
  } catch (error) {
    console.error('Erreur dans register :', error);
    res.status(500).json({ error: 'Erreur serveur lors de l’inscription' });
  }
}

/**
 * Connecte un utilisateur existant
 * Route : POST /api/auth/login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    const user = await authModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Erreur dans login :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
}

module.exports = {
  register,
  login,
};

