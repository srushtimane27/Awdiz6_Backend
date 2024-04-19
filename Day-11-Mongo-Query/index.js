import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./Models/user.schema.js";

const app = express();

app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello From Query...");
});

app.get("/filter-users", async (req, res) => {
  try {
    const { age, name } = req.body;

    // const users = await UserSchema.find();
    // const users = await UserSchema.find({ name: "Sahil", email:"sahil@gamil.com"});
    // const users = await UserSchema.find({age: 20});
    // const users = await UserSchema.find({age: {$eq: 25}});
    // const users = await UserSchema.find({age: {$gt: 20}});
    // const users = await UserSchema.find({age: {$gte: 20}});
    // const users = await UserSchema.find({age: {$lt: 26}});
    // const users = await UserSchema.find({age: {$lte: 26}});
    // const users = await UserSchema.find({age: {$in: [20,30]}});
    // const users = await UserSchema.find({age: {$nin: [20,30]}});
    // const users = await UserSchema.find({gender: {$exists: true}});
    // const users = await UserSchema.find({$and: [{ age: { $eq: parseInt(20) } },{ name: { $eq: "Ram" } },],});
    // const users = await UserSchema.find({$or : [{age: {$eq: parseInt(25)}}, {name: {$eq: "Ram"}} ,], });
    const users = await UserSchema.find({$nor : {age: 20}});

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB CONNECTED...");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
