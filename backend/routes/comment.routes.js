import { Router } from "express";
const router = Router();
import commentController from "../controller/comment.controller.js";

// router.get("/registration", );
router.post("/", commentController.create);

export default router;
