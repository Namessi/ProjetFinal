const express = require('express');
const router = express.Router();

const rewardsController = require('../controllers/rewardsController');
const { authenticateToken } = require('../middleware/authMiddleware');

// =====================================================
// Ajouter des points ou une récompense
// POST /api/rewards/user/:userId
// Body : { points, type, description }
// =====================================================
router.post('/user/:userId', authenticateToken, rewardsController.addReward);

// =====================================================
// Obtenir les récompenses d’un utilisateur
// GET /api/rewards/user/:userId
// =====================================================
router.get('/user/:userId', authenticateToken, rewardsController.getRewardsByUser);

// =====================================================
// Supprimer une récompense
// DELETE /api/rewards/:rewardId
// =====================================================
router.delete('/:rewardId', authenticateToken, rewardsController.deleteReward);

module.exports = router;
