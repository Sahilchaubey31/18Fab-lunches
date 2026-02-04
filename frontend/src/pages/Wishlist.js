import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(wishlist);
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

  const clearWishlist = () => {
    localStorage.removeItem('wishlist');
    setWishlistItems([]);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>❤️ Your Wishlist is Empty</h2>
        <p>Save items you love for later!</p>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2 className="page-title">❤️ My Wishlist</h2>
        <button className="btn btn-outline" onClick={clearWishlist}>
          Clear All
        </button>
      </div>
      
      <div className="products-grid">
        {wishlistItems.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;