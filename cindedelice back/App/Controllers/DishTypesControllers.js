import DishTypes from "../Models/DishTypes.js";

// Fonction pour obtenir toutes les dishtype
export const getAllDishTypes = async (req, res) => {
  try {
    const dishtype = await DishTypes.findAll();
    res.json(dishtype);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour obtenir un catégorie par ID
export const getDishTypeById = async (req, res) => {
  try {
    const dishtype = await DishTypes.findByPk(req.params.id);
    if (dishtype) {
      res.json(dishtype);
    } else {
      res.status(404).json({ error: "dishtype not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour créer une nouveau type

export const createDishType = async (req, res) => {
  try {
    const newDishType = await DishTypes.create(req.body);
    // Rediriger vers la page admin après la création réussie
    return res.redirect("/admin");
  } catch (error) {
    // En cas d'erreur, afficher un message d'erreur et rester sur la même page
    return res.status(500).json({ error: error.message });
  }
};

// Fonction pour mettre à jour une catégorie par ID
export const updateDishType = async (req, res) => {
  try {
    const updated = await DishTypes.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedDishType = await DishTypes.findByPk(req.params.id);
      res.json(updatedDishType);
    } else {
      res.status(404).json({ error: "DishTypes not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour supprimer un type de plat
export const deleteDishType = async (req, res) => {
  try {
    const deleted = await DishTypes.destroy({
      where: { id: req.params.id },
    });
    return res.redirect("/admin");

    if (deleted) {
      res.status(200).json({ message: "DishType deleted successfully" });
    } else {
      res.status(404).json({ error: "DishType not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
