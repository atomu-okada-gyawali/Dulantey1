import { Router } from "express";
const router = Router();
import reviewController from "../controller/review.controller.js";

// router.get("/registration", );
router.post("/", reviewController.create);
router.get("/getAvg/:blog_id", reviewController.getAvg);
router.put("/:blog_id/:user_id", reviewController.update);

export default router;
