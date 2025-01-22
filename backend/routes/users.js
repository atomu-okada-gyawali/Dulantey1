import { Router } from "express";
const router = Router();
import { registerUser } from "../controller/userController";

// router.get("/registration", );
router.post("/registration", registerUser);


export default router;
