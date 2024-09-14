// backend/models/order.js
const mongoose = require('mongoose');

// Helper function to generate a custom order ID (e.g., "ORD12345")
const generateOrderId = () => {
  return 'ORD' + Math.floor(100000 + Math.random() * 900000); // Generates an ID like ORD123456
};

const OrderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    default: generateOrderId, // Generates a custom order ID
    unique: true,
  },
  billingDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
  },
  cartItems: [
    {
      productId: { type: String, required: true },
      product_name: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  newTotal: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('Order', OrderSchema);
