const mongoose = require('mongoose');

const squareSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  col: { type: Number, required: true },
  originalColor: { type: String, required: true, enum: ['white', 'black'] },
  currentColor: { type: String, required: true },
});

const gameStateSchema = new mongoose.Schema({
  board: [[squareSchema]],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

gameStateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('GameState', gameStateSchema);

