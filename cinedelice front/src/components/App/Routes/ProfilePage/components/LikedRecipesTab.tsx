import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../config';
import { IRecipe } from '../models';

interface LikedRecipesTabProps {
    likedRecipes: IRecipe[];
}

const LikedRecipesTab: React.FC<LikedRecipesTabProps> = ({ likedRecipes }) => {
    if (likedRecipes.length === 0) {
        return (
            <div className="profile-empty">
                <p>Vous n'avez pas encore aimé de recettes.</p>
                <Link to="/catalogue" className="btn-filled">
                    Découvrir les recettes
                </Link>
            </div>
        );
    }

    return (
        <div className="recipes-tab">
            <div className="recipes-tab-header">
                <span className="recipes-count">
                    {likedRecipes.length} recette{likedRecipes.length > 1 ? 's' : ''} aimée{likedRecipes.length > 1 ? 's' : ''}
                </span>
            </div>

            {likedRecipes.map(recipe => (
                <div className="profile-recipe-card" key={recipe.id}>
                    <div className="profile-recipe-images">
                        <img src={`${API_URL}/recipes/${recipe.picture}`} alt={recipe.name} />
                        {recipe.Movie && (
                            <img src={`${API_URL}/movies/${recipe.Movie.picture}`} alt={recipe.Movie.name} />
                        )}
                    </div>
                    <div className="profile-recipe-info">
                        <div>
                            <p className="profile-recipe-name">{recipe.name}</p>
                            {recipe.Movie && (
                                <p className="profile-recipe-film">Inspirée de · {recipe.Movie.name}</p>
                            )}
                        </div>
                        <div className="profile-recipe-actions">
                            <Link to={`/recette/${recipe.id}`} className="button-link" style={{ fontSize: '0.78rem' }}>
                                Voir la recette
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LikedRecipesTab;
