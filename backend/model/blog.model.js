// //editBlog()
// //getBlogs(num,filter)
// //getBlogById(id)
// //getShareCount()
// //setShareCount()
// //setAvgReview()
// //setAvgReview()
// //deleteBlog()
// //flagBlog()
import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js"; // Ensure you have a Sequelize instance
import User from "./user.model.js"; // Import User model for association
import Category from "./categories.model.js"; // Import Category model for association
import Location from "./location.model.js"; // Import Location model for association

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    photos: {
      type: DataTypes.BLOB("long"), // `BYTEA` maps to BLOB
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    shares_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    categories_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "location",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Blog",
    tableName: "blog",
    timestamps: false, // Set to true if you want `createdAt` & `updatedAt`
  }
);

// Define associations
Blog.belongsTo(User, { foreignKey: "user_id" });
Blog.belongsTo(Category, { foreignKey: "categories_id" });
Blog.belongsTo(Location, { foreignKey: "location_id" });

export default Blog;
