// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Create a new order
router.post('/', async (req, res) => {
  const { userId, billingDetails, cartItems, paymentMethod, discountAmount, newTotal } = req.body;

  // Basic validation
  if (!userId || !billingDetails || !cartItems || !paymentMethod || !newTotal) {
    return res.status(400).json({ message: 'All order details are required.' });
  }

  try {
    // Create a new order instance
    const newOrder = new Order({
      userId,
      billingDetails,
      cartItems,
      paymentMethod,
      discountAmount,
      newTotal,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Fetch the latest order for a specific user
router.get('/latest/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const latestOrder = await Order.findOne({ userId })
        .sort({ createdAt: -1 }) // Sort by creation date, descending
        .exec();
  
      if (!latestOrder) {
        return res.status(404).json({ message: 'No orders found for this user.' });
      }
  
      res.status(200).json(latestOrder);
    } catch (error) {
      console.error('Error fetching latest order:', error);
      res.status(500).json({ message: 'Failed to fetch order details.' });
    }
  });

module.exports = router;
