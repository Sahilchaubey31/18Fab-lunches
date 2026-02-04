import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🛍️ ShopEase</h1>
        
        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>📦 Products</Link>
          <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>❤️ Wishlist</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>🛒 Cart</Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>👤 Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;