// backend/__tests__/productRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const productRoutes = require('../routes/productRoutes');
const Product = require('../models/Product');

let app;
let mongoServer;

beforeAll(async () => {
  // Set up in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Set up the Express app and routes
  app = express();
  app.use(express.json());
  app.use('/api', productRoutes);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Product Routes', () => {
  let testProduct;

  beforeEach(async () => {
    // Create a test product before each test
    testProduct = new Product({
      title: 'Test Product',
      image_path: 'test-product.png',
      price: 100,
      description: 'Test product description',
      quantity: 10,
      category: 'Dishes',
      popular: true,
    });
    await testProduct.save();
  });

  afterEach(async () => {
    // Clean up after each test
    await Product.deleteMany({});
  });

  test('GET /api/products/popular should retrieve popular products', async () => {
    const response = await request(app).get('/api/products/popular');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('title', 'Test Product');
  });

  test('GET /api/products/dishes should retrieve dishes', async () => {
    const response = await request(app).get('/api/products/dishes');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('category', 'Dishes');
  });

  test('GET /api/products/beverages should retrieve beverages', async () => {
    // Insert a beverage product for this test
    await new Product({
      title: 'Test Beverage',
      image_path: 'test-beverage.png',
      price: 50,
      description: 'Test beverage description',
      quantity: 20,
      category: 'Beverages',
    }).save();

    const response = await request(app).get('/api/products/beverages');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('category', 'Beverages');
  });

  test('GET /api/products/:id should retrieve a product by ID', async () => {
    const response = await request(app).get(`/api/products/${testProduct._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Test Product');
  });

  test('GET /api/similar/:id should retrieve similar products', async () => {
    // Insert another product in the same category
    await new Product({
      title: 'Similar Product',
      image_path: 'similar-product.png',
      price: 120,
      description: 'Similar product description',
      quantity: 5,
      category: 'Dishes',
    }).save();

    const response = await request(app).get(`/api/similar/${testProduct._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('title', 'Similar Product');
  });

  test('GET /api/products/:id should return 404 if product not found', async () => {
    const response = await request(app).get('/api/products/123456789012345678901234'); // Invalid ID
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Product not found');
  });
});
