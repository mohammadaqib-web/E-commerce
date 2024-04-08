const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types

const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:ObjectId,
        ref:"UserModel"
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true});

const ProductModel = mongoose.model("ProductModel",productSchema);

module.exports = ProductModel;