const express = require('express');
const multer = require('multer');
const path = require('path');
const Reservation = require('../models/Reservation');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Reservation endpoint
router.post('/reserve', upload.single('paymentSlip'), async (req, res) => {
  try {
    const { name, email, phone, date, time, seats, userId } = req.body;
    const paymentSlip = req.file?.path;

    if (!paymentSlip) {
      return res.status(400).json({ error: 'Payment slip upload failed.' });
    }

    // Create a new reservation
    const reservation = new Reservation({
      userId, // Save the user ID
      name,
      email,
      phone,
      date,
      time,
      seats,
      paymentSlip,
    });

    // Save reservation and get the auto-incremented ID
    const savedReservation = await reservation.save();
    res.status(201).json({ message: 'Reservation successful.', reservationId: savedReservation.reservationId });
  } catch (error) {
    console.error('Error making reservation:', error);
    res.status(500).json({ error: 'Failed to make a reservation. Please try again.' });
  }
});

module.exports = router;
