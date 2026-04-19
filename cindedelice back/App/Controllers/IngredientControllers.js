import Ingredient from "../Models/Ingredient.js";

// Fonction pour obtenir tous les ingrédients
export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour obtenir un ingrédient par ID
export const getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ error: "Ingredient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour créer un nouvel ingrédient

export const createIngredient = async (req, res) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour mettre à jour un ingrédient par ID
export const updateIngredient = async (req, res) => {
  try {
    const updated = await Ingredient.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedIngredient = await Ingredient.findByPk(req.params.id);
      res.json(updatedIngredient);
    } else {
      res.status(404).json({ error: "Ingredient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour supprimer un ingrédient par ID
export const deleteIngredient = async (req, res) => {
  try {
    const deleted = await Ingredient.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Ingredient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Deletion failed: " + error.message });
  }
};
