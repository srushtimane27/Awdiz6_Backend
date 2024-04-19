import express from "express";
import mongoose from "mongoose";


const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    res.send("HELLO FROM DEMO")
});

app.post('/register', async (req,res) => {
    try {
        const  { name, email, password, age } = req.body;
        if(!name || !email || !password || !age)
        return res
          .status(404)
          .json({ success: false, message: "All fields are required..."});

          const user = new UserSchema2({
            name: name,
            email: email,
            password: password,
            age : age,
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

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB CONNECTED");
})


app.listen(3000, () => {
    console.log("Server on 3000")
})


