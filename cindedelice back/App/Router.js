import { Router } from "express";
import RouterRecipes from "./Router/RouterRecipes.js";
import RouterMovies from "./Router/RouterMovies.js";
import RouterUser from "./Router/RouterUser.js";
import RouterAuth from "./Router/RouterAuth.js";
import RouterIngredient from "./Router/RouterIngredient.js";
import RouterCategory from "./Router/RouterCategory.js";
import RouterDishType from "./Router/RouterDishTypes.js";
import RouterComment from "./Router/RouterComment.js";
import RouterLikes from "./Router/RouterLikes.js";
import Users from "./Models/Users.js";
import Recipes from "./Models/Recipes.js";
import Movies from "./Models/Movie.js";
import DishTypes from "./Models/DishTypes.js";
import Category from "./Models/Category.js";
import Role from "./Models/Role.js";
import isAdmin from "./Middlewares/isAdmin.js";

const router = Router();

router.use(RouterRecipes);
router.use(RouterMovies);
router.use(RouterUser);
router.use(RouterAuth);
router.use(RouterIngredient);
router.use(RouterCategory);
router.use(RouterDishType);
router.use(RouterComment);
router.use(RouterLikes);

// Admin JSON API
router.get("/admin/data", isAdmin, async (req, res) => {
  try {
    const [users, recipes, movies, roles, dishTypes, categories] = await Promise.all([
      Users.findAll({
        include: [{ model: Role, as: "Role", attributes: ["id", "name"] }],
        attributes: { exclude: ["password"] },
      }),
      Recipes.findAll({
        include: [
          { model: Users, attributes: ["username"] },
          { model: Movies, attributes: ["id", "name"] },
          { model: DishTypes, attributes: ["id", "name"] },
        ],
      }),
      Movies.findAll({
        include: [{ model: Category, as: "Category", attributes: ["id", "name"] }],
      }),
      Role.findAll(),
      DishTypes.findAll(),
      Category.findAll(),
    ]);
    res.json({ users, recipes, movies, roles, dishTypes, categories });
  } catch (error) {
    console.error("Erreur admin/data :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

export default router;
