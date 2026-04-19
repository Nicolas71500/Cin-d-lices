import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";
import Recipe from "./Recipes.js";
// 1. Je crée ma classe qui hérite de Model
class Preparation extends Model {}

// 2. J'initialise mon modèle
Preparation.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    step_position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipes_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Preparation",
    tableName: "preparation",
    timestamps: false,
  }
);

export default Preparation;
