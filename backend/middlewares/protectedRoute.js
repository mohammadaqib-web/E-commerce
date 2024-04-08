//Importing necessary modules
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user_model');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Middleware for user authentication using JWT
const authenticate = async (req, res, next) => {
    // Extracting the authorization header from the request
    const authHeader = req.headers["authorization"];

    // Checking if the authorization header is missing
    if (!authHeader) {
        return res.status(401).json({ message: "You are Unauthorized!!" })
    }

    // Extracting the token from the authorization header
    const token = authHeader.replace('Bearer ', "");

    // Checking if the token is missing
    if (!token) {
        return res.status(401).json({ message: "You are Unauthorized!!" })
    }

    try {
        // Verifying the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Finding the user based on the decoded token
        const user = await UserModel.find({ email: decodedToken }, { password: 0 });
       
        // Checking if the user is not found
        if (!user) {
            return res.status(401).json({ message: "You are Unauthorized!!" });
        }
        // Adding the user information to the request object
        req.user = user;
        next();// Proceeding to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Error Occurred!!" })
    }
}

// Exporting the authentication middleware for use in other parts of the application
module.exports = authenticate;