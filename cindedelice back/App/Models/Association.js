import Ingredient from "./Ingredient.js";
import DishTypes from "./DishTypes.js";
import Movies from "./Movie.js";
import Recipe from "./Recipes.js";
import Users from "./Users.js";
import Category from "./Category.js";
import RecipeHasIngredient from "./RecipeHasIngredient.js";
import Role from "./Role.js";
import Preparation from "./Preparation.js";
import Comment from "./comment.js";
import Likes from "./Likes.js";

Ingredient.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  as: "recipes",
  onDelete: "CASCADE",
});
Recipe.hasMany(Ingredient, {
  foreignKey: "recipe_id",
  as: "Ingredient",
  onDelete: "CASCADE",
});

// RecipeHasIngredient <-> Recipe & Ingredient
RecipeHasIngredient.belongsTo(Ingredient, {
  foreignKey: "ingredients_id",
  onDelete: "CASCADE",
});
RecipeHasIngredient.belongsTo(Recipe, {
  foreignKey: "recipes_id",
  onDelete: "CASCADE",
});
Recipe.hasMany(RecipeHasIngredient, {
  foreignKey: "recipes_id",
  onDelete: "CASCADE",
});

// Recipe <-> Users, DishTypes, Movies
Recipe.belongsTo(Users, { foreignKey: "user_id" });
Recipe.belongsTo(DishTypes, { foreignKey: "dish_types_id" });
Recipe.belongsTo(Movies, { foreignKey: "movie_id" });

// Preparation <-> Recipe
Recipe.hasMany(Preparation, { foreignKey: "recipes_id", as: "Preparations", onDelete: "CASCADE" });
Preparation.belongsTo(Recipe, { foreignKey: "recipes_id", as: "recipes" });

// Movies <-> Category
Movies.belongsTo(Category, { foreignKey: "category_id", as: "Category" });
Movies.hasMany(Recipe, {
  foreignKey: "movie_id",
  as: "recipe",
  onDelete: "CASCADE",
});

// Users <-> Role
Users.belongsTo(Role, { foreignKey: "role_id", as: "Role" });
Role.hasMany(Users, { foreignKey: "role_id", as: "Users" });
Users.hasMany(Recipe, { foreignKey: "user_id" });

// Comment <-> User
Comment.belongsTo (Users, {as : "commentUser", foreignKey : "user_id"});
Users.hasMany (Comment, { as : "userComment", foreignKey: "user_id" });

// Comment <-> Recipe
Comment.belongsTo (Recipe, {as : "commentRecipe", foreignKey: "recipe_id"});
Recipe.hasMany (Comment, { as : "comments", foreignKey: "recipe_id" });

// Likes <-> User
Likes.belongsTo (Users, {as : "likesUsers", foreignKey : "user_id"});
Users.hasMany (Likes, { as : "userLikes", foreignKey: "user_id" });

// Likes <-> Recipe
Likes.belongsTo (Recipe, {as : "likesRecipe", foreignKey: "recipe_id"});
Recipe.hasMany (Likes, { as : "recipesLikes", foreignKey: "recipe_id" });

export {
  Ingredient,
  DishTypes,
  Movies,
  Recipe,
  RecipeHasIngredient,
  Role,
  Preparation,
  Category,
  Users,
  Comment,
  Likes
};
