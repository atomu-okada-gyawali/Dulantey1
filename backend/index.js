require("dotenv").config();
import express, { json } from "express";
import cors from "cors";
import pool from "./db";
dontenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(json()); // Allows receiving JSON in request body

// Sample Route
app.get("/", (req, res) => {
  res.send("PERN Stack Backend Running...");
});

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
