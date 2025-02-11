import { Router } from "express";
const router = Router();
import UserController from "../controller/user.controller.js"; // Import the UserController

// router.get("/registration", );
router.post("/registration", UserController.registerUser); // Use the registerUser method from UserController
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
export default router;
