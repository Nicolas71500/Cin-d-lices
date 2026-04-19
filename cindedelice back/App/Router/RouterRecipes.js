import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  getRecipeDishTypes,
  getRecipeIngredients,
  getRecipesByDishType,
  updateRecipe,
  deleteRecipe,
  getRecipeMovies,
  getRecipeUser,
} from "../Controllers/RecipesControllers.js";
import { createRecipe } from "../Controllers/modalController.js";
import isLoggedIn from "../Middlewares/IsLoggedin.js";
import isAdmin from "../Middlewares/isAdmin.js";

const router = Router();

router.get("/recipes", getRecipes.index);
router.get("/recipes/random", getRecipe.getRandomRecipes);
router.get("/recipes/randomOne", getRecipe.getRandomRecipe);
router.get("/recipes/:id(\\d+)", getRecipe.index);
router.get("/recipes/:id(\\d+)/dishtypes", getRecipeDishTypes.index);
router.get("/recipes/:id(\\d+)/ingredients", getRecipeIngredients.index);
router.get("/recipes/dishtypes/:dishtypeId(\\d+)", getRecipesByDishType.index);
router.get("/recipes/:id(\\d+)/users", getRecipeUser.index);
router.get("/recipes/:id(\\d+)/movies", getRecipeMovies.index);
router.post("/recipes", isLoggedIn, createRecipe);
router.put("/recipes/:id(\\d+)", isAdmin, updateRecipe.index);
router.delete("/recipes/:id(\\d+)", isAdmin, deleteRecipe.index);

export default router;
