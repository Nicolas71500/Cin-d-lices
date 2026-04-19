import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "category",
    timestamps: false,
  }
);

export default Category;
