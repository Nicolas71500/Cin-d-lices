import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";
import Recipe from "./Recipes.js";

class Ingredient extends Model {}

Ingredient.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Ingredients",
    tableName: "ingredients",
    timestamps: false,
  }
);

export default Ingredient;
