require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const cors = require('cors');
app.use(cors()); // Correct usage
app.use(express.json());

// Routes
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/feedback', require('./routes/feedback'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));