import { Router } from "express";
import isLoggedIn from "../Middlewares/IsLoggedin.js";
import { createComment, getComments, deleteComment, getRecipeRatings } from "../Controllers/CommentController.js";

const router = Router();

router.get('/comment/ratings', getRecipeRatings.index);
router.get('/comment/:recipeId', getComments.index);
router.post('/comment', isLoggedIn, createComment.index);
router.delete('/comment/:id', isLoggedIn, deleteComment.index);

export default router;
