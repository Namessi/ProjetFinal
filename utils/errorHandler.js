/**
 * Middleware Express pour gérer les erreurs de façon centralisée
 * @param {Error} err - L'objet erreur
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log de l'erreur dans la console serveur

  // Envoie une réponse générique 500 Internal Server Error
  res.status(500).json({
    error: 'Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.',
    details: err.message, // Optionnel, tu peux l'enlever en prod
  });
}

module.exports = errorHandler;
