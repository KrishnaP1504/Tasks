const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get or create cart
const getCart = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest';
    let cart = await Cart.findOne({ userId }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
      await cart.save();
    }
    
    cart.calculateTotal();
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.query.userId || 'guest';
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }
    
    cart.calculateTotal();
    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update item quantity
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.query.userId || 'guest';
    
    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    const product = await Product.findById(item.product);
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }
    
    item.quantity = quantity;
    cart.calculateTotal();
    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.query.userId || 'guest';
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    cart.calculateTotal();
    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest';
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = [];
    cart.total = 0;
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};

