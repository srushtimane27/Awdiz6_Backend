import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ProductSchema from "./schemas/product.schema.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import AllRoutes from "./routes/index.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from aggregation pipeline...");
});

app.use('/api/v1', AllRoutes)


// UNWIND
app.post("/unwind-projecting", async (req, res) => {
  try {
    const aggregation = [
      { $unwind: "$tags" },
      { $project: { name: 1, price: 1 } },
    ];
    const filterredProducts = await ProductSchema.aggregate(aggregation);
    console.log(filterredProducts, "filterredProducts");
    res.send(true);
  } catch (error) {
    return res.json({ success: false, error });
  }
});


mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB CONNECTED");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});









// app.post("/register", async (req, res) => {
//     try {
//       const { name, email, password, confirmPassword } = req.body;
//       if (!name || !email || !password || !confirmPassword) {
//         return res.json({ success: false, message: "All fields are required." });
//       }
//       if (password !== confirmPassword) {
//         return res.json({
//           success: false,
//           message: "Password and Confirm is not matched.",
//         });
//       }
  
//       const isEmailExists = await UserSchema.findOne({ email: email });
//       // console.log(isEmailExists, "isEmailExists");
//       if (isEmailExists) {
//         return res.json({
//           success: false,
//           message: "Email is alreadly exist, Please use another one.",
//         });
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // 1st type to store data in mongodb
//       // const newUser = await UserSchema.create({
//       //   name: name,
//       //   email: email,
//       //   password: hashedPassword,
//       // });
  
//       // 2nd type to store data in mongodb
//       const newUser = new UserSchema({
//         name: name,
//         email: email,
//         password: hashedPassword,
//       });
  
//       await newUser.save();
  
//       return res.json({ success: true, message: "Registeration Completed." });
//     } catch (error) {
//       console.log(error, "error");
//       return res.json({ error, success: false });
//     }
//   });