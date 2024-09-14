// backend/__tests__/dashboardRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dashboardRoutes = require('../routes/dashboardRoutes');
const ContactMessage = require('../models/ContactMessage');
const Reservation = require('../models/Reservation');
const OnlineOrder = require('../models/order');

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
  app.use('/api/dashboard', dashboardRoutes);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('GET /api/dashboard/counts', () => {
  it('should fetch counts for queries, reservations, and online orders', async () => {
    await ContactMessage.create({ name: 'John Doe', email: 'john@example.com', message: 'Test message' });
    await Reservation.create({ userId: 'user123', name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890', date: new Date(), time: '18:00', seats: 2, paymentSlip: 'slip.jpg' });
    await OnlineOrder.create({ userId: 1, billingDetails: { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', contact: '1234567890', address: '123 Street', district: 'District A' }, cartItems: [{ productId: 'prod1', product_name: 'Product 1', size: 'M', quantity: 1, price: 100 }], paymentMethod: 'credit', newTotal: 100 });

    const response = await request(app).get('/api/dashboard/counts');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      queries: 1,
      reservations: 1,
      onlineOrders: 1,
    });
  });
});

describe('GET /api/dashboard/messages', () => {
  it('should fetch all contact messages', async () => {
    await ContactMessage.create({ name: 'John Doe', email: 'john@example.com', message: 'Test message' });

    const response = await request(app).get('/api/dashboard/messages');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('name', 'John Doe');
  });
});

describe('GET /api/dashboard/reservations', () => {
  it('should fetch all reservations', async () => {
    await Reservation.create({ userId: 'user123', name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890', date: new Date(), time: '18:00', seats: 2, paymentSlip: 'slip.jpg' });

    const response = await request(app).get('/api/dashboard/reservations');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('name', 'Jane Doe');
  });
});

describe('GET /api/dashboard/online-orders', () => {
  it('should fetch all online orders', async () => {
    await OnlineOrder.create({ userId: 1, billingDetails: { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', contact: '1234567890', address: '123 Street', district: 'District A' }, cartItems: [{ productId: 'prod1', product_name: 'Product 1', size: 'M', quantity: 1, price: 100 }], paymentMethod: 'credit', newTotal: 100 });

    const response = await request(app).get('/api/dashboard/online-orders');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('billingDetails.firstName', 'Alice');
  });
});

describe('POST /api/dashboard/update-feedback', () => {
  it('should update feedback for a contact message', async () => {
    const message = await ContactMessage.create({ name: 'John Doe', email: 'john@example.com', message: 'Test message' });

    const response = await request(app)
      .post('/api/dashboard/update-feedback')
      .send({ id: message._id, feedback: 'Resolved' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('feedback', 'Resolved');
  });

  it('should return 404 if contact message not found', async () => {
    const response = await request(app)
      .post('/api/dashboard/update-feedback')
      .send({ id: mongoose.Types.ObjectId(), feedback: 'Resolved' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Contact message not found');
  });
});

describe('POST /api/dashboard/update-order-status', () => {
  it('should update the status of an online order', async () => {
    const order = await OnlineOrder.create({ userId: 1, billingDetails: { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', contact: '1234567890', address: '123 Street', district: 'District A' }, cartItems: [{ productId: 'prod1', product_name: 'Product 1', size: 'M', quantity: 1, price: 100 }], paymentMethod: 'credit', newTotal: 100 });

    const response = await request(app)
      .post('/api/dashboard/update-order-status')
      .send({ id: order._id, status: 'Completed' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'Completed');
  });

  it('should return 404 if order not found', async () => {
    const response = await request(app)
      .post('/api/dashboard/update-order-status')
      .send({ id: mongoose.Types.ObjectId(), status: 'Completed' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Order not found');
  });
});

describe('POST /api/dashboard/update-reservation-status', () => {
  it('should update the status of a reservation', async () => {
    const reservation = await Reservation.create({ userId: 'user123', name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890', date: new Date(), time: '18:00', seats: 2, paymentSlip: 'slip.jpg' });

    const response = await request(app)
      .post('/api/dashboard/update-reservation-status')
      .send({ id: reservation._id, status: 'Confirmed' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'Confirmed');
  });

  it('should return 404 if reservation not found', async () => {
    const response = await request(app)
      .post('/api/dashboard/update-reservation-status')
      .send({ id: mongoose.Types.ObjectId(), status: 'Confirmed' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Reservation not found');
  });
});
