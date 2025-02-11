import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.get("/init", authController.init);
router.post("/login", authController.login);

export default router;