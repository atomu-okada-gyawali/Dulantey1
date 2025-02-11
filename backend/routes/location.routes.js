import { Router } from "express";
import Location from "../model/location.model.js"; // Import the Location model

const router = Router();

// Route to get all locations
router.get("/", async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
