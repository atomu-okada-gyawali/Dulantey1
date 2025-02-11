import { Router } from "express";
import Categories from "../model/categories.model.js"; // Import the Categories model
import CategoriesController from "../controller/categories.controller.js";

const router = Router();

// Route to get all categories
router.get("/:id", CategoriesController.getById);

export default router;
