import pool from "../db"; // PostgreSQL client
import dotenv from "dotenv"; // For environment variables

dotenv.config(); // Load environment variables

// Function to insert a new user
const createUser = async (fullName, email, username, dateOfBirth, location) => {
  const query = `
    INSERT INTO "user" (full_name, email, username, date_of_birth, location)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;  // Returns the inserted user
  `;
  const values = [fullName, email, username, dateOfBirth, location];

  try {
    const result = await pool.query(query, values);
    console.log("User created:", result.rows[0]); // Log the created user
    return result.rows[0]; // Return the created user
  } catch (err) {
    console.error("Error creating user:", err.stack);
    throw err; // Rethrow the error to handle it in the calling code
  }
};

// Function to get all users
const getAllUsers = async () => {
  const query = 'SELECT * FROM "user";';

  try {
    const result = await pool.query(query);
    console.log("Users:", result.rows); // Log the list of users
    return result.rows; // Return the list of users
  } catch (err) {
    console.error("Error fetching users:", err.stack);
    throw err;
  }
};

// Export the functions to be used elsewhere in your application
export { createUser, getAllUsers };
