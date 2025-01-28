// import pool from "../db"; // PostgreSQL client
// import dotenv from "dotenv"; // For environment variables

// dotenv.config(); // Load environment variables

// const Review = {
  // create: async (blog_id,user_id,review) => {
  //   const result = await pool.query(
  //     "INSERT INTO review (blog_id,user_id,review) VALUES ($1, $2,$3) RETURNING *",
  //     [blog_id,user_id,review]
  //   );
  //   return result.rows[0];
  // },
  // getAvg: async(blog_id)=>{
  //   const result = await pool.query(
  //     "SELECT AVG(review) FROM review WHERE blog_id=$1",
  //     [blog_id]
  //   );
  //   return result.rows[0];
  // },
  // update: async(review,blog_id,user_id)=>{
  //   const result = await pool.query(
  //       "UPDATE review SET review=$1 WHERE blog_id=$2 AND user_id=$3 RETURNING *",
  //       [review,blog_id,user_id]
  //   );
  // }
// };

// module.exports = Review;
import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js"; // Ensure you have a Sequelize instance
import User from "./user.model.js"; // Import User model for association
import Blog from "./blog.model.js"; // Import Blog model for association

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blog",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    review: {
      type: DataTypes.DECIMAL(19, 2), // Matches `numeric(19,2)` in PostgreSQL
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "review",
    timestamps: false, // Set to true if you want `createdAt` & `updatedAt`
  }
);

// Define associations
Review.belongsTo(User, { foreignKey: "user_id" });
Review.belongsTo(Blog, { foreignKey: "blog_id" });

export default Review;
