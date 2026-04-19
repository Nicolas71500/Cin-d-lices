import Movies from "../Models/Movie.js";
import Category from "../Models/Category.js";
import Recipe from "../Models/Recipes.js";
import Users from "../Models/Users.js";

// Fonction pour obtenir tous les films
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movies.findAll({});
    res.json(movies);
  } catch (error) {
    res.status(404).json({ message: "No Movies found" });
  }
};

// Fonction pour obtenir un film par ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movies.findByPk(req.params.id, {
      include: [{ model: Category, as: "Category" }],
    });

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found. Sorry" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Fonction pour créer un nouveau film
export const createMovie = async (req, res) => {
  try {
    const newMovie = await Movies.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// pour mettre à jour un film par ID
export const updateMovie = async (req, res) => {
  try {
    const updated = await Movies.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedMovie = await Movies.findByPk(req.params.id);
      res.json(updatedMovie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMovieWithRecipes = async (req, res) => {
  try {
    const movie = await Movies.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'Category' },
        {
          model: Recipe,
          as: 'recipe',
          include: [{ model: Users, as: 'User', attributes: ['username', 'id'] }],
        },
      ],
    });
    if (!movie) return res.status(404).json({ error: 'Film introuvable' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour supprimer un film par ID
export const deleteMovie = async (req, res) => {
  try {
    const deleted = await Movies.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Film introuvable" });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
