import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";

class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: "role",
    timestamps: false,
  }
);

export default Role;
