// backend/__tests__/contactRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const contactRoutes = require('../routes/contactRoutes');
const ContactMessage = require('../models/ContactMessage');

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
  app.use('/api', contactRoutes);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('POST /api/contact', () => {
  it('should save a contact message successfully', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message.',
        userId: 'user123', // Optional
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Your message has been sent successfully!');

    // Verify the message is saved in the database
    const message = await ContactMessage.findOne({ email: 'john@example.com' });
    expect(message).not.toBeNull();
    expect(message.name).toBe('John Doe');
    expect(message.message).toBe('This is a test message.');
    expect(message.userId).toBe('user123'); // Optional field
    expect(message.feedback).toBe('pending'); // Default value
  });

  it('should return an error if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: '',
        email: '',
        message: '',
        userId: 'user123', // Optional
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to send your message. Please try again.');
  });
});
