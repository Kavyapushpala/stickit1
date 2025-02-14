const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// Import Models
const User = require('./models/User');
const Board = require('./models/Board');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes'); // Corrected from boardRouters to boardRoutes

const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors()); // Ensure CORS is enabled

// Serve static files (e.g., frontend)
app.use(express.static(path.join(__dirname, 'stickit')));

app.use('/auth', authRoutes); // Routes for sign-up and login
app.use('/boards', boardRoutes); // Corrected from boardRouters to boardRoutes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sticky-note-app') // Update database name
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'stickit', 'icon.html'));
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});