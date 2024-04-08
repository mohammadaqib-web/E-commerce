const OrderModel = require('../models/order_model');
const ProductModel = require('../models/product_model');

const order = async (req, res) => {
    const userId = req.user[0];

    try {
        const { productIds, quantity, address, amount, name } = req.body;

        if (!productIds || !quantity || !address || !amount || !name) {
            return res.status(400).json({ message: "Incomplete request body!" });
        }

        // Check if there are any product IDs in the request
        if (!productIds || !productIds.length) {
            return res.status(400).json({ message: "Product IDs are required!" });
        }

        // Find all products with the given IDs
        const products = await ProductModel.find({ _id: { $in: productIds } });

        // Check if all products were found
        if (products.length !== productIds.length) {
            return res.status(400).json({ message: "One or more products not found!" });
        }

        // Check if there is enough quantity for each product
        for (let i = 0; i < products.length; i++) {
            if (products[i].quantity < quantity[i]) {
                return res.status(400).json({ message: `Not enough quantity available for product with ID ${products[i]._id}! Available quantity: ${products[i].quantity}` });
            }
        }

        // Update product quantities and create orders
        const orderedProducts = [];
        for (let i = 0; i < products.length; i++) {
            // Check if there's enough quantity
            if (products[i].quantity < quantity[i]) {
                return res.status(400).json({ message: `Not enough quantity available for product with ID ${products[i]._id}! Available quantity: ${products[i].quantity}` });
            }

            // Update product quantity
            products[i].quantity -= quantity[i];
            const updatedProduct = await products[i].save();

            // Create order
            const order = new OrderModel({
                orderedBy: userId._id,
                name: name,
                address: address,
                amount: amount,
                products: [
                    { productId: productIds[i], quantity: quantity[i] },
                ],
            });

            // Save the order
            const savedOrder = await order.save();

            // Check if the order was saved successfully
            if (!savedOrder) {
                // If there was an issue, rollback the product quantity increment
                updatedProduct.quantity += quantity[i];
                await updatedProduct.save();
                return res.status(400).json({ message: `Error while placing the order for product with ID ${productIds[i]}!` });
            }

            orderedProducts.push(savedOrder);
        }

        return res.status(201).json({ message: "Order Successful!", orderedProducts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};




const orderStatus = async (req, res) => {
    const orderId = req.params.id;
    const updateStatus = req.body.status;
    try {
        const order = await OrderModel.findById(orderId);

        if (!order) {
            return res.status(400).json({ message: "Order not found!" });
        }
        const updatedStatus = await order.updateOne({ status: updateStatus });
        if (updatedStatus.nModified === 0) {
            return res.status(400).json({ message: "Status not updated!" });
        }
        return res.status(201).json({ message: "Status updated Successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!", error })
    }
}

const getAllOrders = async (req, res) => {
    const allOrders = await OrderModel.find();
    try {
        if (!allOrders) {
            return res.status(400).send({ message: "Error in getting All Orders!" });
        }
        return res.status(201).json({ message: "Orders Found!", allOrders });
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!", error });
    }
}

const getUserOrder = async (req, res) => {
    const userId = req.user[0]._id;
    try {
        const findUserOrders = await OrderModel.find({ orderedBy: userId });
        if (!findUserOrders) {
            return res.status(400).json({ message: "Error while getting orders!" });
        }
        if (findUserOrders[0] == null) {
            return res.status(400).json({ message: "You have not ordered anything yet!" });
        }
        return res.status(201).json({ message: "Your Orders Found", findUserOrders });
    } catch (error) {
        return res.status(400).json({ message: "Error Occurred!", error })
    }
}

module.exports = {
    getAllOrders,
    getUserOrder,
    order,
    orderStatus
}