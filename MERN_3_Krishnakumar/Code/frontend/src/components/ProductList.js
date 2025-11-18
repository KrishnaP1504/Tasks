import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="product-list-loading">Loading products...</div>;
  }

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products available. Please add some products to the database.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="product-stock">
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product._id, 1)}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;

