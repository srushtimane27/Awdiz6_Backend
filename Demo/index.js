import express from "express"
// import { Login } from "./models/student.schema.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
import StudentSchema from "./controller/student.controller.js";
import EmpSchema from "./models/employee.schema.js";

const app = express();

dotenv.config();

app.use(express.json());

app.get("/", (req,res) => {
    res.send("HELLO FROM MVC DEMO")
});

app.post("/login", async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password)
        return res
        .status(404)
        .json({success: false, message: "All fields are required..."});

        const student = new StudentSchema({
            email: email,
            password: password
        });
        console.log(student, "Students");
        await student.save();
        res
        .status(201)
        .json({success: true, message:"Login Success..."});
        
    } catch (error) {
        return res.status(500).json({success: false, error});
    }
});

app.post("/emp", async(req,res) => {
    try {
        const {name, id, salary, gender} = req.body;
        if(!name || !id || !salary || !gender)
        return res
    .status(404)
    .json({success: false, message: "All Fields Are Required..."});

    const employee = new EmpSchema({
        name: name,
        id: id,
        salary: salary,
        gender: gender
    });
    console.log(employee, "employee");
    await employee.save();
    res
    .status(201)
    .json({success: true, message: "Data Stored Successfully"})
    } catch (error) {
        return res.status(500).json({success: false, error})
    }
})

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database Connected")
})

app.listen(3000,() => {
    console.log("Server is listining on port 3000")
})

