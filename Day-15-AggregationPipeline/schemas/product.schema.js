import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    quentity: Number,
});

const ProductSchema = mongoose.model("Product", productSchema);

export default ProductSchema;