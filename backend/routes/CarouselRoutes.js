// routes/CarouselRoutes.js
const express = require('express');
const router = express.Router();
const Carousel = require('../models/Carousel');

// GET all carousel items
router.get('/', async (req, res) => {
  try {
    const carousels = await Carousel.find();
    res.json(carousels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
