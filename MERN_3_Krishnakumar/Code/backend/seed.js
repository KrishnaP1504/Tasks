const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    price: 83000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
    stock: 10,
  },
  {
    name: 'Smartphone',
    description: 'Latest smartphone with 128GB storage and dual camera',
    price: 58000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    stock: 25,
  },
  {
    name: 'Headphones',
    description: 'Wireless noise-cancelling headphones with premium sound',
    price: 21000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    stock: 50,
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 17000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    stock: 30,
  },
  {
    name: 'Tablet',
    description: '10-inch tablet with 64GB storage and stylus support',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    stock: 15,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

