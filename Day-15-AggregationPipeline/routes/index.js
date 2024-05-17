import { Router } from "express";
import UserRoutes from "./user.routes.js";
import ProductRoutes from "./products.routes.js";

const router = Router();

router.use('/user', UserRoutes);
router.use('/product', ProductRoutes);

export default router;