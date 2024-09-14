// __tests__/reservationRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');
const reservationRoutes = require('../routes/reservationRoutes');
const Reservation = require('../models/Reservation');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  app = express();
  app.use(express.json());
  app.use('/api/reservations', reservationRoutes);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('POST /api/reservations/reserve', () => {
  it('should create a new reservation successfully', async () => {
    const testFilePath = path.join(__dirname,'test-images',  'pool.jpg'); 
    const response = await request(app)
      .post('/api/reservations/reserve')
      .field('name', 'John Doe')
      .field('email', 'john@example.com')
      .field('phone', '1234567890')
      .field('date', '2024-09-20')
      .field('time', '18:00')
      .field('seats', '4')
      .field('userId', 'user123')
      .attach('paymentSlip', testFilePath);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Reservation successful.');
    expect(response.body).toHaveProperty('reservationId');
  });

  it('should fail if payment slip upload is missing', async () => {
    const response = await request(app)
      .post('/api/reservations/reserve')
      .field('name', 'Jane Doe')
      .field('email', 'jane@example.com')
      .field('phone', '0987654321')
      .field('date', '2024-09-22')
      .field('time', '19:00')
      .field('seats', '2')
      .field('userId', 'user456');

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'Payment slip upload failed.');
  });
});
