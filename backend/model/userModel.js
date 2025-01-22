import pool from "../db"; // PostgreSQL client
import dotenv from "dotenv"; // For environment variables

dotenv.config(); // Load environment variables

const User = {
  create: async (fullname, email, username, date_of_birth, location) => {
    const result = await pool.query(
      "INSERT INTO items (full_name, email, username, date_of_birth, location) VALUES ($1, $2,$3,$4,$5) RETURNING *",
      [fullname, email, username, date_of_birth, location]
    );
    return result.rows[0];
  },
};

module.exports = User;
