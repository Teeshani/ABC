// backend/routes/facilityRoutes.js
const express = require('express');
const Facility = require('../models/Facility');
const router = express.Router();

// Get all facilities
router.get('/facilities', async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json(facilities);
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ error: 'Failed to fetch facilities.' });
  }
});

module.exports = router;
