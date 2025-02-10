import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js"; // Ensure you have a Sequelize instance

class Categories extends Model { }

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  {
    sequelize,
    modelName: "categories",
    tableName: "categories",
    timestamps: false, // Set to true if you want `createdAt` & `updatedAt`
  }
);

export default Categories;