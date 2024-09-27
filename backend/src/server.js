const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
app.use(bodyParser.json());


const quizRoutes = require('./routes/quizRoutes');


// Routes
app.use('/api/quizzes', quizRoutes);


const dbConnection = require('./config/db');
require('dotenv').config();
const path = require('path');


// Upload Images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware to parse incoming JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());  // Enable CORS

// Database connection
dbConnection();


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 