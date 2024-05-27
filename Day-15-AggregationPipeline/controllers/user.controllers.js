import UserSchema from "../schemas/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    // res.send("Register")
    try {
        const { name, email, password, confirmPassword, role} = req.body.userData;
        if(!name || !email || !password || !confirmPassword || !role){
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
            role: role,
        });
        await newUser.save();

        return res.json({success: true, message:"Registration Completed"})

    } catch (error) {
        console.log(error, "error");
        return res.json({error, success: false});
    }
};

export const login = async (req, res) => {
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
        console.log(token, "token");
        res.cookie("token", token)

        return res.json({success: true, message:"Login Successfull", userData: {name: user.name, email: user.email, role: user.role, _id: user._id},})
        
        // res.send("Login");

    } catch (error) {
        console.log(error, "error")
        return res.json({error, success: false});
    }
};

export const validateToken = async (req, res) =>{
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
};


export const logout = async (req,res) => {
    try {
        res.cookie("token", "");
        return res.json({success: true, message: "Logout Successfull"})
    } catch (error) {
        console.log(error, "error");
        return res.json({error, success: false})
    }
}

export const addToCart = async (req,res) => {
    try {
        const{ userId, productId } = req.body;
        console.log(userId, productId);
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            {
               $addToSet: {cart: productId}
            },
            {
                new: true
            }
         );
         if(!user){
            return res.json({success: false, message: "User Not Found"})
         }
         console.log(user, "user")
         return res.json({success: true, message: "Product successfully added to cart"})
    } catch (error) {
        console.log(error, "error");
        return res.json({error, success: false});
    }
}