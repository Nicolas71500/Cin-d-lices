import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";

class DishTypes extends Model {}

DishTypes.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DishTypes",
    tableName: "dishtypes",
    timestamps: false,
  }
);

export default DishTypes;
