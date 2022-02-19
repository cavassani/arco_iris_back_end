import mongoose from "../config/mongoose.js"
const { Schema } = mongoose
const Product = new Schema({
    name: String,
    stock: Number,
    price: Number,
    image: String
}) 

export default Product