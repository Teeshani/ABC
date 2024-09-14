// backend/routes/contactRoutes.js
const express = require('express');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

// Contact form submission route
router.post('/contact', async (req, res) => {
  const { name, email, message, userId } = req.body;

  try {
    // Save the contact message to the database
    const newMessage = new ContactMessage({
      userId, // This will be empty if the user is not logged in
      name,
      email,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to send your message. Please try again.' });
  }
});

module.exports = router;
