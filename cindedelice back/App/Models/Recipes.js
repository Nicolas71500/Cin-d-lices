import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";
import User from "./Users.js";
import DishTypes from "./DishTypes.js";
import Movies from "./Movie.js";

class Recipe extends Model {}

Recipe.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
    },
    anecdote: {
      type: DataTypes.TEXT,
    },
    total_duration: {
      type: DataTypes.INTEGER,
    },
    picture: {
      type: DataTypes.TEXT,
    },
    is_checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    dish_types_id: {
      type: DataTypes.INTEGER,
      references: {
        model: DishTypes,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Movies,
        key: "id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Recipes",
    tableName: "recipes",
    timestamps: false,
  }
);

export default Recipe;
