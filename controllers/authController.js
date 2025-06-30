const authModel = require('../models/authModel');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtHelper');

// Clé secrète retirée d'ici pour être dans jwtHelper (ou .env)

// Fonction pour gérer l'inscription d'un utilisateur
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await authModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Utilisation du hashage via passwordUtils
    const hashedPassword = await hashPassword(password);

    const userId = await authModel.createUser(username, email, hashedPassword);

    res.status(201).json({ message: 'Utilisateur créé', userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Fonction pour gérer la connexion d'un utilisateur
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await authModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Utilisation de la comparaison via passwordUtils
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Utilisation de la génération du token via jwtHelper
    const token = generateToken({ id: user.id, email: user.email });

    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
};
