import sequelize from "../database.js";
import User from "./user.model.js";
import Blog from "./blog.model.js";
import Review from "./review.model.js"; // Import Review model
import Category from "./categories.model.js"; // Import Category model
import Location from "./location.model.js"; // Import Location model

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Blog = Blog; // Add Blog model
db.Review = Review; // Add Review model
db.Category = Category; // Add Category model
db.Location = Location; // Add Location model

const syncDatabase = async () => {
  try {
    await db.sequelize.sync({ alter: true }); // Prevent dropping tables on each server start

    console.log("✅ Database tables created or updated successfully");
  } catch (err) {
    console.error("❌ Error syncing database:", err);
  }
};

export { db, syncDatabase };
