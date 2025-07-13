/**
 * Middleware Express pour gérer les erreurs de façon centralisée
 * 
 * @param {Error} err - L'objet représentant l'erreur
 * @param {Request} req - La requête Express
 * @param {Response} res - La réponse Express
 * @param {NextFunction} next - Fonction pour passer au middleware suivant
 */
function errorHandler(err, req, res, next) {
  // Log complet de l'erreur côté serveur
  console.error('[ERREUR SERVEUR]', err.stack);

  // Envoie une réponse générique pour éviter de divulguer des infos sensibles
  res.status(500).json({
    error: 'Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.',
    details: err.message, // Optionnel : peut être supprimé en prod
  });
}

module.exports = errorHandler;
