// backend/models/Facility.js
const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  facility_name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Assuming you store image paths or URLs
});

module.exports = mongoose.model('Facility', FacilitySchema);
