// Import required modules
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Connect to MongoDB database using the provided URL in the environment variables
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database Connected!")) // Log success message if the connection is established
    .catch(() => console.log("Error while connecting to database!")); // Log error message if there is a connection error
