function handleError(res, error, message = 'Erreur interne du serveur') {
  console.error(error);
  res.status(500).json({ message, error: error.message });
}

module.exports = {
  handleError,
};
