const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new Schema({
    productId: {
        type: ObjectId,
        ref: "ProductModel"
    },
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({
    orderedBy: {
        type: ObjectId,
        ref: "UserModel"
    },
    products: [productSchema],
    status: {
        type: String,
        default: "Processing"
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const OrderModel = mongoose.model("OrderModel", orderSchema);

module.exports = OrderModel;
