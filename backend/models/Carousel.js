// models/Carousel.js
const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  image_path: String,
  alt_text: String,
  overlay_title: String,
  overlay_content: String,
  button_link: String,
  button_text: String,
});

module.exports = mongoose.model('Carousel', carouselSchema);

