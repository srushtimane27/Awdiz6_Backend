import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Its Working...")
});

app.post('/register', (req, res) => {
    try {
        console.log(req.body, "request body");

        const{ name, email, password, confirmPassword } = req.body;
        console.log(name, email, password, confirmPassword,"name");

        if(!name || !email || !password || !confirmPassword){
            res.send("All Fields Are Required")
        }
        if(password !== confirmPassword){
            res.send("Password and Confirm Password are not same")
        }
        // Store data in monodb
        res.send("Registration Successfull");
        console.log("Regi Success")
    } catch (error) {
        res.send(error)
    }
})

app.listen(3000, () => {
    console.log("Server is listining on port 3000");
});