import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./models/user.schema.js";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req,res) => {
    res.send("Hello from demo")
});

app.post("/add-user",async (req,res) => {
    try {
    const {name, email, gender, age} = req.body;
    if(!name || !email || !gender || !age){
        return res.json({success: false, message: "All fields are required..."})
    }
    const newUser = new UserSchema({
        name: name,
        email: email,
        gender: gender,
        age: age
    })
    await newUser.save()
    return res.json({success: true, message: "User Successfully Stored In DB"})
    } catch (error) {
        return res.status(500).json({success:false, error})
    }
})

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB CONNECTED")
});

app.listen(3000, ()=> {
    console.log("Server Listining on port 3000")
})

