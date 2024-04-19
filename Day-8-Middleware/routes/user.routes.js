import { Router } from "express";

const router = Router();

router.get("/hey", (req,res) => {
    res.send("Hey Hello");
});

export default router;