import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <h2 className="page-title">Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <div>
            <h4>{item.name}</h4>
            <p>${item.price}</p>
          </div>
          <div className="cart-controls">
            <button 
              className="btn" 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button 
              className="btn" 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button 
              className="btn" 
              onClick={() => removeItem(item.id)}
              style={{ background: '#dc3545' }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <strong>Total: ${getTotalPrice()}</strong>
      </div>
      <div className="checkout-section">
        <button 
          className="btn checkout-btn"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;