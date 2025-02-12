import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js"; // Ensure you have a Sequelize instance

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique:true,
    },
  },
  {
    sequelize,
    modelName: "location",
    tableName: "location",
    timestamps: false, // Set to true if you want `createdAt` & `updatedAt`
  }
);

export default Location;
