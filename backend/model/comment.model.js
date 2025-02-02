import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js";
import User from "./user.model.js"; // Import User model for association
import Blog from "./user.blog.js"; // Import Blog model for association
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "blog",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: "comment",
    tableName: "comment",
    timestamps: false, // Set to true if you want `createdAt` & `updatedAt`
  }
);

// Define associations
Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(Blog, { foreignKey: "blog_id" });

export default Comment;
