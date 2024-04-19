import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./models/user.schema.js";

const app = express();

app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello from mongoose...");
});


// Register New User,  MongodbD10 (http://localhost:3000/register)
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required..." });

        const user = new UserSchema({
            name: name,
            email: email,
            password: password,
            age,
        });
        console.log(user, "user");
        await user.save();
        res
        .status(201)
        .json({success: true, message: "Registration Completed..."});
  } catch (error) {
    return res.status(500).json({success: false, error});
  }
});


// Find User By Age, AgeDay10(http://localhost:3000/users/20)
app.get("/users/:age", async (req,res) => {
    try {
        const {age} = req.params;
        const users = await UserSchema.find({age: parseInt(age)});

        if(!users.length){
            return res
            .status(404)
            .json({success: false, message: "User not found"})
        }
        res.status(200).json({success: true, users});
    } catch (error) {
        return res
        .status(500)
        .json({success: false, error: error.message});
    }
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB CONNECTED");
});

app.listen(3000, () => {
  console.log("Server listining on port 3000");
});
