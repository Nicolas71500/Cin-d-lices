import React, { useState } from 'react';
import { IRecipe } from '../models';
import { API_URL } from '../../../../../config';
import AddRecipeModal from '../../CatalogPage/components/modal';
import { Link } from 'react-router-dom';

interface RecepiesTabProps {
    recipies: IRecipe[];
    handleDeleteRecipe: (id: number) => void;
    setRecipies: React.Dispatch<React.SetStateAction<IRecipe[]>>;
}

const RecepiesTab: React.FC<RecepiesTabProps> = ({ recipies, handleDeleteRecipe, setRecipies }) => {
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const handleAddRecipe = (newRecipe: IRecipe) => {
        setRecipies(prev => [...prev, newRecipe]);
    };

    if (recipies.length === 0) {
        return (
            <div className="profile-empty">
                <p>Vous n'avez pas encore créé de recettes.</p>
                <AddRecipeModal onAddRecipe={handleAddRecipe} />
            </div>
        );
    }

    return (
        <div className="recipes-tab">
            <div className="recipes-tab-header">
                <span className="recipes-count">{recipies.length} recette{recipies.length > 1 ? 's' : ''}</span>
                <AddRecipeModal onAddRecipe={handleAddRecipe} />
            </div>

            {recipies.map(recipe => (
                <div className="profile-recipe-card" key={recipe.id}>
                    <div className="profile-recipe-images">
                        <img src={`${API_URL}/recipes/${recipe.picture}`} alt={recipe.name} />
                        <img src={`${API_URL}/movies/${recipe.Movie.picture}`} alt={recipe.Movie.name} />
                    </div>
                    <div className="profile-recipe-info">
                        <div>
                            <p className="profile-recipe-name">{recipe.name}</p>
                            <p className="profile-recipe-film">Inspirée de · {recipe.Movie.name}</p>
                        </div>
                        <div className="profile-recipe-actions">
                            <Link to={`/recette/${recipe.id}`} className="button-link" style={{ fontSize: '0.78rem' }}>
                                Voir la recette
                            </Link>
                            <button
                                className="btn-danger"
                                style={{ fontSize: '0.78rem' }}
                                onClick={() => setConfirmDeleteId(recipe.id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>

                    {confirmDeleteId === recipe.id && (
                        <div className="delete-modal-overlay">
                            <div className="delete-modal-box">
                                <p>Supprimer définitivement « {recipe.name} » ?</p>
                                <div className="delete-modal-actions">
                                    <button className="btn-danger" onClick={() => { handleDeleteRecipe(recipe.id); setConfirmDeleteId(null); }}>
                                        Supprimer
                                    </button>
                                    <button onClick={() => setConfirmDeleteId(null)}>Annuler</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RecepiesTab;
