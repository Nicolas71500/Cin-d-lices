import { Router } from "express";
import {
  createDishType,
  getAllDishTypes,
  getDishTypeById,
  updateDishType,
  deleteDishType,
} from "../Controllers/DishTypesControllers.js";

const router = Router();

router.get("/dishtype", getAllDishTypes);
router.get("/dishtype/:id", getDishTypeById);
router.post("/dishtype", createDishType);
router.put("/dishtype/:id", updateDishType);
router.delete("/dishtype/:id", deleteDishType);

export default router;
