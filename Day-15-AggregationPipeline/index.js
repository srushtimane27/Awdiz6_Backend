import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ProductSchema from "./schemas/product.schema.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Hello from aggregation pipeline...")
});

app.post("/add-product", async(req,res) => {
    try {
        const { name, category, price, quantity } = req.body;
        if(!name || !category || !price || !quantity){
            return res.json({ success: false, error: "All fields are required"})
        }
        const newProduct = new ProductSchema({
            name: name,
            category: category,
            price: price,
            quanity: quantity,
        });
        await newProduct.save();
        return res.json({success: true, error: "Product successfully stored"})
    } catch (error) {
        return res.json({success: false, error});
    }
})

// db.newProduct.aggregate([
//     {
//         $match: { category: "Laptop"}
//     }
// ])

app.get("/products-by-category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const products = await ProductSchema.aggregate([
            {
                $match: { category: category }
            }
        ]);
        return res.json({ success: true, products });
    } catch (error) {
        return res.json({ success: false, error });
    }
});


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB CONNECTED")
})

app.listen(3001, ()=> {
    console.log("Server is running on port 3001");
});