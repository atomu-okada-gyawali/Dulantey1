import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { syncDatabase } from "./model/index.js";
import path from "path";
config();

import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import blogRoutes from "./routes/blogs.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import authRouter from "./routes/authRoutes.js";
import Categories from "./model/categories.model.js";
import Location from "./model/location.model.js";
import authenticateToken from "./middleware/token-middleware.js";



const app = express();
const PORT = 5000;

const __dirname = path.resolve(); // Get the current directory



// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // allow both frontend ports
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(json()); // Parse JSON requests

// Sync Database with error handling
syncDatabase()

    .then(() => {
        console.log("Database synchronized successfully.");
        return insertCategories();
    })
    .then(() => {
        return insertLocations();
    })
    .then(() => {
        console.log("Categories and Locations inserted if not already present");
    })
    .catch((err) => {
        console.error("Error during database synchronization or insertion:", err);
        process.exit(1); // Exit the process if there's an error
    });

const categories = [
    {
        name: "Food",
    },
    {
        name: "Outing",
    },
    {
        name: "Events",
    },
];
const locations = [
    {
        name: "Province 1",
    },
    {
        name: "Province 2",
    },
    {
        name: "Province 3",
    },
    {
        name: "Province 4",
    },
    {
        name: "Province 5",
    },
    {
        name: "Province 6",
    },
];

async function insertCategories() {
    for (const category of categories) {
        const [existingCategory] = await Categories.findOrCreate({
            where: { name: category.name },
            defaults: category,
        });
        if (existingCategory) {
            console.log(`Category ${category.name} already exists.`);
        }
    }
}

async function insertLocations() {
    for (const location of locations) {
        const [existingLocation] = await Location.findOrCreate({
            where: { name: location.name },
            defaults: location,
        });
        if (existingLocation) {
            console.log(`Location ${location.name} already exists.`);
        }
    }
    await Location.bulkCreate(locations, { ignoreDuplicates: true }); // Skips duplicate entries

}

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);
app.use(authenticateToken);
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/file", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
