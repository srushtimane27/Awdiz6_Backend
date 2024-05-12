import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ProductSchema from "./schemas/product.schema.js";
import UserSchema from "./schemas/user.schema.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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

app.post("/add-product", async (req, res) => {
  try {
    const { name, category, price, quantity, tags } = req.body.productData;
    const { userId } = req.body;
    if (!name || !category || !price || !quantity || !tags) {
      return res.json({ success: false, error: "All fields are required" });
    }
    const newProduct = new ProductSchema({
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      tags: tags,
      user: userId,
    });
    await newProduct.save();
    return res.json({ success: true, error: "Product successfully stored" });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

// AGGRIGATION PIPELINE
app.post("/get-products-by-category-price", async (req, res) => {
  try {
    const { category, price } = req.body;
    const aggregation = [
      {
        // $match: {category: "Laptop", price: {$gt: 10000 }}
        $match: { category: category, price: { $gt: price } },
      },
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
          totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ];
    const filterredProducts = await ProductSchema.aggregate(aggregation);
    console.log(filterredProducts, "filterredProducts");
    res.send(true);
  } catch (error) {
    return res.json({ success: false, error });
  }
});

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


app.post("/get-products-by-user", async (req, res) => {
  try {
    const { userId } = req.body;
    const products = await ProductSchema.find({ user: userId }).populate(
      "user"
    );
    res.send(products);
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
});

// REGISTER
app.post("/register", async(req, res) => {
    // res.send("Register")
    try {
        const { name, email, password, confirmPassword} = req.body.userData;
        if(!name || !email || !password || !confirmPassword){
            return res.json({ success: false, message: "All fields are required"})
        }
        
        if(password !== confirmPassword){
            return res.json({success: false, message: "Password and confirm password are not same"})
        }

        const isEmailExist = await UserSchema.findOne({ email: email});
        // console.log(isEmailExist, "isEmailExist")
        if(isEmailExist){
            return res.json({success: false, message: "Email is already exist, Please use another one"});
        }

        const hashedPassword = await bcrypt.hash(password,10)
        // res.send(hashedPassword)

        // 1st type to store data in mongodb
        // const newUser = await UserSchema.create({
        //     name,
        //     email,
        //     password: hashedPassword,
        // });

        // 2nd type to store data in mongodb
        const newUser = await UserSchema({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        return res.json({success: true, message:"Registration Completed"})

    } catch (error) {
        console.log(error, "error");
        return res.json({error, success: false});
    }
});


app.get("/get-products", async (req, res) => {
  try {
    const products = await ProductSchema.find({});
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
});



// LOGIN

app.post("/login", async (req, res) => {
    try {
        const{email, password} = req.body.userData;
        if(!email || !password){
            return res.json({ success: false, message: "All Fields Are Required"})
        }

        const user = await UserSchema.findOne({email: email});
        if(!user){
            return res.json({
                success: false,
                message: "User is not exist, Please check your email"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if(!isPasswordValid){
            return res.json({success: false, message: "Invalid password Please try again later"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET) //Setting expiry time 1 hour , {expiresIn: '1h'}
        // console.log(token, "token");
        res.cookie("token", token)

        return res.json({success: true, message:"Login Successfull", userData: user,})
        
        // res.send("Login");

    } catch (error) {
        console.log(error, "error")
        return res.json({error, success: false});
    }
}
);

// Validate Token copied from validate-token
app.get("/validate-token", async (req, res) =>{
    try {
        const token = req?.cookies?.token;
        console.log(token)
        if(!token){
            return res.json({
                success: false,
                message: "Invalid Token"
            });
        }
        const decodedData = await jwt.verify(token, process.env.JWT_SECRET) 
        // console.log(decodedData);
        if(!decodedData.id){
            return res.json({
                success: false,
                message: "Token Expired"
            });
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if(decodedData.exp < currentTime){
            return res.json({
                success: false,
                message: "Token Expired"
            });
        }

        const user = await UserSchema.findById(decodedData.id);
        console.log(user)
        if(!user){
            return res.json({
                success: false,
                message: "Invalid Token"
            })
        }

        return res.json({user, success: true})

    } catch (error) {
        console.log(error, "error")
        return res.json({error, success: false});
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