// backend/__tests__/authRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authRoutes = require('../routes/authRoutes');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
  app.use('/api', authRoutes);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Authentication Routes', () => {
  let testUser;

  beforeEach(async () => {
    // Create a test user before each test
    testUser = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    await testUser.save();
  });

  afterEach(async () => {
    // Clean up after each test
    await User.deleteMany({});
  });

  test('POST /api/signup should create a new user successfully', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Signup successful!');
  });

  test('POST /api/signup should return 400 if passwords do not match', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        confirmPassword: 'password456',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toHaveProperty('confirmPassword', 'Passwords do not match.');
  });

  test('POST /api/login should authenticate user and return a token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userId', testUser.userId);
    expect(response.body).toHaveProperty('message', 'Login successful!');
  });

  test('POST /api/login should return 400 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toHaveProperty('general', 'Invalid email or password.');
  });

  test('GET /api/user/:userId should retrieve user details', async () => {
    const response = await request(app).get(`/api/user/${testUser.userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
    expect(response.body).not.toHaveProperty('password');
  });

  test('GET /api/user/:userId should return 404 if user not found', async () => {
    const response = await request(app).get('/api/user/9999'); // Invalid userId
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  test('POST /api/logout should return success message', async () => {
    const response = await request(app).post('/api/logout');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logout successful!');
  });
});
