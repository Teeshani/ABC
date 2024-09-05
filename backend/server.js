// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// server.js

// Serve static files from the "public" directory
app.use('/images', express.static('public/images'));


  // Import and use routes
const carouselRoutes = require('./routes/CarouselRoutes'); // Ensure the correct path
app.use('/api/carousels', carouselRoutes); // Mount the router at /api/carousels


app.use('/api', require('./routes/ProductRoutes'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
