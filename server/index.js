const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController.js');

const app = express();
app.use(cors());
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies

// MongoDB Atlas connection

const MONGODB_URI = process.env.MONGODB_URI;

// Mongoose connection
mongoose.connect(MONGODB_URI);

// Event listeners for Mongoose connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB Atlas.');
});

// Routes
app.post('/signin', userController.signin);
app.post('/signup', userController.signup);
app.post('/sendotp', userController.sendotp)
app.post('/submitotp', userController.submitotp);

// Protected route
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ code: 401, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ code: 403, message: 'Failed to authenticate token' });
    }
    res.json({ message: 'You have accessed a protected route!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
