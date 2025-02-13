import express from "express";
import authController from "../controller/authController.js";
import authenticateToken from "../middleware/token-middleware.js";
const router = express.Router();

router.get("/init", authenticateToken, authController.init);
router.post("/login", authController.login);

export default router;
