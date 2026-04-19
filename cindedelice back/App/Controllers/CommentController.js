import Recipe from "../Models/Recipes.js";
import Users from "../Models/Users.js";
import Comment from "../Models/comment.js";

export const getComments={
    async index(req,res){
        const {recipeId} = req.params
        if(!recipeId){
            res.status(400).json({message:'Problem with the provided id'})
        }

try {
    const commentList= await Comment.findAll(
        {
       where:{
        recipe_id: recipeId,
       },
       include:[
        {
            association:'commentUser',
            attributes:[
                'username',
                'id',
            ]
            
        }
       ],
       order:[
        ['created_at', 'DESC'],
       ]
    })
    

    if(!commentList){
        throw new Error('Problème dans la récupération des commentaires')
    }
    res.json(commentList)
    
} catch (error) {
    res.status(400).json({error:'problème dans la récupération des commentaires au niveau de la bdd'})
}

    }
}

export const createComment={
    async index(req,res){
       const data=(req.body)

       const commentCreated = await Comment.create(data)
       res.status(201).json(commentCreated)

    }
}