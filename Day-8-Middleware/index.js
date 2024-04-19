import express from "express";
import morgan from "morgan";
import allRoutes from "./routes/index.js"
import { isValidToken } from "./middlewares/user.middlewares.js";



const app = express();

app.use(express.json());

app.use(morgan("combined"));

// User Level MiddleWare

app.use((req, res, next) => {
    const { isCompletedAssignment } = req.body;
    console.log(isCompletedAssignment, "isCompletedAssignment");
    if(isCompletedAssignment === "true"){
        next();
    }else{
        res.send("First Complete The Assignment..")
    }
});


// Error Handling Middleware

// app.use((error, req, res, next) => {
//     if(error){
//         res.send(error)
//     }else{
//         next();
//     }
// });


// First use get request then post 
app.post("/", (req,res) => {
    res.send("Congrulations on completing your assignments")
});

app.post("/name", (req,res) => {
    res.send("Srushti..")
})

app.use("/api/v1", allRoutes);


app.post("/", isValidToken, (req,res) => {
    res.send("isValidToken...");
})

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
})