import sequelize from "../database.js";
import User from "./user.model.js";
import Blog from "./blog.model.js";
import Review from "./review.model.js"; // Import Review model

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Blog = Blog; // Add Blog model
db.Review = Review; // Add Review model
// Sync database
db.sequelize.sync({ alter: true }) // Use { force: true } for development (drops & re-creates tables)
  .then(() => console.log("✅ Database synchronized"))
  .catch((err) => console.error("❌ Error syncing database:", err));

export default db;
