import pool from "../db"; // PostgreSQL client
import dotenv from "dotenv"; // For environment variables

dotenv.config(); // Load environment variables

const Blog = {
  create: async (title, photo, desc, location, user_id, categories_id) => {
    const result = await pool.query(`
      INSERT INTO "blog" (title, photo, description,location,user_id,categories_id)
      VALUES ($1, $2, $3, $4, $5,$6)
      RETURNING *;  // Returns the inserted blog
    `);
    return result.rows[0];
  },
};





//editBlog()
//getBlogs(num,filter)
//getBlogById(id)
//getShareCount()
//setShareCount()
//setAvgReview()
//setAvgReview()
//deleteBlog()
//flagBlog()
