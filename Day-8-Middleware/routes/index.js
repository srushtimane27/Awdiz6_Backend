import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = Router();

router.use((req, res, next) => {
    console.log("Route Level Middleware..");
    next();
})

router.use("/user", userRoutes);

export default router;