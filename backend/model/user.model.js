import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js";
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
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
      type: DataTypes.STRING, // `BYTEA` maps to BLOB
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: true, // Set to true if you have `createdAt` and `updatedAt`
  }
);
export default User;
