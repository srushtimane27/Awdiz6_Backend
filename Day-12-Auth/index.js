import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AllRoutes from "./routes/index.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser());

var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req,res) => {
    res.send("Hello From Auth...")
})



app.use("/api/v1", AllRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB CONNECTED...")
})

app.listen(3001,()=> {
    console.log("Server Listining on port 3001");
});