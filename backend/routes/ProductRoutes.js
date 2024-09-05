const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET popular products (limit to 3)
router.get('/products/popular', async (req, res) => {
  try {
    const products = await Product.find({ popular: true }).limit(3);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  
});


// Get product details by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get similar products by category
router.get('/similar/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(3);
    res.json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

});

module.exports = router;
