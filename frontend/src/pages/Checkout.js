import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const handleInputChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('billingInfo', JSON.stringify(billingInfo));
    navigate('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <button className="btn" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="page-title">🛒 Checkout</h2>
      
      <div className="checkout-grid">
        {/* Order Summary */}
        <div className="order-summary">
          <h3>📋 Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} className="checkout-item">
              <img src={item.imageUrl || 'https://via.placeholder.com/60x60'} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity}</p>
              </div>
              <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="order-total">
            <strong>Total: ${getTotalPrice()}</strong>
          </div>
        </div>

        {/* Billing Form */}
        <div className="billing-form">
          <h3>📍 Billing Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={billingInfo.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={billingInfo.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={billingInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={billingInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={billingInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={billingInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={billingInfo.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={billingInfo.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Country</label>
              <select
                name="country"
                value={billingInfo.country}
                onChange={handleInputChange}
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>

            <button type="submit" className="btn checkout-btn">
              Continue to Payment 💳
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;