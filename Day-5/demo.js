import express from 'express';

const app = express();

// app.use(express.json());

app.get('/',(req,res) => {
    res.send("Working...")
});

app.listen(3001, () => {
    console.log("Server is listining on port 3001");
});

