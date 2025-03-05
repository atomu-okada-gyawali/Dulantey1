import { Router } from "express";
const router = Router();
import blogController from "../controller/blog.controller.js";
import upload from "../middleware/multerConfig.js";
// import authenticateToken from "../middleware/token-middleware.js";

// router.get("/registration", );
router.post("/createBlog", upload.single("photo"), blogController.create);
router.put("/updateBlog/:id", upload.single("photo"), blogController.update);
router.delete("/deleteBlog/:id", blogController.delete);
router.get("/getAllBlogs", blogController.getAllBlogs);
router.get("/getBlogById/:id", blogController.getBlogsById);
router.put("/shareIncrease/:id", blogController.shareIncrease);
router.get("/getAllBlogsSelf/:id/", blogController.getAllBlogsSelf);

export default router;
