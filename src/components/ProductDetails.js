// src/pages/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { getProductById, getSimilarProducts } from '../services/api'; // Import API functions

const ProductDetails = () => {
  const { id } = useParams(); // `id` is the MongoDB `_id` passed from the URL
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const productData = await getProductById(id);
        setProduct(productData);

        // Fetch similar products
        const similarData = await getSimilarProducts(id);
        setSimilarProducts(similarData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Implement add to cart functionality
    const cartItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: parseInt(quantity, 10),
      image_path: product.image_path,
    };
    // Add to cart logic (this could be a function that updates your cart state or API call)
    console.log('Adding to cart:', cartItem);
    // Example: addToCart(cartItem); // Define addToCart elsewhere to handle cart operations
  };

  return (
    <div className="container">
      <div className="product-details">
        <div className="product-images">
          <div className="main-image">
            <img
              id="mainImage"
              src={`http://localhost:5000/images/${product.image_path}`}
              alt={product.title}
            />
          </div>
        </div>
        <div className="product-info">
          <h3>{product.title}</h3>
          <p className="main-price">LKR {product.price.toFixed(2)}</p>
          <p><strong>Description:</strong> </p>
          <p>{product.description}</p>
          <form onSubmit={handleAddToCart}>
            <label id="quantity-label" htmlFor="quantity"><strong>Quantity:</strong></label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              min="1"
              max={product.quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button type="submit">Add to Cart</button>
          </form>
          {product.quantity === 0 && <p><strong>Out of Stock</strong></p>}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div>
          <h2 id="similar">Similar Products</h2>
          <div className="similar-products">
            {similarProducts.map((similarProduct) => (
              <div className="product-card" key={similarProduct._id}>
                <a href={`/product/${similarProduct._id}`}>
                  <img
                    src={`http://localhost:5000/images/${similarProduct.image_path}`}
                    alt={similarProduct.title}
                  />
                  <h3 id="pro-title">{similarProduct.title}</h3>
                  <p id="pro-phar">LKR {similarProduct.price.toFixed(2)}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

