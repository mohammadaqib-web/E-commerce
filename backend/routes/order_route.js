// Import required modules
const express = require('express');
const authenticate = require('../middlewares/protectedRoute'); // Middleware for authenticating regular users
const { order, getAllOrders, getUserOrder, orderStatus } = require('../controllers/order_controller'); // Import order-related controller functions
const adminAuthenticator = require('../middlewares/adminProtectedRoute'); // Middleware for authenticating admin users
const router = express.Router(); // Create an Express Router instance

// Define routes and associate them with corresponding controller functions and middlewares

// Route for placing an order (accessible to authenticated users)
router.post('/order', authenticate, order);

// Route for retrieving all orders (accessible to admin users)
router.get('/getAllOrders', authenticate, adminAuthenticator, getAllOrders);

// Route for retrieving orders of a specific user (accessible to authenticated users)
router.get('/getUserOrder', authenticate, getUserOrder);

// Route for updating the status of an order (accessible to admin users)
router.put('/orderStatus/:id', authenticate, adminAuthenticator, orderStatus);

// Export the router for use in other parts of the application
module.exports = router;
