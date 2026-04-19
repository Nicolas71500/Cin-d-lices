import Likes from "../Models/Likes.js";
import Recipe from "../Models/Recipes.js";
import Movies from "../Models/Movie.js";
import Users from "../Models/Users.js";

export const getLikesNumber={
async index(req,res){
    console.log('arrivée dans fonction getLikesNumber');
    const {recipeId} = req.params
    console.log(recipeId);
    if(!recipeId){
        res.status(400).json({message:'Problème avec l\'id founi'})
        return
    }
    try {
        const likesNumber = await Likes.count({
            where:{
                recipe_id: Number(recipeId)
            }
        })
        console.log(likesNumber);
if(!likesNumber && likesNumber !==0){
    res.status(500).json({message:'Problème dans la récupération du nombre de likes'})
    return
}

res.status(201).json(likesNumber)
return

    } catch (error) {
       res.status(400).json({error:'Erreur dans la récupération du nombre de likes', error});
        
    }
}

}

export const putLike={
    async index(req,res){

        const {recipeId} = req.params

        const {userId} = req.body

        const data={
            user_id: userId,
            recipe_id: Number(recipeId)
        }

try {
   const result = await Likes.create(data)

   if(!result){
throw new Error('Problème dans la création du Like') 
   }

    return res.status(201).json({message:'Vous aimez cette recette'})

} catch (error) {
    console.log('Problème dans la mise à jour du Likes');
}


    }
}

export const deleteLike={
    async index(req,res){
console.log('arrivée dans la fonction delete');
        const {recipeId, userId} = req.params

        try {
            const result = await Likes.destroy({
                where:{
                    recipe_id:Number(recipeId),
                    user_id: Number(userId)
                }
            })
            if(!result){
                res.status(500).json('Problème dans la fonction de suppression du like')
            }
            res.status(204).json({message:'Suppression du like réussie'})
            
        } catch (error) {
            res.status(500).json({message:'Problème dans la suppression du like'})
        }

    }
}

export const getUserLikedRecipes = {
  async index(req, res) {
    const { userId } = req.params;
    try {
      const likes = await Likes.findAll({
        where: { user_id: Number(userId) },
        include: [{
          model: Recipe,
          as: 'likesRecipe',
          include: [
            { model: Movies },
            { model: Users, attributes: ['username'] },
          ],
        }],
      });
      const recipes = likes.map(like => like.likesRecipe).filter(Boolean);
      res.json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des recettes aimées' });
    }
  }
};

export const userLikedIt={
    async index(req,res){
            const {recipeId, userId} = req.params

        try {
        
            const result = await Likes.findOne({
                where:{
                    user_id: Number(userId),
                    recipe_id: Number(recipeId)
                }
            })
                if(!result){
                    res.json({userLikedIt: false})
                }else{
                    res.json({userLikedIt: true})
                }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Problème dans la vérification du like"})
        }

    }
}
