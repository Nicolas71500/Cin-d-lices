import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Recipe from "../Models/Recipes.js";
import Ingredient from "../Models/Ingredient.js";
import Movies from "../Models/Movie.js";
import Category from "../Models/Category.js";
import Preparation from "../Models/Preparation.js";

// Recréation de __dirname pour ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fonction pour sauvegarder une image encodée en base64 dans un fichier
const saveBase64Image = (base64String, filename, directory) => {
  try {
    if (!base64String || typeof base64String !== "string") {
      throw new Error("Image encodée invalide ou manquante.");
    }

    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const imageName = `${filename}_${Date.now()}.png`;

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "images",
      directory,
      imageName
    );
    console.log("Chemin complet du fichier :", filePath);

    // Si le dossier n'existe pas, le créer
    if (!fs.existsSync(path.join(__dirname, "..", "..", "images", directory))) {
      fs.mkdirSync(path.join(__dirname, "..", "..", "images", directory), {
        recursive: true,
      });
    }

    // Enregistrer l'image
    fs.writeFileSync(filePath, buffer);

    return imageName;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'image :", error.message);
    throw new Error("Erreur lors de la sauvegarde de l'image.");
  }
};

// Fonction de création de recette
export const createRecipe = async (req, res) => {
  try {
    const {
      name,
      difficulty,
      anecdote,
      total_duration,
      picture,
      movie_picture,
      dish_types_id,
      category_id, // ID de la catégorie (lié au film)
      movie_name,
      ingredients,
      preparation,
    } = req.body;

    const user_id = req.user?.id;

    // Validation des champs obligatoires
    if (!name || !dish_types_id || !movie_name) {
      return res
        .status(400)
        .json({ message: "Certains champs obligatoires sont manquants." });
    }

    // Sauvegarder les images
    const recipeImageName = saveBase64Image(picture, name, "recipes");
    const movieImageName = saveBase64Image(movie_picture, movie_name, "movies");

    // Vérifier si le film existe déjà et inclure la catégorie
    let movie = await Movies.findOne({
      where: { name: movie_name },
      include: [{ model: Category, as: "Category" }],
    });

    // Si le film n'existe pas, on le crée
    if (!movie) {
      movie = await Movies.create({
        name: movie_name,
        picture: movieImageName,
        category_id,
      });
    } else {
      // Mettre à jour la catégorie si nécessaire
      if (movie.category_id !== category_id) {
        movie.category_id = category_id;
        await movie.save();
      }
    }

    // Création de la recette
    const recipe = await Recipe.create({
      name,
      difficulty,
      anecdote,
      total_duration,
      picture: recipeImageName,
      dish_types_id,
      user_id,
      movie_id: movie.id,
    });

    // Gestion des étapes de préparation
    if (preparation) {
      const preparationsArray = preparation
        .split("\n")
        .map((prep) => prep.trim());

      if (preparationsArray.length > 0) {
        const preparationsToCreate = preparationsArray.map((prep, index) => ({
          description: prep,
          step_position: index + 1,
          recipes_id: recipe.id,
        }));

        await Preparation.bulkCreate(preparationsToCreate);
      }
    }

    // Gestion des ingrédients
    if (ingredients) {
      const ingredientsArray = ingredients.split("\n").map((ing) => ing.trim());

      for (const ingredientInfo of ingredientsArray) {
        const match = ingredientInfo.match(/(.+)\((.+)\)/);
        if (!match) {
          console.log(`Format incorrect pour l'ingrédient : ${ingredientInfo}`);
          continue;
        }

        const [ingredientName, quantity] = match.slice(1, 3).map(s => s.trim());

        await Ingredient.create({
          name: ingredientName,
          quantity,
          recipe_id: recipe.id,
        });
      }
    }

    res.status(201).json(recipe);
  } catch (error) {
    console.error("Erreur lors de la création de la recette :", error);
    res.status(500).json({
      message: "Erreur lors de la création de la recette",
      error: error.message,
    });
  }
};
