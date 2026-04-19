import { Router } from "express";
import isLoggedIn from "../Middlewares/IsLoggedin.js";
import { deleteLike, getLikesNumber, getUserLikedRecipes, putLike, userLikedIt } from "../Controllers/LikesControllers.js";


const router = Router();

// Get liked recipes for a user — route spécifique AVANT /:recipeId
router.get('/likes/user/:userId', isLoggedIn, getUserLikedRecipes.index)

//Get number of likes for a recipe
router.get('/likes/:recipeId', getLikesNumber.index)

// Check if connected user already liked a recipe
router.get('/likes/:recipeId/:userId', isLoggedIn, userLikedIt.index)

// Add a like
router.post('/likes/:recipeId', isLoggedIn, putLike.index)
// Delete a like
router.delete('/likes/:recipeId/:userId', isLoggedIn, deleteLike.index)

// Do the same for comments :D





export default router;