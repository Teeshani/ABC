const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_path: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  popular: { type: Boolean, default: false },
  eligible: { type: Boolean, default: false },
});

// Add a text index for the title field
productSchema.index({ title: 'text' });

module.exports = mongoose.model('items', productSchema);
