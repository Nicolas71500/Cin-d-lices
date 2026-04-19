import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";
import Role from "./Role.js";

// 1. Je crée ma classe qui hérite de Model
class Users extends Model {}

// 2. J'initialise mon modèle
Users.init(
  {
    first_name: {
      type: DataTypes.TEXT,
    },
    last_name: {
      type: DataTypes.TEXT,
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
    },
    email_address: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);

export default Users;
