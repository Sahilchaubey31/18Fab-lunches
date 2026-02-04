import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const ProductCard = ({ product, onAddToCart }) => {
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      const updated = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
    } else {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  };

  const isInWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.some(item => item.id === product.id);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.imageUrl || 'https://via.placeholder.com/280x200'} alt={product.name} />
        <button 
          className={`wishlist-btn ${isInWishlist() ? 'active' : ''}`}
          onClick={toggleWishlist}
        >
          {isInWishlist() ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <StarRating rating={product.rating || 4.0} reviews={product.reviews || 0} />
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        
        <div className="product-actions">
          <Link to={`/product/${product.id}`}>
            <button className="btn btn-outline">👁️ View</button>
          </Link>
          <button className="btn" onClick={() => onAddToCart(product)}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;