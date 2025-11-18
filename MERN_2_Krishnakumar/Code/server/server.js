const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/game', require('./routes/gameRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chess-game';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

module.exports = app;

