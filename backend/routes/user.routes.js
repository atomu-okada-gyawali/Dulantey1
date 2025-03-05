import { Router } from "express";
const router = Router();
import UserController from "../controller/user.controller.js"; // Import the UserController
import upload from "../middleware/multerConfig.js";
import multer from "multer";
// router.get("/registration", );
router.post("/registration", UserController.registerUser); // Use the registerUser method from UserController
router.post("/bulkRegister", UserController.registerUsers); // Use the registerUser method from UserController
router.get("/:id", UserController.getUserById);
router.put("/:id",  (req, res, next) => {
    upload.single("photo")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }
      next();
    });
  },
 UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
export default router;
