import express from "express";

const app = express();

app.use(express.json());

const users = [
    { id: 1, name: "Srushti", email: "sru@gmail.com" },
    { id: 2, name: "Aarti", email: "aarti@gmail.com" },
    { id: 3, name: "Malhar", email: "mall@gmail.com" },
];

app.get("/", (req, res) => {
    res.send("Working Day6...")
});

app.put("/update-data/:id", (req, res) => {
    // res.send(req.params.id);
    try {
        const { name, email } = req.body;
        if (!name || !email)
            return res
                .status(404)
                .json({ message: "All fields are required", success: false });

        const userId = parseInt(req.params.id);
        if (!userId)
            return res
                .status(404)
                .json({ message: "User ID is required", success: false })

        const userData = users.find((user) => user.id === userId);
        if (!userData)
            return res
                .status(404)
                .json({ message: "User not exists...", success: false });
        // console.log(userData);

        userData.name = name;
        userData.email = email;

        res.status(200)
        .json({success: true
            , message:"Userdata update successfully"
            , updatedUserData: userData,});

    } catch (error) {
        return res.send(error)
    }
});

app.listen(3000, () => {
    console.log("Server Listining On Port 3000...")
})