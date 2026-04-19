import { Router } from "express";
import isLoggedIn from "../Middlewares/IsLoggedin.js";
import { createComment, getComments } from "../Controllers/CommentController.js";


const router = Router();

//Get comments for a recipe, with users informations
router.get('/comment/:recipeId', getComments.index)

// For a user to create a comment in a recipe
router.post('/comment', isLoggedIn, createComment.index)
// // for a user to update a comment
// router.put('/comment/:id/:userId', isLoggedIn, updateComment.index)
// // for a user to delete a comment
// router.delete('/comment/:id/:userId', isLoggedIn, deleteComment.index)





export default router;