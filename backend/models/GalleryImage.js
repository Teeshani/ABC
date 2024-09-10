// backend/models/GalleryImage.js
const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  heading: { type: String, required: true },
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
