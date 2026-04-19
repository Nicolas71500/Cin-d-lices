import Recipe from "../Models/Recipes.js";
import DishTypes from "../Models/DishTypes.js";
import Ingredient from "../Models/Ingredient.js";
import Movies from "../Models/Movie.js";
import Users from "../Models/Users.js";
import Preparation from "../Models/Preparation.js";
import Category from "../Models/Category.js";
import RecipeHasIngredient from "../Models/RecipeHasIngredient.js";
import { Op } from "sequelize";
import Sequelize from "sequelize";
import isAdmin from "../Middlewares/isAdmin.js";
import Likes from "../Models/Likes.js";

export const getRecipes = {
  async index(req, res) {
    console.log("Received query parameters:", req.query);

    try {
      const { difficulty } = req.query;
      let recipes;

      if (difficulty) {
        recipes = await Recipe.findAll({
          where: {
            difficulty: {
              [Op.eq]: difficulty,
            },
          },
          include: [
            { model: Ingredient, as: "Ingredient" },
            { model: Preparation, as: "Preparations" },
          ],
        });
      } else {
        recipes = await Recipe.findAll({
          include: [
            { model: Ingredient, as: "Ingredient" },
            { model: Preparation, as: "Preparations" },
          ],
        });
      }

      if (recipes.length > 0) {
        res.json(recipes);
      } else {
        res.status(404).json({ message: "No recipes found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving recipes", error: error.message });
    }
  },
};

export const getRecipe = {
  async index(req, res) {
    try {
      const recipe = await Recipe.findByPk(req.params.id, {
        include: [
          { model: Ingredient, as: "Ingredient" },
          {
            model: Movies,
            as: "Movie",
            attributes: ["id", "name", "picture", "trailer_url"],
            include: [
              { model: Category, as: "Category", attributes: ["name"] },
            ],
          },
          { model: DishTypes, as: "DishType" },
          { model: Users, as: "User", attributes: ["username", "id"] },
          { model: Preparation, as: "Preparations" },
        ],
      });

      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving recipe", error: error.message });
    }
  },

  async getRandomRecipes(req, res) {
    try {
      const recipes = await Recipe.findAll({
        limit: 10,
        order: Sequelize.literal("RANDOM()"),
        include: [
          { model: Ingredient, as: "Ingredient" },
          {
            model: Movies,
            as: "Movie",
            attributes: ["name", "picture"],
            include: [
              {
                model: Category,
                as: "Category",
                attributes: ["name"],
              },
            ],
          },
          { model: DishTypes, as: "DishType" },
          { model: Users, as: "User", attributes: ["username", "id"] },
          { model: Preparation, as: "Preparations" },
        ],
      });

      if (recipes.length > 0) {
        res.json(recipes);
      } else {
        res.status(404).json({ message: "No recipes found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving recipes", error: error.message });
    }
  },

  async getRandomRecipe(req, res) {
    try {
      const recipe = await Recipe.findOne({
        order: Sequelize.literal("RANDOM()"),
        include: [
          { model: Ingredient, as: "Ingredient" },
          {
            model: Movies,
            as: "Movie",
            attributes: ["name", "picture"],
            include: [
              {
                model: Category,
                as: "Category",
                attributes: ["name"],
              },
            ],
          },
          { model: DishTypes, as: "DishType" },
          { model: Users, as: "User", attributes: ["username", "id"] },
          { model: Preparation, as: "Preparations" },
        ],
      });

      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: "No recipe found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving the recipe", error: error.message });
    }
  },
};

export const getRecentRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      limit: 6,
      order: [['id', 'DESC']],
      include: [
        { model: Movies, as: 'Movie', attributes: ['name', 'picture'] },
        { model: Users, as: 'User', attributes: ['username'] },
      ],
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecipeDishTypes = {
  async index(req, res) {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: {
        model: DishTypes,
        attributes: ["name"],
      },
    });
    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }

    if (!recipe.DishType) {
      return res
        .status(404)
        .json({ message: "No dish type found for this recipe" });
    }

    return res.json(recipe.DishType);
  },
};

export const getRecipeMovies = {
  async index(req, res) {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: {
        model: Movies,
        attributes: ["name", "picture"],
        as: "Movie",
      },
    });
    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }

    return res.json(recipe.Movie);
  },
};

export const getRecipeUser = {
  async index(req, res) {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: {
        model: Users,
        attributes: ["username"],
        as: "User",
      },
    });
    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }

    return res.json(recipe.User);
  },
};

export const getRecipeIngredients = {
  async index(req, res) {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: {
        model: Ingredient,
        attributes: ["name", "quantity"],
        as: "Ingredient",
      },
    });
    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }

    return res.json(recipe.Ingredient);
  },
};

