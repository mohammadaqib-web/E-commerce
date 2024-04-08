// Import required modules and packages
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();

// Connect to the database
require('./dbconnect');

// Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Define routes for different endpoints
app.use('/api/v1/user', require('./routes/user_route'));          // User-related routes
app.use('/api/v1/product', require('./routes/product_route'));    // Product-related routes
app.use('/api/v1/order', require('./routes/order_route'));        // Order-related routes
app.use('/api/v1/', require('./routes/seedUser_route'));          // Routes for seeding user data
app.use('/api/v1/', require('./routes/seedProduct_route'));       // Routes for seeding product data

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server started successfully!`);
});
