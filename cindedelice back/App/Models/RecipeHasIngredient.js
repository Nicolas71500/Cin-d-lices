import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";
import Ingredient from "./Ingredient.js";
import Recipe from "./Recipes.js";

class RecipeHasIngredient extends Model {}

RecipeHasIngredient.init(
  {
    recipes_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    ingredients_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Ingredient,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Recipes_has_Ingredients",
    tableName: "recipes_has_ingredients",
    timestamps: false,
  }
);

export default RecipeHasIngredient;
