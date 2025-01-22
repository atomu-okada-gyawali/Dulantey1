import { Router } from "express";
const router = Router();
import { createBlog } from "../controller/blogController";

// router.get("/registration", );
router.post("/createBlog", createBlog);


export default router;
