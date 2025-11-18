const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Note: The server will still run, but database operations will fail.');
    console.error('Please make sure MongoDB is running and the connection string is correct.');
    // Don't exit - allow server to run for quote fetching even without DB
  }
};

module.exports = connectDB;

