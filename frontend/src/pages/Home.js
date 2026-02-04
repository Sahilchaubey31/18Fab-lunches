import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories] = useState([
    { id: 1, name: 'Electronics', icon: '💻', count: '50+ items' },
    { id: 2, name: 'Fashion', icon: '👕', count: '100+ items' },
    { id: 3, name: 'Home & Garden', icon: '🏠', count: '75+ items' },
    { id: 4, name: 'Sports', icon: '⚽', count: '30+ items' }
  ]);
  const [offers] = useState([
    { id: 1, title: 'Summer Sale', discount: '50% OFF', description: 'On all electronics', color: '#ff6b6b' },
    { id: 2, title: 'Free Shipping', discount: 'FREE', description: 'Orders over $50', color: '#4ecdc4' },
    { id: 3, title: 'New Customer', discount: '20% OFF', description: 'First purchase', color: '#45b7d1' }
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const notification = document.createElement('div');
    notification.innerHTML = '✅ Product added to cart!';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      padding: 1rem 2rem;
      border-radius: 10px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h2>🌟 Welcome to ShopEase</h2>
        <p>Discover amazing products at unbeatable prices</p>
        <button className="btn" style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
          🛍️ Shop Now
        </button>
      </section>

      {/* Special Offers Section */}
      <section style={{ padding: '4rem 2rem', background: '#f8f9fa' }}>
        <h2 className="page-title">🎁 Special Offers</h2>
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card" style={{ borderLeft: `5px solid ${offer.color}` }}>
              <div className="offer-discount" style={{ color: offer.color }}>{offer.discount}</div>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <button className="btn" style={{ background: offer.color }}>Claim Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '4rem 2rem', background: 'white' }}>
        <h2 className="page-title">🏷️ Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ background: '#f8f9fa' }}>
        <h2 className="page-title">✨ Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '4rem 2rem', background: 'white' }}>
        <h2 className="page-title">🎯 Why Choose ShopEase?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Free delivery on orders over $50</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>100% secure payment processing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free returns</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer service</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
        <h2>📧 Stay Updated</h2>
        <p style={{ marginBottom: '2rem' }}>Subscribe to get special offers and updates</p>
        <div className="newsletter-form">
          <input 
            type="email" 
            placeholder="Enter your email" 
            style={{ 
              padding: '1rem', 
              borderRadius: '25px', 
              border: 'none', 
              marginRight: '1rem',
              minWidth: '250px'
            }} 
          />
          <button className="btn" style={{ background: 'white', color: '#667eea' }}>
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;