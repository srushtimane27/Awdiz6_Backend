import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { Register } from "./Controllers/user.controller.js";

const app = express();
dotenv.config();

app.use(express.json());

app.get("/", (req,res) => {
    res.send("hello from mvc")
});

app.post("/register", Register);

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database Connected");
});

app.listen(3000, () => {
    console.log("Server listining on port 3000")
})