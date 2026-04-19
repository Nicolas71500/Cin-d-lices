import { Router } from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../Controllers/MovieControllers.js";
import isAdmin from "../Middlewares/isAdmin.js";

const router = Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id(\\d+)", getMovieById);
router.post("/movies", isAdmin, createMovie);
router.put("/movies/:id(\\d+)", isAdmin, updateMovie);
router.delete("/movies/:id(\\d+)", isAdmin, deleteMovie);

export default router;
