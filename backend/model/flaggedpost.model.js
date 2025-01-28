import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js"; // Ensure you have a Sequelize instance
import Blog from "./user.blog.js";
class FlaggedPost extends Model {}

FlaggedPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      references: {
        model: "blog",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "FlaggedPost",
    tableName: "FlaggedPost",
    timestamps: false, // Set to true if you want `createdAt` & `updatedAt`
  }
);
FlaggedPost.belongsTo(Blog, { foreignKey: "blog_id" });
export default FlaggedPost;
