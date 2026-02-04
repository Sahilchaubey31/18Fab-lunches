import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        
        <div className="order-details">
          <h3>📋 Order Details</h3>
          <p><strong>Order Number:</strong> #{orderNumber}</p>
          <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
          <p><strong>Tracking:</strong> You'll receive tracking info via email</p>
        </div>

        <div className="success-actions">
          <button 
            className="btn" 
            onClick={() => navigate('/products')}
          >
            🛍️ Continue Shopping
          </button>
          <button 
            className="btn" 
            style={{ background: '#28a745' }}
            onClick={() => navigate('/')}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;