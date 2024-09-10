// backend/routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/GalleryImage');

// Fetch all gallery images grouped by headings
router.get('/', async (req, res) => {
  try {
    // Group images by headings
    const images = await GalleryImage.find();
    const groupedImages = images.reduce((acc, image) => {
      if (!acc[image.heading]) {
        acc[image.heading] = [];
      }
      acc[image.heading].push(image);
      return acc;
    }, {});

    res.status(200).json(groupedImages);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images.' });
  }
});

module.exports = router;
