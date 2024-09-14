// __tests__/orderRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const orderRoutes = require('../routes/orderRoutes');
const Order = require('../models/order');

let app;
let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect to the in-memory database
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Set up the Express application
  app = express();
  app.use(express.json());
  app.use('/api/orders', orderRoutes);
});

afterAll(async () => {
  // Disconnect and stop the in-memory MongoDB server
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clear the database after each test
  await Order.deleteMany({});
});

describe('Order Routes', () => {
  it('should create a new order successfully', async () => {
    const newOrder = {
      userId: 1,
      billingDetails: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        contact: '1234567890',
        address: '123 Main St',
        district: 'District 9',
      },
      cartItems: [
        {
          productId: 'abc123',
          product_name: 'Pizza',
          size: 'Large',
          quantity: 1,
          price: 20,
        },
      ],
      paymentMethod: 'Credit Card',
      discountAmount: 5,
      newTotal: 15,
    };

    const response = await request(app).post('/api/orders').send(newOrder);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Order placed successfully!');

    // Verify that the order was saved in the database
    const savedOrder = await Order.findOne({ userId: newOrder.userId });
    expect(savedOrder).not.toBeNull();
    expect(savedOrder.newTotal).toBe(newOrder.newTotal);
  });

  it('should return 400 if required fields are missing when creating an order', async () => {
    const incompleteOrder = {
      userId: 1,
      billingDetails: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Missing cartItems, paymentMethod, and newTotal
    };

    const response = await request(app).post('/api/orders').send(incompleteOrder);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'All order details are required.');
  });

  it('should fetch the latest order for a specific user', async () => {
    // Insert a test order into the database
    await Order.create({
      userId: 1,
      billingDetails: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        contact: '1234567890',
        address: '123 Main St',
        district: 'District 9',
      },
      cartItems: [
        {
          productId: 'abc123',
          product_name: 'Pizza',
          size: 'Large',
          quantity: 1,
          price: 20,
        },
      ],
      paymentMethod: 'Credit Card',
      discountAmount: 5,
      newTotal: 15,
    });

    const response = await request(app).get('/api/orders/latest/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', 1);
  });

  it('should return 404 if no orders are found for the user', async () => {
    const response = await request(app).get('/api/orders/latest/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'No orders found for this user.');
  });
});
