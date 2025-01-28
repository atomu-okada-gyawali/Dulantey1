import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
config();

import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import blogRoutes from "./routes/blogs.routes.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();
const PORT = 3000; // Changed to 3000 to avoid conflict

// Middleware
app.use(cors());
app.use(json()); // Parse JSON requests

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
