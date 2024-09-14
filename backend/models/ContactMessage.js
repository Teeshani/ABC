// backend/models/ContactMessage.js
const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // Optional: Can be empty if no userId
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  feedback: { type: String, default: 'pending' },
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
