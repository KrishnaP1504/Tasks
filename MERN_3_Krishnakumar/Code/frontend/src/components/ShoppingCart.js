import React from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="clear-cart-btn" onClick={onClearCart}>
          Clear Cart
        </button>
      </div>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={item.product?.image || 'https://via.placeholder.com/100'}
                alt={item.product?.name || 'Product'}
              />
            </div>
            <div className="cart-item-details">
              <h4>{item.product?.name || 'Unknown Product'}</h4>
              <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')} each</p>
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => {
                      if (item.quantity > 1) {
                        onUpdateQuantity(item._id, item.quantity - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
              <p className="cart-item-total">
                Total: ₹{((item.price * item.quantity).toLocaleString('en-IN'))}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span className="total-label">Total:</span>
          <span className="total-amount">₹{cart.total ? cart.total.toLocaleString('en-IN') : '0'}</span>
        </div>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;

