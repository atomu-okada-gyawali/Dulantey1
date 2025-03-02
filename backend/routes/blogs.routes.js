import { Router } from "express";
const router = Router();
import blogController from "../controller/blog.controller.js";
import upload from "../middleware/multerConfig.js";
// import authenticateToken from "../middleware/token-middleware.js";

// router.get("/registration", );
router.post("/createBlog", upload.single("photo"), blogController.create);
router.post("/insertMockBlogs", blogController.insertMockBlogs);
router.put("/updateBlog/:id", blogController.update);
router.delete("/deleteBlog/:id", blogController.delete);
router.get("/get5Blogs/:fromBlogId", blogController.getNext5Blogs);
router.get("/getBlogById/:id", blogController.getBlogsById);
router.put("/shareIncrease/:id", blogController.shareIncrease);
router.get("/get5BlogsSelf/:id/:fromBlogId", blogController.get5BlogsSelf);

export default router;
