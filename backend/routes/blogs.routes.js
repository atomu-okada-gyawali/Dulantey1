import { Router } from "express";
const router = Router();
import blogController from "../controller/blog.controller.js";

// router.get("/registration", );
router.post("/createBlog", blogController.create);

export default router;
