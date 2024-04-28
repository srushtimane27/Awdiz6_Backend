export const Login = (req,res) => {
    try {
        const {email, password } = req.body;
        console.log( email, password, "loginData");
        res.send(true);
    } catch (error) {
        return res.status(500).json({ success: false, error: error});
    }
}