export const getRecipesByDishType = {
  async index(req, res) {
    try {
      const { dishtypeId } = req.params;

      const recipes = await Recipe.findAll({
        where: {
          dish_types_id: dishtypeId,
        },
        include: {
          model: DishTypes,
          attributes: ["name"],
        },
      });

      if (!recipes || recipes.length === 0) {
        return res
          .status(404)
          .json({ message: "No recipes found for this dish type" });
      }

      return res.json(recipes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch recipes" });
    }
  },
};
export const createRecipe = {
  async index(req, res) {
    try {
      const {
        name,
        difficulty,
        anecdote,
        total_duration,
        picture,
        dish_types_id,
        movie_name,
        movie_picture,
        preparation,
        ingredients,
      } = req.body;

      // Récupérer l'ID utilisateur à partir du token (défini dans `req.user` par le middleware)
      const user_id = req.user.id; // Assurez-vous que l'utilisateur est inclus dans le token

      // Vérifier si le film existe déjà
      let movie = await Movies.findOne({ where: { name: movie_name } });

      // Si le film n'existe pas, on le crée
      if (!movie) {
        movie = await Movies.create({
          name: movie_name,
          picture: movie_picture,
        });
      }

      // Créer la recette avec le film existant ou nouvellement créé et l'ID utilisateur
      const recipe = await Recipe.create({
        name,
        difficulty,
        anecdote,
        total_duration,
        picture,
        user_id, // Utilisateur authentifié
        dish_types_id,
        movie_id: movie.id, // Lier la recette au film
      });

      // Transformation des chaînes en tableaux
      const preparationsArray = preparation
        ? preparation.split("\n").map((prep) => prep.trim())
        : [];
      const ingredientsArray = ingredients
        ? ingredients.split("\n").map((ing) => ing.trim())
        : [];

      // Ajout des préparations
      if (preparationsArray.length > 0) {
        const preparationsToCreate = preparationsArray.map((prep, index) => ({
          description: prep,
          step_position: index + 1,
          recipes_id: recipe.id,
        }));
        await Preparation.bulkCreate(preparationsToCreate);
      }

      // Ajout des ingrédients
      if (ingredientsArray.length > 0) {
        for (const ingredientName of ingredientsArray) {
          let ingredient = await Ingredient.findOne({
            where: { name: ingredientName },
          });

          if (!ingredient) {
            ingredient = await Ingredient.create({
              name: ingredientName,
              quantity: 1,
              recipe_id: recipe.id,
            });
          } else {
            await ingredient.update({ recipe_id: recipe.id });
          }

          await RecipeHasIngredient.create({
            recipes_id: recipe.id,
            ingredients_id: ingredient.id,
          });
        }
      }

      // Retourner la recette créée
      res.json(recipe);
    } catch (error) {
      console.error("Erreur lors de la création de la recette :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création de la recette" });
    }
  },
};

export const updateRecipe = {
  async index(req, res) {
    try {
      const { name, difficulty, anecdote, total_duration, dish_types_id, movie_id, preparations, ingredients } = req.body;

      const recipe = await Recipe.findByPk(req.params.id);
      if (!recipe) return res.status(404).json({ message: "Recette introuvable" });

      await recipe.update({ name, difficulty, anecdote, total_duration, dish_types_id, movie_id });

      if (Array.isArray(preparations)) {
        await Preparation.destroy({ where: { recipes_id: recipe.id } });
        if (preparations.length > 0) {
          await Preparation.bulkCreate(
            preparations.map((p, i) => ({
              description: p.description,
              step_position: i + 1,
              recipes_id: recipe.id,
            }))
          );
        }
      }

      if (Array.isArray(ingredients)) {
        await Ingredient.destroy({ where: { recipe_id: recipe.id } });
        await RecipeHasIngredient.destroy({ where: { recipes_id: recipe.id } });
        for (const ing of ingredients) {
          const newIng = await Ingredient.create({
            name: ing.name,
            quantity: ing.quantity || null,
            recipe_id: recipe.id,
          });
          await RecipeHasIngredient.create({
            recipes_id: recipe.id,
            ingredients_id: newIng.id,
          });
        }
      }

      const updated = await Recipe.findByPk(req.params.id, {
        include: [
          { model: Users, as: "User", attributes: ["username"] },
          { model: Movies, as: "Movie", attributes: ["id", "name"] },
          { model: DishTypes, as: "DishType", attributes: ["id", "name"] },
          { model: Preparation, as: "Preparations" },
          { model: Ingredient, as: "Ingredient" },
        ],
      });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export const deleteRecipe = {
  async index(req, res) {
    try {
      const recipeId = req.params.id;

      await Ingredient.destroy({ where: { recipe_id: recipeId } });

      await RecipeHasIngredient.destroy({ where: { recipes_id: recipeId } });

      await Preparation.destroy({ where: { recipes_id: recipeId } });

      await Recipe.destroy({ where: { id: recipeId } });

      res
        .status(200)
        .json({ message: "La recette a été supprimée avec succès !" });
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la recette" });
    }
  },
};
