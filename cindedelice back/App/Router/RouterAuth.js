import { Router } from "express";
import authController from "../Controllers/AuthControllers.js";

const router = Router();

router.post("/register", authController.create);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

export default router;
