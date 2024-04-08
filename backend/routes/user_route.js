// Import required modules
const express = require('express');
const { addUser, loginUser, getAllUser, getUserDetails, deleteUser, modifyUser } = require('../controllers/user_controller');
const authenticate = require('../middlewares/protectedRoute'); // Middleware for authenticating users
const adminAuthenticator = require('../middlewares/adminProtectedRoute'); // Middleware for authenticating admin users

// Create an Express Router instance
const router = express.Router();

// Define routes and associate them with corresponding controller functions and middlewares

// Route for user registration
router.post('/register', addUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting all users (accessible to authenticated admin users)
router.get('/getAllUser', authenticate, adminAuthenticator, getAllUser);

// Route for getting user details (accessible to authenticated users)
router.get('/getUserDetails', authenticate, getUserDetails);

// Route for deleting a user (accessible to authenticated admin users)
router.delete('/deleteUser/:id', authenticate, adminAuthenticator, deleteUser);

// Route for modifying user details (accessible to authenticated users)
router.put('/modifyUser', authenticate, modifyUser);

// Export the router for use in other parts of the application
module.exports = router;
