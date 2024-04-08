// Import required modules
const express = require('express');
const router = express.Router();

// Define a route and associate it with the corresponding controller function

// Route for seeding users
router.post('/seeduser', require('../controllers/seedUser_controller'));

// Export the router for use in other parts of the application
module.exports = router;
