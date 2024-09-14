// backend/controllers/reservationController.js
const Reservation = require('../models/Reservation');
const path = require('path');

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, seats } = req.body;
    const paymentSlip = req.file ? req.file.filename : null; // Get the uploaded file name

    if (!paymentSlip) {
      return res.status(400).json({ message: 'Payment slip is required' });
    }

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      seats,
      paymentSlip,
    });

    await newReservation.save();

    res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createReservation };
