import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications


const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from sessionStorage if not logged in
    const loadCart = () => {
      const savedCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      setCart(savedCart);
    };
    loadCart();
  }, []);

  const addToCart = (item, userId) => {
    // Load cart from sessionStorage
    const savedCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];

    // Debugging statement: Print existing cart
    console.log("Existing cart:", savedCart);
    
    // Check if the item already exists in the cart
    const existingItemIndex = savedCart.findIndex(cartItem => cartItem.productId === item.productId);

    // Debugging statement: Print item to add and its index in the cart
    console.log("Item to add:", item);
    console.log("Existing item index:", existingItemIndex);

    let updatedCart;

    if (existingItemIndex !== -1) {
      // If item exists, update quantity
      updatedCart = savedCart.map((cartItem, index) =>
        index === existingItemIndex
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    } else {
      // If item does not exist, add it to the cart
      updatedCart = [...savedCart, item];
    }

    // Debugging statement: Print updated cart before saving
    console.log("Updated cart:", updatedCart);

    // Update state and sessionStorage
    setCart(updatedCart);
    sessionStorage.setItem('guestCart', JSON.stringify(updatedCart));

    if (userId) {
      // Save cart in database for logged-in users
      // Implement API call to save cart here
    }
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('guestCart');

     // Show toast notification
     toast.info('Cart has been cleared!', {
      position: "top-right",
      autoClose: 750, // Duration of the toast
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
