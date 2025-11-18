const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quote', quoteSchema);

