const express = require('express');
const router = express.Router();
const {
  getGameState,
  updateSquare,
  resetGame,
} = require('../controllers/gameController');

router.get('/state', getGameState);
router.post('/square', updateSquare);
router.post('/reset', resetGame);

module.exports = router;

