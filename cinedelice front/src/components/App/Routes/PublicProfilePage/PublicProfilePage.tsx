import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../config';
import './PublicProfilePage.scss';
import Encrage from '../Encrage/encrage';

interface IPublicRecipe {
    id: number;
    name: string;
    picture: string;
    difficulty: string;
    total_duration: number;
    Movie: { name: string; picture: string };
}

interface IPublicUser {
    id: number;
    username: string;
    Recipes: IPublicRecipe[];
}

function PublicProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState<IPublicUser | null>(null);

    useEffect(() => {
        axios.get(`/users/${userId}/public`).then(r => setUser(r.data)).catch(() => {});
    }, [userId]);

    if (!user) return <div className="public-profile-loading">Chargement du profil…</div>;

    const initials = user.username.slice(0, 2).toUpperCase();

    return (
        <div className="public-profile-page">
            <div className="public-profile-header">
                <div className="public-profile-avatar">{initials}</div>
                <h1 className="public-profile-username">{user.username}</h1>
                <p className="public-profile-count">{user.Recipes?.length ?? 0} recette{(user.Recipes?.length ?? 0) > 1 ? 's' : ''}</p>
            </div>

            <div className="public-profile-section">
                <p className="public-profile-section-title">Recettes de {user.username}</p>
                {(!user.Recipes || user.Recipes.length === 0) ? (
                    <p className="public-profile-empty">Aucune recette pour l'instant.</p>
                ) : (
                    <div className="public-profile-grid">
                        {user.Recipes.map(recipe => (
                            <Link to={`/recette/${recipe.id}`} key={recipe.id} className="public-profile-card">
                                <img
                                    src={`${API_URL}/recipes/${recipe.picture}`}
                                    alt={recipe.name}
                                    className="public-profile-card-img"
                                />
                                <div className="public-profile-card-body">
                                    {recipe.Movie && <p className="public-profile-card-movie">{recipe.Movie.name}</p>}
                                    <p className="public-profile-card-name">{recipe.name}</p>
                                    <p className="public-profile-card-meta">{recipe.difficulty} · {recipe.total_duration} min</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Encrage />
        </div>
    );
}

export default PublicProfilePage;
