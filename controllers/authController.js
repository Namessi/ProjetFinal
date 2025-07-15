const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtHelper');
const authModel = require('../models/authModel');
const settingsModel = require('../models/settingsModel');

/**
 * Enregistre un nouvel utilisateur
 * POST /api/auth/register
 */
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validation des champs obligatoires
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    // Vérifier si l'email est déjà utilisé
    const existingUser = await authModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Cet e-mail est déjà utilisé.' });
    }

    // Hash du mot de passe pour la sécurité
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur en base de données
    const userId = await authModel.createUser(username, email, hashedPassword);

    // Récupérer l'utilisateur créé (pour récupérer son rôle, id, etc.)
    const user = await authModel.findUserByEmail(email);

    // Créer des paramètres par défaut pour le nouvel utilisateur
    await settingsModel.createDefaultSettings(user.id);

    // Génération du token JWT (payload avec id, email et rôle)
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role, // admin ou utilisateur
    });

    // Réponse avec les infos utilisateur et le token
    res.status(201).json({
      message: 'Utilisateur enregistré avec succès.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Erreur dans register :', error);
    res.status(500).json({ error: 'Erreur serveur lors de l’inscription' });
  }
}

/**
 * Connecte un utilisateur existant
 * POST /api/auth/login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validation des champs obligatoires
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    // Récupérer l'utilisateur par email
    const user = await authModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    // Vérifier le mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Génération du token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Réponse avec token et infos utilisateur
    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
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
