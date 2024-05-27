import { Router } from "express";
import { login, register, validateToken, logout, addToCart } from "../controllers/user.controllers.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validate-token', validateToken);
router.get('/logout', logout);
router.post('/add-to-cart', addToCart);


export default router;