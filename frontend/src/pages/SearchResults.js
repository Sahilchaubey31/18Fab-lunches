import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        const extendedData = [
          ...allProducts,
          { id: 11, name: 'Gaming Laptop', description: 'High-end gaming laptop', price: 1299.99, category: 'Computing', rating: 4.5, reviews: 89 },
          { id: 12, name: 'iPhone 15', description: 'Latest iPhone model', price: 899.99, category: 'Mobile', rating: 4.8, reviews: 156 },
          { id: 13, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 49.99, category: 'Electronics', rating: 4.2, reviews: 34 },
          { id: 14, name: 'Bluetooth Speaker', description: 'Portable speaker', price: 79.99, category: 'Audio', rating: 4.6, reviews: 67 }
        ];
        
        const filtered = extendedData.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category?.toLowerCase().includes(query.toLowerCase())
        );
        
        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [query]);

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

  if (loading) return <div className="loading">Searching...</div>;

  return (
    <div className="search-results">
      <div className="search-header">
        <h2>🔍 Search Results</h2>
        {query && (
          <p>
            {products.length > 0 
              ? `Found ${products.length} results for "${query}"`
              : `No results found for "${query}"`
            }
          </p>
        )}
      </div>

      {products.length > 0 ? (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : query ? (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try different keywords or browse our categories</p>
        </div>
      ) : (
        <div className="no-query">
          <h3>Enter a search term</h3>
          <p>Use the search bar above to find products</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;