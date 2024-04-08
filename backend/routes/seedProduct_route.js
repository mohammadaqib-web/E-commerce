// Import required modules
const express = require('express');
const authenticate = require('../middlewares/protectedRoute'); // Middleware for authenticating regular users
const adminAuthenticator = require('../middlewares/adminProtectedRoute'); // Middleware for authenticating admin users
const seedProduct = require('../controllers/seedProduct_Controller'); // Import seed product controller function

// Create an Express Router instance
const router = express.Router();

// Define a route and associate it with corresponding controller function and middlewares

// Route for seeding products (accessible to authenticated admin users)
router.post('/seedproducts', authenticate, adminAuthenticator, seedProduct);

// Export the router for use in other parts of the application
module.exports = router;
