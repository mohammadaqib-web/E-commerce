const ProductModel = require('../models/product_model');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary');

const seedProduct = async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const products = [
        {
            "productName": "Shirt",
            "quantity": "10",
            "amount": "400",
            "category": "Men",
            "description": "Black Cotton Shirt",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMHNoaXJ0fGVufDB8fDB8fHww"
        },
        {
            "productName": "Shirt",
            "quantity": "10",
            "amount": "999",
            "category": "Men",
            "description": "Pack of 3 Shirt",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lbiUyMHNoaXJ0fGVufDB8fDB8fHww"
        },
        {
            "productName": "Jeans",
            "quantity": "10",
            "amount": "799",
            "category": "Men",
            "description": "Black colour jeans",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwcGFudHxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            "productName": "Jeans",
            "quantity": "10",
            "amount": "1099",
            "category": "Men",
            "description": "Black colour jeans",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1624378441864-6eda7eac51cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMHBhbnR8ZW58MHx8MHx8fDA%3D"
        },
        {
            "productName": "Jacket",
            "quantity": "10",
            "amount": "999",
            "category": "Men",
            "description": "Black colour jacket",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1614031679232-0dae776a72ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFja2V0JTIwbWVufGVufDB8fDB8fHww"
        },
        {
            "productName": "Jacket",
            "quantity": "10",
            "amount": "1999",
            "category": "Men",
            "description": "Brown leather jacket",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFja2V0JTIwbWVufGVufDB8fDB8fHww"
        },
        {
            "productName": "Jacket",
            "quantity": "10",
            "amount": "2499",
            "category": "Men",
            "description": "Black leather jacket",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1559038217-3fb2db6186f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphY2tldCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            "productName": "T-shirt",
            "quantity": "10",
            "amount": "299",
            "category": "Men",
            "description": "Black Half T-shirt",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwdHNoaXJ0fGVufDB8fDB8fHww"
        },
        {
            "productName": "T-shirt",
            "quantity": "10",
            "amount": "499",
            "category": "Men",
            "description": "Black Full T-shirt",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1505632958218-4f23394784a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVuJTIwdHNoaXJ0fGVufDB8fDB8fHww"
        },
        {
            "productName": "Hoodie",
            "quantity": "10",
            "amount": "799",
            "category": "Men",
            "description": "White Modern Style",
            "author": req.user[0]._id,
            "image": "https://images.unsplash.com/photo-1685328403783-00925c2a4301?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lbiUyMGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            "productName": "Trouser",
            "quantity": "10",
            "amount": "999",
            "category": "Women",
            "description": "Black Modern Style",
            "author": req.user[0]._id,
            "image": "https://m.media-amazon.com/images/I/51Clvs6gtYL._AC_UL480_FMwebp_QL65_.jpg"
        },
        {
            "productName": "Shirt",
            "quantity": "10",
            "amount": "799",
            "category": "Women",
            "description": "White Modern Style",
            "author": req.user[0]._id,
            "image": "https://m.media-amazon.com/images/I/415xsbjjE2L._AC_UL480_FMwebp_QL65_.jpg"
        },
        {
            "productName": "Top",
            "quantity": "10",
            "amount": "699",
            "category": "Women",
            "description": "Maroon Colour Top",
            "author": req.user[0]._id,
            "image": "https://m.media-amazon.com/images/I/61BBlDNERFL._AC_UL480_FMwebp_QL65_.jpg"
        },
        {
            "productName": "Clothing Set",
            "quantity": "10",
            "amount": "699",
            "category": "Kids",
            "description": "Unisex clothing",
            "author": req.user[0]._id,
            "image": "https://m.media-amazon.com/images/I/41xgxqk3NHL._AC_UL480_FMwebp_QL65_.jpg"
        },
        {
            "productName": "Jumpsuit",
            "quantity": "10",
            "amount": "599",
            "category": "Kids",
            "description": "Panda Style",
            "author": req.user[0]._id,
            "image": "https://m.media-amazon.com/images/I/61kqhTCKtgL._AC_UL480_FMwebp_QL65_.jpg"
        },
        {
            "productName": "Toddler dress",
            "quantity": "10",
            "amount": "499",
            "category": "Kids",
            "description": "Infant Casual Dress",
            "author": req.user[0]._id,
            "image": "https://m.media-amazon.com/images/I/51-F+CG+v1L._AC_UL480_FMwebp_QL65_.jpg"
        },
        {
            "productName": "Tracksuit",
            "quantity": "10",
            "amount": "899",
            "category": "Kids",
            "description": "Boys Cotton Tracksuit",
            "author": req.user[0]._id,
            "image": "https://m.media-amazon.com/images/I/518Xd9hgamL._AC_UL480_FMwebp_QL65_.jpg"
        },
    ];

    try {
        const uploadedProducts = [];

        for (const product of products) {
            const cloudinaryResult = await cloudinary.uploader.upload(product.image);
            product.image = cloudinaryResult.secure_url;
            uploadedProducts.push(product);
        }

        const newProducts = await ProductModel.create(uploadedProducts);
        return res.status(201).json({ message: "Products seeded successfully!", newProducts });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while seeding products", error });
    }
}

module.exports = seedProduct;
