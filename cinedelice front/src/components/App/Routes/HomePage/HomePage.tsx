import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../../config';
import { IRecipe } from './models';
import Slider from './components/slider/slider';
import { fetchOneRandom } from './services';
import './components/slider/slider.scss';
import './homePage.scss';
import AddRecipeModal from '../CatalogPage/components/modal';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import Encrage from '../Encrage/encrage';

function HomePage() {
    const [data, setData] = useState<IRecipe | null>(null);
    const { userAuth } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneRandom()
            .then(setData)
            .catch(() => {});
    }, []);

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
