import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../config';
import { IRecipe } from './models';
import Slider from './components/slider/slider';
import { fetchOneRandom } from './services';
import './components/slider/slider.scss';
import './homePage.scss';
import AddRecipeModal from '../CatalogPage/components/modal';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import Encrage from '../Encrage/encrage';

interface IRecentRecipe {
    id: number;
    name: string;
    picture: string;
    difficulty: string;
    Movie: { name: string; picture: string } | null;
    User: { username: string };
}

function HomePage() {
    const [data, setData] = useState<IRecipe | null>(null);
    const [recentRecipes, setRecentRecipes] = useState<IRecentRecipe[]>([]);
    const { userAuth } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneRandom().then(setData).catch(() => {});
        axios.get('/recipes/recent').then(r => setRecentRecipes(r.data)).catch(() => {});
    }, []);

    function handleSurprise() {
        fetchOneRandom().then((recipe) => {
            if (recipe?.id) navigate(`/recette/${recipe.id}`);
        });
    }

    return (
        <div className="homePage">
            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="hero">
                {userAuth?.username && (
                    <span className="hero-welcome">Bienvenue, {userAuth.username} !</span>
                )}
                <p className="hero-eyebrow">Cuisine & Cinéma</p>
                <h1 className="hero-title">
                    Cuisinez la magie<br />du grand écran
                </h1>
                <p className="hero-sub">
                    Découvrez des recettes inspirées de vos films cultes.
                    Du festin de Ratatouille au ramen de Naruto, chaque plat raconte une histoire.
                </p>
                <div className="hero-actions">
                    <button className="btn-filled" onClick={() => navigate('/catalogue')}>
                        Explorer les recettes
                    </button>
                    <button className="btn-outline" onClick={handleSurprise}>
                        Surprends-moi
                    </button>
                    <AddRecipeModal onAddRecipe={() => {}} />
                </div>
            </section>

            <div className="film-divider" />

            {/* ── About ────────────────────────────────────────── */}
            <section className="about-section">
                <img
                    className="about-image"
                    src={`${API_URL}/movies/Cinédelices.webp`}
                    alt="CinéDélices"
                />
                <div className="about-text">
                    <span className="about-label">Notre histoire</span>
                    <p className="about-title">Où la cuisine rencontre le cinéma</p>
                    <p>
                        Bienvenue sur CinéDélices, votre destination incontournable pour découvrir
                        des recettes inspirées des films cultes. Plongez dans l'univers
                        cinématographique à travers les plats emblématiques qui ont marqué l'histoire
                        du grand écran.
                    </p>
                    <br />
                    <p>
                        Que vous soyez fan de banquets fantastiques, de festins royaux ou de petits
                        plats simples mais mémorables, cuisinez comme vos personnages préférés.
                    </p>
                </div>
            </section>

            <div className="film-divider" />

            {/* ── Fil d'actualité ──────────────────────────────── */}
            {recentRecipes.length > 0 && (
                <>
                    <div className="film-divider" />
                    <section className="news-section">
                        <span className="section-label">Nouveautés</span>
                        <h2 className="section-title">Dernières recettes ajoutées</h2>
                        <div className="news-grid">
                            {recentRecipes.map(recipe => (
                                <Link to={`/recette/${recipe.id}`} key={recipe.id} className="news-card">
                                    <img
                                        className="news-card-img"
                                        src={`${API_URL}/recipes/${recipe.picture}`}
                                        alt={recipe.name}
                                    />
                                    <div className="news-card-body">
                                        {recipe.Movie && <p className="news-card-movie">{recipe.Movie.name}</p>}
                                        <p className="news-card-name">{recipe.name}</p>
                                        <p className="news-card-meta">{recipe.difficulty} · par {recipe.User?.username}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </>
            )}

            <div className="film-divider" />

            {/* ── Slider ───────────────────────────────────────── */}
            <section className="slider-section">
                <span className="section-label">À l'affiche</span>
                <h2 className="section-title">Notre sélection du moment</h2>
                <Slider />
            </section>

            <Encrage />
        </div>
    );
}

export default HomePage;
