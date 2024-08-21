import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import EmpSchema from "./models/emp.schema.js";


const app = express();

app.use(express.json());

dotenv.config();

app.get("/", (req,res) => {
    res.send("Hello from demo...");
});

app.post("/register", async (req,res) => {
    try {
       const {name, email, age} = req.body;
       if(!name || !email || !age)
        return res 
         .status(404)
         .json({ success: false, message: "All fields are required..."})

         const emp = new EmpSchema({
            name: name,
            email: email,
            age,
         })
         console.log(emp, "emp");
         await emp.save();
         res.status(201).json({success: true, message: "Registration Completed"})
         
    } catch (error) {
        return res.status(500).json({success: false, error});
    }
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB CONNECTED")
});

app.listen(3000, () => {
    console.log("Server listining on port 3000");
})
