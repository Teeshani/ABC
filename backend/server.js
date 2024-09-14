// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path'); // Import the path module

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Session setup for cart persistence
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Use your MongoDB connection string
      collectionName: 'sessions', // Collection where session data is stored
      ttl: 24 * 60 * 60, // Session expiration time in seconds (1 day)
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    },
  })
);

// Serve static files from the "public" directory

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/images', express.static('public/images'));
app.use('/gallery', express.static('public/gallery'));

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

const staffRoutes = require('./routes/staffRoutes');
app.use('/api', staffRoutes);


// Import and use routes
const carouselRoutes = require('./routes/CarouselRoutes'); // Ensure the correct path
app.use('/api/carousels', carouselRoutes); // Mount the router at /api/carousels

// Product routes
app.use('/api', require('./routes/ProductRoutes'));

// Cart routes (newly added)
const cartRoutes = require('./routes/cart'); // Add cart route file
app.use('/api/cart', cartRoutes); // Mount cart routes at /api/cart

const orderRoutes = require('./routes/orderRoutes'); 
app.use('/api/orders', orderRoutes); 

// Routes
const reservationRoutes = require('./routes/reservationRoutes');
app.use('/api/reservations', reservationRoutes);

const contactRoutes = require('./routes/contactRoutes'); 
app.use('/api', contactRoutes);

const facilityRoutes = require('./routes/facilityRoutes');
app.use('/api', facilityRoutes);

const galleryRoutes = require('./routes/galleryRoutes');
app.use('/api/gallery', galleryRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
