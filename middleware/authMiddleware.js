// Import de la bibliothèque jsonwebtoken pour gérer les tokens JWT
const jwt = require('jsonwebtoken');

// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Récupérer la clé secrète utilisée pour signer et vérifier les tokens JWT
const SECRET_KEY = process.env.JWT_SECRET;

/**
 * Middleware pour authentifier les requêtes HTTP via un token JWT
 * @param {object} req - objet requête Express
 * @param {object} res - objet réponse Express
 * @param {function} next - fonction pour passer au middleware suivant
 */
function authenticateToken(req, res, next) {
  // Récupérer l'en-tête Authorization (ex: "Bearer <token>")
  const authHeader = req.headers['authorization'];

  // Extraire le token JWT (la partie après "Bearer ")
  const token = authHeader && authHeader.split(' ')[1];

  // Si aucun token n'est présent dans l'en-tête, refuser l'accès
  if (!token) {
    return res.status(401).json({ message: 'Token manquant, accès refusé' });
  }

  // Vérifier la validité du token avec la clé secrète
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      // Token invalide ou expiré : refuser l'accès
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }

    // Token valide : attacher les informations utilisateur à la requête
    req.user = user;

    // Passer la main au middleware ou route suivante
    next();
  });
}

// Exporter le middleware pour l'utiliser dans d'autres fichiers (routes)
module.exports = authenticateToken;
