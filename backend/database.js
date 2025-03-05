import { Sequelize } from "sequelize";
import dotenv from "dotenv"; // Change to import statement
dotenv.config(); // Load environment variables

const sequelize = new Sequelize("dulantey", "postgres", "dulantey_aura", {
  host: "127.0.0.1",
  dialect: "postgres",
  logging: false, // Disable logging SQL queries (optional)
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
