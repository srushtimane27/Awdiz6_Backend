import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send("HELLOO...")
});

app.post('/register',(req,res) => {
    try {
        console.log(req.body, "requested body");

        const {name, email, password, confirmPassword} = req.body;
        console.log(name,email,password, confirmPassword, "name");

        if(!name || !email || !password || !confirmPassword){
            res.send("All fields are required")
        }
        if(password !== confirmPassword){
            res.send("password and confirm Password are not same")
        }
        res.send("Registration Completed");
        console.log("Regi Success")
    } catch (error) {
        res.send(error)
    }
})


app.listen(3000, () => {
    console.log("SERVER LISTINING ON PORT 3000")
});

