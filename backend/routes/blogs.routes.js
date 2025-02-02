import { Router } from "express";
const router = Router();
import blogController from "../controller/blog.controller.js";

// router.get("/registration", );
router.post("/createBlog", blogController.create);
router.put("/updateBlog/:id", blogController.update);
router.delete("/deleteBlog/:id", blogController.delete);
router.get("/getAllBlogs", blogController.getAllBlogs);
router.get("/getBlogById/:id", blogController.getBlogsById);


export default router;