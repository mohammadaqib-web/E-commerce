// Import required modules
const express = require('express');
const authenticate = require('../middlewares/protectedRoute'); // Middleware for authenticating regular users
const adminAuthenticator = require('../middlewares/adminProtectedRoute'); // Middleware for authenticating admin users
const { addProduct, editProduct, deleteProduct, getAllProduct, getProductbyId, getProductbyName } = require('../controllers/product_controller'); // Import product-related controller functions
const upload = require('../middlewares/uploadRoute'); // Middleware for handling file uploads

// Create an Express Router instance
const router = express.Router();

// Define routes and associate them with corresponding controller functions and middlewares

// Route for adding a product (accessible to authenticated admin users, uses file upload middleware)
router.post('/addProduct', authenticate, adminAuthenticator, upload.single('image'), addProduct);

// Route for editing a product (accessible to authenticated admin users)
router.put('/editProduct/:id', authenticate, adminAuthenticator, editProduct);

// Route for deleting a product (accessible to authenticated admin users)
router.delete('/deleteProduct/:id', authenticate, adminAuthenticator, deleteProduct);

// Route for retrieving all products
router.get('/allProduct', getAllProduct);

// Route for retrieving a product by its ID
router.get('/getProductbyId/:id', getProductbyId);

// Route for retrieving products by name
router.get('/getProductbyName/:name', getProductbyName);

// Export the router for use in other parts of the application
module.exports = router;
