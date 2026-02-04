import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🛍️ ShopEase</h3>
          <p>Your one-stop destination for quality products at amazing prices.</p>
          <div className="social-links">
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
            <span>📺</span>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📧 support@shopease.com</p>
          <p>📞 1-800-SHOPEASE</p>
          <p>📍 123 Commerce St, City, State 12345</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;