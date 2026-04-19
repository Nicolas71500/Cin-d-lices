import { Router } from "express";
import {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../Controllers/IngredientControllers.js";
import isAdmin from "../Middlewares/isAdmin.js";

const router = Router();

router.get("/ingredient", getAllIngredients);
router.get("/ingredient/:id", getIngredientById);
router.post("/ingredient", isAdmin, createIngredient);
router.put("/ingredient/:id", updateIngredient);
router.delete("/ingredient/:id", deleteIngredient);

export default router;
