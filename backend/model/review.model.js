
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
      type: DataTypes.DECIMAL(19, 2), 
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "review",
    timestamps: true, 
  },

);

// Define associations
Review.belongsTo(User, { foreignKey: "user_id" });
Review.belongsTo(Blog, { foreignKey: "blog_id" });

export default Review;
