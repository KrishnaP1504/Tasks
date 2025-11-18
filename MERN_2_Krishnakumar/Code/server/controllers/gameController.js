const GameState = require('../models/GameState');

// Get current game state
exports.getGameState = async (req, res) => {
  try {
    let gameState = await GameState.findOne().sort({ createdAt: -1 });
    
    if (!gameState) {
      // Initialize a new game state
      gameState = await initializeGameState();
    }
    
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update square color
exports.updateSquare = async (req, res) => {
  try {
    const { row, col } = req.body;
    
    let gameState = await GameState.findOne().sort({ createdAt: -1 });
    
    if (!gameState) {
      gameState = await initializeGameState();
    }
    
    const square = gameState.board[row][col];
    const originalColor = square.originalColor;
    
    // Toggle color: white -> yellow, black -> red
    // If already changed, revert to original
    if (square.currentColor === originalColor) {
      square.currentColor = originalColor === 'white' ? 'yellow' : 'red';
    } else {
      square.currentColor = originalColor;
    }
    
    gameState.updatedAt = Date.now();
    await gameState.save();
    
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reset game state
exports.resetGame = async (req, res) => {
  try {
    const gameState = await initializeGameState();
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Initialize a new game state with 8x8 chess board
const initializeGameState = async () => {
  const board = [];
  
  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      const isWhite = (row + col) % 2 === 0;
      board[row][col] = {
        row,
        col,
        originalColor: isWhite ? 'white' : 'black',
        currentColor: isWhite ? 'white' : 'black',
      };
    }
  }
  
  const gameState = new GameState({ board });
  await gameState.save();
  return gameState;
};

