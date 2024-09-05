import React, { useState, useEffect } from 'react';
import './NewArrivals.css';
import { Link } from 'react-router-dom';
import loveImage from '../assets/images/love.png';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/popular');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 id="main-title">Popular Dishes</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <a href={`/product/${product._id}`}>
                <img
                  src={`http://localhost:5000/images/${product.image_path}`}
                  alt={product.title}
                />
                <h3>{product.title}</h3>
                <p>LKR {product.price.toFixed(2)}</p>
              </a>
              {/* Replace with your actual image path */}
<a href="#" className="wishlist-icon">
  <img 
    src={loveImage} 
    alt="Add to Wishlist" 
    className="wishlist-image" 
  />
</a>

            </div>
          ))
        ) : (
          <div>No new arrivals found.</div>
        )}
      </div>
      
      <div className="view-all-btn-container">
        <a href="/newarrivals" className="view-all-btn">View</a>
      </div>

    </div>
  );
};

export default NewArrivals;
