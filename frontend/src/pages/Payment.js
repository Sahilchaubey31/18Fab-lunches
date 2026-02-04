import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [billingInfo, setBillingInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const billing = JSON.parse(localStorage.getItem('billingInfo') || '{}');
    setCartItems(cart);
    setBillingInfo(billing);

    if (cart.length === 0 || !billing.firstName) {
      navigate('/cart');
    }
  }, [navigate]);

  const handleCardInputChange = (e) => {
    let value = e.target.value;
    
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (value.length > 5) value = value.substring(0, 5);
    }
    
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) value = value.substring(0, 3);
    }

    setCardInfo({
      ...cardInfo,
      [e.target.name]: value
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      localStorage.removeItem('cart');
      localStorage.removeItem('billingInfo');
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2 className="page-title">💳 Payment</h2>
      
      <div className="payment-grid">
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
          
          <div className="billing-summary">
            <h4>📍 Billing Address</h4>
            <p>{billingInfo.firstName} {billingInfo.lastName}</p>
            <p>{billingInfo.address}</p>
            <p>{billingInfo.city}, {billingInfo.state} {billingInfo.zipCode}</p>
          </div>
          
          <div className="order-total">
            <strong>Total: ${getTotalPrice()}</strong>
          </div>
        </div>

        {/* Payment Form */}
        <div className="payment-form">
          <h3>💰 Payment Method</h3>
          
          {/* Payment Method Selection */}
          <div className="payment-methods">
            <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💳 Credit/Debit Card</span>
            </label>
            
            <label className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>🅿️ PayPal</span>
            </label>
            
            <label className={`payment-option ${paymentMethod === 'apple' ? 'active' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="apple"
                checked={paymentMethod === 'apple'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>🍎 Apple Pay</span>
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            {paymentMethod === 'card' && (
              <div className="card-form">
                <div className="form-group">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardInfo.cardName}
                    onChange={handleCardInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardInfo.expiryDate}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardInfo.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="paypal-form">
                <p>You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}

            {paymentMethod === 'apple' && (
              <div className="apple-pay-form">
                <p>Use Touch ID or Face ID to pay with Apple Pay.</p>
              </div>
            )}

            <button 
              type="submit" 
              className="btn checkout-btn"
              disabled={processing}
            >
              {processing ? '⏳ Processing...' : `🔒 Pay $${getTotalPrice()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;