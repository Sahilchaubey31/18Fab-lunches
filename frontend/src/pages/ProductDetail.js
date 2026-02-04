import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  // Sample detailed product data
  const getDetailedProduct = (baseProduct) => {
    const detailedProducts = {
      1: {
        ...baseProduct,
        images: [
          'https://via.placeholder.com/500x400/667eea/white?text=Laptop+Front',
          'https://via.placeholder.com/500x400/764ba2/white?text=Laptop+Side',
          'https://via.placeholder.com/500x400/28a745/white?text=Laptop+Back',
          'https://via.placeholder.com/500x400/dc3545/white?text=Laptop+Open',
          'https://via.placeholder.com/500x400/ffc107/white?text=Laptop+Ports'
        ],
        rating: 4.5,
        reviews: 89,
        specifications: {
          'Processor': 'Intel Core i7-12700H',
          'RAM': '16GB DDR4',
          'Storage': '512GB SSD',
          'Display': '15.6" Full HD IPS',
          'Graphics': 'NVIDIA RTX 3060',
          'Battery': '6-cell Li-ion',
          'Weight': '2.3 kg',
          'OS': 'Windows 11'
        },
        features: [
          'Backlit Keyboard',
          'Fingerprint Scanner',
          'Wi-Fi 6',
          'Bluetooth 5.2',
          'USB-C Charging',
          '2 Year Warranty'
        ],
        customerReviews: [
          { id: 1, name: 'John D.', rating: 5, comment: 'Excellent laptop for gaming and work!', date: '2024-01-15' },
          { id: 2, name: 'Sarah M.', rating: 4, comment: 'Great performance, battery could be better.', date: '2024-01-10' },
          { id: 3, name: 'Mike R.', rating: 5, comment: 'Perfect for programming and design work.', date: '2024-01-05' }
        ]
      },
      2: {
        ...baseProduct,
        images: [
          'https://via.placeholder.com/500x400/667eea/white?text=Phone+Front',
          'https://via.placeholder.com/500x400/764ba2/white?text=Phone+Back',
          'https://via.placeholder.com/500x400/28a745/white?text=Phone+Side',
          'https://via.placeholder.com/500x400/dc3545/white?text=Phone+Camera',
          'https://via.placeholder.com/500x400/ffc107/white?text=Phone+Screen'
        ],
        rating: 4.8,
        reviews: 156,
        specifications: {
          'Display': '6.7" OLED Super Retina',
          'Processor': 'A17 Pro Chip',
          'Storage': '256GB',
          'Camera': '48MP Triple Camera',
          'Battery': '4422 mAh',
          'OS': 'iOS 17',
          'Weight': '221g',
          '5G': 'Yes'
        },
        features: [
          'Face ID',
          'Wireless Charging',
          'Water Resistant IP68',
          'MagSafe Compatible',
          'Ceramic Shield',
          '1 Year Warranty'
        ],
        customerReviews: [
          { id: 1, name: 'Emma L.', rating: 5, comment: 'Amazing camera quality and performance!', date: '2024-01-20' },
          { id: 2, name: 'David K.', rating: 5, comment: 'Best phone I\'ve ever owned.', date: '2024-01-18' },
          { id: 3, name: 'Lisa P.', rating: 4, comment: 'Great phone, expensive but worth it.', date: '2024-01-12' }
        ]
      }
    };
    
    return detailedProducts[baseProduct.id] || {
      ...baseProduct,
      images: [baseProduct.imageUrl, baseProduct.imageUrl, baseProduct.imageUrl],
      rating: 4.0,
      reviews: 25,
      specifications: { 'Brand': 'ShopEase', 'Model': baseProduct.name },
      features: ['High Quality', 'Fast Shipping', '1 Year Warranty'],
      customerReviews: []
    };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        const detailedProduct = getDetailedProduct(data);
        setProduct(detailedProduct);
        
        const allProducts = await getProducts();
        const related = allProducts.filter(p => p.id !== parseInt(id)).slice(0, 3);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = (productToAdd, qty = 1) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === productToAdd.id);
    
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.push({ ...productToAdd, quantity: qty });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const notification = document.createElement('div');
    notification.innerHTML = `✅ ${qty} item(s) added to cart!`;
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

  const handleBookNow = () => {
    handleAddToCart(product, quantity);
    // Navigate to checkout or show booking confirmation
    alert(`📋 Booking confirmed for ${quantity} x ${product.name}!`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="loading">Product not found</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
            />
          </div>
          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <StarRating rating={product.rating} reviews={product.reviews} size="large" />
          
          <div className="price-section">
            <span className="current-price">${product.price}</span>
            <span className="stock-status">
              {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
            </span>
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => handleAddToCart(product, quantity)}
              disabled={product.stock === 0}
            >
              🛒 Add to Cart
            </button>
            <button 
              className="btn btn-book"
              onClick={handleBookNow}
              disabled={product.stock === 0}
            >
              📋 Book Now
            </button>
          </div>

          <div className="key-features">
            <h4>Key Features:</h4>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-tabs">
        <div className="tab-headers">
          <button 
            className={activeTab === 'description' ? 'active' : ''}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={activeTab === 'specifications' ? 'active' : ''}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-tab">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              <p>This premium {product.name.toLowerCase()} offers exceptional performance and reliability. 
              Perfect for both professional and personal use, it combines cutting-edge technology 
              with user-friendly design.</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="specifications-tab">
              <h3>Technical Specifications</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-label">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <h3>Customer Reviews</h3>
              <div className="reviews-summary">
                <div className="rating-breakdown">
                  <StarRating rating={product.rating} reviews={product.reviews} size="large" />
                  <span className="rating-text">{product.rating} out of 5 stars</span>
                </div>
              </div>
              
              <div className="reviews-list">
                {product.customerReviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <strong>{review.name}</strong>
                      <StarRating rating={review.rating} />
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2 className="page-title">🔗 Related Products</h2>
          <div className="products-grid">
            {relatedProducts.map(relatedProduct => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;