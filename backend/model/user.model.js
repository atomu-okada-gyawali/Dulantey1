import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js"; // Ensure you have a Sequelize instance
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    profile: {
      type: DataTypes.BLOB("long"), // `BYTEA` maps to BLOB
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false, // Set to true if you have `createdAt` and `updatedAt`
  }
);
export default User;
