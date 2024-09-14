import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { getProductById, getSimilarProducts } from '../services/api';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import { useUser } from '../context/UserContext'; // Assuming you have a UserContext for managing user data
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Destructure the addToCart function from context
  const { user } = useUser(); // Get the user object from the UserContext

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);

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

    const cartItem = {
      productId: product._id,
      product_name: product.title,
      price: product.price,
      quantity: parseInt(quantity, 10),
      main_image: product.image_path,
      size: 'Default Size', // Set this based on your product details or user selection
    };

    if (user && user.isLoggedIn) {
      addToCart(cartItem, user.id);
    } else {
      const existingCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      const existingItemIndex = existingCart.findIndex(item => item.productId === cartItem.productId);

      let updatedCart;

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        updatedCart = existingCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + cartItem.quantity }
            : item
        );
      } else {
        // Item does not exist, add new item
        updatedCart = [...existingCart, cartItem];
      }

      // Update session storage
      sessionStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }

    toast.success('Item added to cart!', {
      autoClose: 750, // Duration in milliseconds (3 seconds)
      onClose: () => window.location.reload() // Reload the page when the toast closes
    });
  };

  return (
    <div className="container-products">
      <ToastContainer />
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
          <p><strong>Description:</strong></p>
          <p>{product.description}</p>
          <form onSubmit={handleAddToCart}>
            <label id="quantity-label" htmlFor="quantity">
              <strong>Quantity:</strong>
            </label>
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

      
      
    </div>
  );
};

export default ProductDetails;
