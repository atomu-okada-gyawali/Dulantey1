import dontenv from "dotenv";
import pkg from "pg"; // Import the default export from pg
const { Pool } = pkg;

dontenv.config();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test the connection
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

export default pool;
