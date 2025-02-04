import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import {syncDatabase} from "./model/index.js";
config();

import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import blogRoutes from "./routes/blogs.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import commentRoutes from "./routes/comment.routes.js";
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(json()); // Parse JSON requests

syncDatabase();
// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
