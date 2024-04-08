const UserModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const addUser = async (req, res) => {
    try {
        // Destructuring user input from request body
        const { firstName, lastName, email, password } = req.body;

        // Checking if all required fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        // Checking if the email is already registered
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.send({ message: "Email is already registered!" });
        }

        // Hashing the password before saving it to the database
        const hashPassword = await bcrypt.hash(password, 16);

        // Creating a new user instance
        const newUser = new UserModel({ firstName, lastName, email, password: hashPassword });

        // Saving the new user to the database
        const resp = await newUser.save();

        // Responding with success message and user details
        res.status(201).json({ message: "User Created Successfully!", resp });
    } catch (error) {
        // Handling errors and responding with an error message
        return res.status(400).json({ message: "Error Occurred!", error });
    }
}

const loginUser = async (req, res) => {
    try {
        // Destructuring user input from request body
        const { email, password } = req.body;

        // Checking if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email & Password are required!" });
        }

        // Finding the user based on the provided email
        let user = await UserModel.findOne({ email });

        // Checking if the user is not found
        if (!user) {
            return res.status(400).json({ message: "You are not registered with us yet!" });
        }

        // Comparing the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);

        // Checking if the passwords match
        if (!match) {
            return res.status(400).json({ message: "Email or Password is Incorrect!" });
        } else {
            // Generating a JWT token for authentication
            const token = await jwt.sign(user.email, process.env.JWT_SECRET);

            // Extracting essential user information for response
            const userInfo = { "_id": user._id, "firstName": user.firstName, "lastName": user.lastName, "email": user.email, "isAdmin": user.isAdmin }

            // Responding with success message, token, and user information
            return res.status(201).json({ message: "User Logged in Successfully!", token, user: userInfo });
        }

    } catch (error) {
        // Handling errors and responding with an error message
        res.status(500).json({ message: "Error Occurred!", error });
    }
}

const getAllUser = async (req, res) => {
    try {
        const allUser = await UserModel.find();
        return res.status(201).json({ message: "Users Found", allUser });
    } catch (error) {
        return res.status(400).json({ message: "Error finding users in Database!" });
    }
}

const getUserDetails = async(req,res) => {
    try {
        const userId = req.user[0];
        return res.status(201).json({message:"User details",userId})
    } catch (error) {
        return res.status(400).json({ message: "No user with this id found in Database!" });
    }
}

const deleteUser = async(req,res) => {
    try {
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({message:"User id not Found!"});
        }
        const findUser = await UserModel.findById(userId);
        if(!findUser){
            return res.status(400).json({message:"User not Found in Database!"});
        }
        const deletingUser = await UserModel.deleteOne(findUser);
        if(!deletingUser){
            return res.status(400).json({message:"Error Occured while deleting the user!"});
        }
        return res.status(201).json({message:"User deleted successfully!"});
    } catch (error) {
        return res.status(400).json({message:"Error Occured!"});
    }
}

const modifyUser = async(req,res) => {
    const userId = req.user[0]._id;
    const {firstName,lastName,email} = req.body;

    try {
        const findUser = await UserModel.findById(userId);
        if(!findUser){
            return res.status(400).json({message:"User not Found!"});
        }    
        const updateUser = await findUser.updateOne({firstName,lastName,email});
        if(!updateUser){
            return res.status(400).json({message:"User not updated!"});
        }
        return res.status(201).json({message:"User updated Successfully!",updateUser});
    } catch (error) {
        return res.status(400).json({message:"Error Occurred!",error});
    }
}

module.exports = {
    addUser,
    loginUser,
    getAllUser,
    getUserDetails,
    deleteUser,
    modifyUser
}