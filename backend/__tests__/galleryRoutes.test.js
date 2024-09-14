// backend/__tests__/galleryRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const galleryRoutes = require('../routes/galleryRoutes');
const GalleryImage = require('../models/GalleryImage');

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
  app.use('/api/gallery', galleryRoutes);
});

beforeEach(async () => {
  // Clear the collection before each test to ensure test isolation
  await GalleryImage.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('GET /api/gallery', () => {
  it('should fetch and group gallery images by headings', async () => {
    // Seed the in-memory database with mock images
    await GalleryImage.create([
      { filename: 'image1.jpg', heading: 'Nature' },
      { filename: 'image2.jpg', heading: 'Nature' },
      { filename: 'image3.jpg', heading: 'Urban' },
    ]);

    const response = await request(app).get('/api/gallery');

    expect(response.statusCode).toBe(200);

    // Expected structure of the grouped images
    const expectedGrouping = {
      Nature: expect.any(Array),
      Urban: expect.any(Array),
    };

    // Validate the groupings
    expect(response.body).toMatchObject(expectedGrouping);

    // Ensure specific images exist within the groups
    expect(response.body.Nature).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ filename: 'image1.jpg', heading: 'Nature' }),
        expect.objectContaining({ filename: 'image2.jpg', heading: 'Nature' }),
      ])
    );

    expect(response.body.Urban).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ filename: 'image3.jpg', heading: 'Urban' }),
      ])
    );
  });

  it('should handle errors when fetching gallery images', async () => {
    // Mock an error scenario
    jest.spyOn(GalleryImage, 'find').mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/gallery');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to fetch gallery images.');

    // Restore the original implementation
    GalleryImage.find.mockRestore();
  });
});
