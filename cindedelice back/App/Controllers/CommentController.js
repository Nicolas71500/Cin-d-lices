import Recipe from "../Models/Recipes.js";
import Users from "../Models/Users.js";
import Comment from "../Models/comment.js";
import sequelize from "../db/client.js";

export const getComments = {
    async index(req, res) {
        const { recipeId } = req.params;
        if (!recipeId) return res.status(400).json({ message: 'Problem with the provided id' });
        try {
            const commentList = await Comment.findAll({
                where: { recipe_id: recipeId, parent_id: null },
                include: [
                    { association: 'commentUser', attributes: ['username', 'id'] },
                    {
                        association: 'replies',
                        include: [{ association: 'commentUser', attributes: ['username', 'id'] }],
                    },
                ],
                order: [['created_at', 'DESC']],
            });
            res.json(commentList);
        } catch (error) {
            console.error('getComments error:', error.message);
            res.status(500).json({ error: 'problème dans la récupération des commentaires' });
        }
    }
};

export const createComment = {
    async index(req, res) {
        try {
            const commentCreated = await Comment.create(req.body);
            res.status(201).json(commentCreated);
        } catch (error) {
            console.error('createComment error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
};

export const deleteComment = {
    async index(req, res) {
        try {
            const comment = await Comment.findByPk(req.params.id);
            if (!comment) return res.status(404).json({ message: 'Commentaire introuvable' });
            if (comment.user_id !== req.user.id) return res.status(403).json({ message: 'Interdit' });
            await Comment.destroy({ where: { parent_id: comment.id } });
            await comment.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export const getRecipeRatings = {
    async index(req, res) {
        try {
            const ratings = await Comment.findAll({
                attributes: [
                    'recipe_id',
                    [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('note')), 1), 'avg_note'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
                ],
                group: ['recipe_id'],
                raw: true,
            });
            res.json(ratings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
