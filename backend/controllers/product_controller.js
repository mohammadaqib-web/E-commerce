const ProductModel = require('../models/product_model');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary');

const addProduct = async (req, res) => {
    const { productName, quantity, amount, category, description } = req.body;
    const image = req.file.path

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!productName || !quantity || !amount || !category || !description || !image) {
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        // Upload image to Cloudinary
        const cloudinaryResult = await cloudinary.uploader.upload(image);

        // Create a new product with the Cloudinary URL
        const newProduct = new ProductModel({
            productName,
            quantity,
            amount,
            category,
            description,
            author: req.user[0]._id,
            image: cloudinaryResult.secure_url  // Use the Cloudinary URL
        });

        const resp = await newProduct.save();

        return res.status(201).json({ message: "Product Created Successfully!", resp });
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!", error });
    }
}

const editProduct = async (req, res) => {
    const productId = req.params.id;
    const { productName, quantity, amount, category, description } = req.body;

    try {
        const findProduct = await ProductModel.findById(productId);
        if (!findProduct) {
            return res.status(400).json({ message: "Product not Found!" });
        }

        const updateProduct = await findProduct.updateOne({ productName, quantity, amount, category, description });
        if (!updateProduct) {
            return res.status(400).json({ message: "Product not updated!" })
        }
        return res.status(201).json({ message: "Product updated successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error Occurred!", error });
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const findProduct = await ProductModel.findById(productId);
        if (!findProduct) {
            return res.status(400).json({ message: "Product not found!" });
        }

        const imageUrl = findProduct.image;

        // Extract the public_id from the Cloudinary URL
        const publicId = imageUrl.split('/').pop().split('.')[0];

        // Delete the image from Cloudinary
        const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

        if (!cloudinaryResult) {
            return res.status(400).json({ error: "Image not found in Cloudinary!" });
        }

        const deletingProduct = await findProduct.deleteOne();

        if (!deletingProduct) {
            return res.status(400).json({ message: "Error while deleting product!" });
        }

        return res.status(201).json({ message: "Product Deleted Successfully!" });
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!", error });
    }
};


const getAllProduct = async (req, res) => {
    try {
        const allProducts = await ProductModel.find();
        if (!allProducts) {
            return res.status(400).json({ message: "No Product Found!" });
        }
        return res.status(201).json({ message: "Products Found!", allProducts })
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!", error });
    }
}

const getProductbyId = async (req, res) => {
    const productId = req.params.id;
    try {
        const findProduct = await ProductModel.findById(productId);
        if (!findProduct) {
            return res.status(400).json({ message: "Product Not found!" });
        }
        return res.status(201).json({ message: "Product found!", findProduct });
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!", error });
    }
}

const getProductbyName = async (req, res) => {
    const { name } = req.params;
    try {
        const findProduct = await ProductModel.find({ productName: { $regex: new RegExp(name, 'i') } });

        if (findProduct.length === 0) {
            return res.status(400).json({ message: "Product Not found!" });
        }
        return res.status(200).json({ message: "Product found!", findProduct });
    } catch (error) {
        return res.status(500).json({ message: "Error Occurred!", error });
    }
};


module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getAllProduct,
    getProductbyId,
    getProductbyName
}