// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const Reservation = require('../models/Reservation'); 
const OnlineOrder = require('../models/order'); 

// Get counts for dashboard
router.get('/counts', async (req, res) => {
  try {
    const queryCount = await Query.countDocuments();
    const reservationCount = await Reservation.countDocuments();
    const onlineOrderCount = await OnlineOrder.countDocuments();

    res.json({
      queries: queryCount,
      reservations: reservationCount,
      onlineOrders: onlineOrderCount,
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
});



// Get all contact messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ date: -1 }); // Sort by most recent
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Fetch all reservations
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: -1 });
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});


// Fetch reservations for the logged-in user
router.get('/userreservations', async (req, res) => {
  try {
    const userId = req.query.userId;

    // Debug log to ensure userId is being received correctly
    console.log('Fetching reservations for userId:', userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Fetch reservations that belong to the logged-in user
    const reservations = await Reservation.find({ userId }).sort({ date: -1 });

    res.setHeader('Content-Type', 'application/json');
    res.json(reservations); // Send the reservations data as JSON
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});






// Fetch all online orders
router.get('/online-orders', async (req, res) => {
  try {
    const onlineOrders = await OnlineOrder.find().sort({ created_at: -1 });
    res.json(onlineOrders);
  } catch (error) {
    console.error('Error fetching online orders:', error);
    res.status(500).json({ error: 'Failed to fetch online orders' });
  }
});

// Fetch online orders for the logged-in user
router.get('/user-online-orders', async (req, res) => {
  try {
    const userId = req.query.userId;

    // Debug log to ensure userId is being received correctly
    console.log('Fetching online orders for userId:', userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Fetch online orders that belong to the logged-in user
    const onlineOrders = await OnlineOrder.find({ userId }).sort({ created_at: -1 });

    res.setHeader('Content-Type', 'application/json');
    res.json(onlineOrders); // Send the online orders data as JSON
  } catch (error) {
    console.error('Error fetching online orders:', error);
    res.status(500).json({ error: 'Failed to fetch online orders' });
  }
});


// routes/dashboardRoutes.js
router.post('/update-feedback', async (req, res) => {
  const { id, feedback } = req.body;

  if (!id || !feedback) {
    return res.status(400).json({ error: 'ID and feedback are required' });
  }

  try {
    const contactMessage = await ContactMessage.findByIdAndUpdate(
      id,
      { feedback },
      { new: true } // Return the updated document
    );

    if (!contactMessage) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json(contactMessage);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
});

// Update status for an online order
router.post('/update-order-status', async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: 'Order ID and status are required' });
  }

  try {
    const order = await OnlineOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Update status for a reservation
router.post('/update-reservation-status', async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: 'ID and status are required' });
  }

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(updatedReservation);
  } catch (error) {
    console.error('Error updating reservation status:', error);
    res.status(500).json({ error: 'Failed to update reservation status' });
  }
});


module.exports = router;
