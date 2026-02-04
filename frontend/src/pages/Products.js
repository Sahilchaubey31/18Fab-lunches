import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState('');

  const categories = ['Electronics', 'Mobile', 'Audio', 'Computing'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const extendedData = [
          ...data,
          { id: 11, name: 'Gaming Laptop', description: 'High-end gaming laptop', price: 1299.99, category: 'Computing', imageUrl: 'https://via.placeholder.com/250x200' },
          { id: 12, name: 'iPhone 15', description: 'Latest iPhone model', price: 899.99, category: 'Mobile', imageUrl: 'https://via.placeholder.com/250x200' },
          { id: 13, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 49.99, category: 'Electronics', imageUrl: 'https://via.placeholder.com/250x200' },
          { id: 14, name: 'Bluetooth Speaker', description: 'Portable speaker', price: 79.99, category: 'Audio', imageUrl: 'https://via.placeholder.com/250x200' },
          { id: 15, name: 'Smart Watch', description: 'Fitness tracking watch', price: 299.99, category: 'Electronics', imageUrl: 'https://via.placeholder.com/250x200' },
          { id: 16, name: 'Mechanical Keyboard', description: 'RGB gaming keyboard', price: 129.99, category: 'Computing', imageUrl: 'https://via.placeholder.com/250x200' }
        ];
        setAllProducts(extendedData);
        setFilteredProducts(extendedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === 'price-low') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, searchTerm, selectedCategory, priceRange, sortBy]);

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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 2000 });
    setSortBy('');
  };

  const closeFilters = () => {
    setShowFilters(false);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory) count++;
    if (priceRange.min > 0 || priceRange.max < 2000) count++;
    return count;
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="products-page">
      <h2 className="page-title">📦 All Products</h2>
      
      {/* Mobile Sticky Filter Bar */}
      <div className="mobile-filter-bar">
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          🔍 Filters
          {getActiveFiltersCount() > 0 && (
            <span className="filter-count">{getActiveFiltersCount()}</span>
          )}
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mobile-sort"
        >
          <option value="">Sort by</option>
          <option value="name">Name A-Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      
      <div className="products-layout">
        {/* Filter Panel */}
        <div className={`filter-panel ${showFilters ? 'show-mobile' : ''}`}>
          <div className="filter-header">
            <h3>🔍 Filters</h3>
            <div className="filter-actions">
              <button className="clear-filters" onClick={clearFilters}>Clear All</button>
              <button className="close-filters" onClick={closeFilters}>✕</button>
            </div>
          </div>

          <div className="filter-section">
            <h4>Search</h4>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h4>Category</h4>
            <div className="category-filters">
              <label>
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                All Categories
              </label>
              {categories.map(category => (
                <label key={category}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
              />
            </div>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                className="price-slider"
              />
              <div className="price-labels">
                <span>$0</span>
                <span>$2000+</span>
              </div>
            </div>
          </div>
        </div>

        <div className="products-content">
          <div className="products-header">
            <div className="results-count">
              Showing {currentProducts.length} of {filteredProducts.length} products
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select desktop-only"
            >
              <option value="">Sort by</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="products-grid">
            {currentProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn pagination-btn"
              >
                ← Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`btn pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn pagination-btn"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;