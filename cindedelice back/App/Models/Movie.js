import { Model, DataTypes } from "sequelize";
import sequelize from "../db/client.js";
import Category from "./Category.js";

// 1. Je crée ma classe qui hérite de Model
class Movies extends Model {}

// 2. J'initialise mon modèle
Movies.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    anecdote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trailer_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Movies",
    tableName: "movies",
    timestamps: false,
  }
);

export default Movies;
