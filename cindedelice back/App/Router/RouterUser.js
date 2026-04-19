import { Router } from "express";
import isLoggedIn from "../Middlewares/IsLoggedin.js";
import isAdmin from "../Middlewares/isAdmin.js";

import {
  GetUserById,
  AllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserRecipies,
  updatePassword,
  updateUserRole,
  getPublicProfile,
} from "../Controllers/UserControllers.js";

const router = Router();

router.get("/me", isLoggedIn, GetUserById.me);
router.get("/users", isAdmin, AllUsers.index);
router.get("/user/recipes", isLoggedIn, getUserRecipies.index);
router.post("/users", createUser.index);
router.put("/me", isLoggedIn, updateUser.index);
router.delete("/users/:id(\\d+)", isAdmin, deleteUser.index);
router.patch("/users/:id(\\d+)/role", isAdmin, updateUserRole.index);
router.put("/update-password", isLoggedIn, updatePassword.index);
router.get("/users/:id(\\d+)/public", getPublicProfile.index);

export default router;
