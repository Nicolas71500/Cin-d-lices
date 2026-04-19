import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../config';
import './FilmPage.scss';
import Encrage from '../Encrage/encrage';

function toEmbedUrl(url: string): string {
    const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    return url;
}

interface IRecipeMin {
    id: number;
    name: string;
    picture: string;
    difficulty: string;
    total_duration: number;
    User: { username: string; id: number };
}

interface IMovieFull {
    id: number;
    name: string;
    picture: string;
    trailer_url?: string;
    Category: { name: string };
    recipe: IRecipeMin[];
}

function FilmPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovieFull | null>(null);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        axios.get(`/movies/${id}/recipes`).then(r => setMovie(r.data)).catch(() => {});
    }, [id]);

    if (!movie) return <div className="film-loading">Chargement du film…</div>;

    return (
        <div className="film-page">
            <div className="film-hero">
                <img className="film-poster" src={`${API_URL}/movies/${movie.picture}`} alt={movie.name} />
                <div className="film-info">
                    <span className="film-category">{movie.Category?.name}</span>
                    <h1 className="film-title">{movie.name}</h1>
                    <p className="film-recipe-count">{movie.recipe?.length ?? 0} recette{(movie.recipe?.length ?? 0) > 1 ? 's' : ''} inspirée{(movie.recipe?.length ?? 0) > 1 ? 's' : ''}</p>
                    {movie.trailer_url && (
                        <button className="btn-filled" onClick={() => setShowTrailer(true)}>
                            ▶ Bande annonce
                        </button>
                    )}
                </div>
            </div>

            <div className="film-recipes-section">
                <p className="film-recipes-title">Recettes inspirées</p>
                <div className="film-recipes-grid">
                    {movie.recipe?.map(recipe => (
                        <Link to={`/recette/${recipe.id}`} key={recipe.id} className="film-recipe-card">
                            <img
                                src={`${API_URL}/recipes/${recipe.picture}`}
                                alt={recipe.name}
                                className="film-recipe-img"
                            />
                            <div className="film-recipe-body">
                                <p className="film-recipe-name">{recipe.name}</p>
                                <p className="film-recipe-meta">{recipe.difficulty} · {recipe.total_duration} min</p>
                                <Link to={`/profil/${recipe.User?.id}`} className="film-recipe-author" onClick={e => e.stopPropagation()}>
                                    Par {recipe.User?.username}
                                </Link>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {showTrailer && movie.trailer_url && (
                <div className="trailer-overlay" onClick={() => setShowTrailer(false)}>
                    <div className="trailer-box" onClick={e => e.stopPropagation()}>
                        <div className="trailer-header">
                            <span className="trailer-title">{movie.name}</span>
                            <button className="trailer-close" onClick={() => setShowTrailer(false)}>✕</button>
                        </div>
                        <iframe
                            className="trailer-iframe"
                            src={toEmbedUrl(movie.trailer_url)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            <Encrage />
        </div>
    );
}

export default FilmPage;
