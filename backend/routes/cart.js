// routes/cart.js
const express = require('express');
const router = express.Router();

// Add item to cart
router.post('/add-to-cart', (req, res) => {
  const { productId, product_name, price, quantity, main_image, size } = req.body;

  // Initialize the cart array if not present in the session
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Check if the item already exists in the cart
  const existingItem = req.session.cart.find(item => item.productId === productId);

  if (existingItem) {
    // Update the quantity if the item exists
    existingItem.quantity += quantity;
  } else {
    // Add the new item to the cart
    req.session.cart.push({ productId, product_name, price, quantity, main_image, size });
  }

  // Save the session with the updated cart
  req.session.save(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save session.' });
    }
    res.status(200).json({ message: 'Item added to cart.', cart: req.session.cart });
  });
});

// Get cart items
router.get('/cart', (req, res) => {
  res.status(200).json({ cart: req.session.cart || [] });
});

// Clear cart
router.post('/clear-cart', (req, res) => {
  req.session.cart = [];
  req.session.save(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to clear cart.' });
    }
    res.status(200).json({ message: 'Cart cleared.' });
  });
});

module.exports = router;
