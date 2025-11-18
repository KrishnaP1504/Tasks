import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      const data = await response.json();
      setCart(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${itemId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/clear', {
        method: 'DELETE',
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shopping Cart Application</h1>
      </header>
      <div className="container">
        <ProductList onAddToCart={handleAddToCart} />
        <ShoppingCart
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}

export default App;

