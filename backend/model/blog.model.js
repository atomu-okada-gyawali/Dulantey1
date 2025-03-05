// //editBlog()
// //getBlogs(num,filter)
// //getBlogById(id)
// //getShareCount()
// //setShareCount()
// //setAvgReview()

// //deleteBlog()
// //flagBlog()
import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js"; // Ensure you have a Sequelize instance
import User from "./user.model.js"; // Import User model for association
import Category from "./categories.model.js"; // Import Category model for association
import Location from "./location.model.js"; // Import Location model for association

class Blog extends Model { }

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    photos: {
      type: DataTypes.STRING, // `BYTEA` maps to BLOB
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    shares_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    categories_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "location",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    open_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    close_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Blog",
    tableName: "blog",
    timestamps: true, // Set to true if you want `createdAt` & `updatedAt`
  }
);

// Define associations
Blog.belongsTo(User, { foreignKey: "user_id" });
Blog.belongsTo(Category, { foreignKey: "categories_id" });
Blog.belongsTo(Location, { foreignKey: "location_id" });


export default Blog;
 