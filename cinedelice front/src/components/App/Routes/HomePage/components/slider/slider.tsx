import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IRecipe } from '../../models';
import './slider.scss';

function RecipeSlider() {
    const [recipes, setRecipes]             = useState<IRecipe[]>([]);
    const [currentIndex, setCurrentIndex]   = useState(0);
    const [transitionState, setTransitionState] = useState('active');

    useEffect(() => {
        fetch(`${API_URL}/recipes/random`)
            .then(r => r.json())
            .then(setRecipes)
            .catch(() => {});
    }, []);

    function goTo(index: number) {
        if (transitionState !== 'active') return;
        setTransitionState('exit');
        setTimeout(() => {
            setCurrentIndex((index + recipes.length) % recipes.length);
            setTransitionState('enter');
        }, 300);
    }

    useEffect(() => {
        if (transitionState === 'enter') {
            const t = setTimeout(() => setTransitionState('active'), 50);
            return () => clearTimeout(t);
        }
    }, [transitionState]);

    useEffect(() => {
        const interval = setInterval(() => goTo(currentIndex + 1), 4000);
        return () => clearInterval(interval);
    }, [currentIndex, recipes.length]);

    if (recipes.length === 0) {
        return (
            <div style={{ color: 'var(--skin-muted)', padding: '2rem', textAlign: 'center', fontFamily: 'Cinzel, serif', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                Chargement des recettes…
            </div>
        );
    }

    const recipe = recipes[currentIndex % recipes.length];
    if (!recipe?.Movie) return null;

    return (
        <div className="slider">
            <div className="main_slider">
                {/* Panel gauche — recette */}
                <div className={`slide-panel slide-panel-left ${transitionState}`}>
                    <img
                        src={`${API_URL}/recipes/${recipe.picture}`}
                        alt={recipe.name}
                    />
                    <p className="slide-caption">{recipe.name}</p>
                    <button className="slide-arrow left" onClick={() => goTo(currentIndex - 1)}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </div>

                {/* Panel droit — film */}
                <div className={`slide-panel ${transitionState}`}>
                    <img
                        src={`${API_URL}/movies/${recipe.Movie.picture}`}
                        alt={recipe.Movie.name}
                    />
                    <p className="slide-caption">{recipe.Movie.name}</p>
                    <button className="slide-arrow right" onClick={() => goTo(currentIndex + 1)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            {/* Dots */}
            <div className="slider-dots">
                {recipes.map((_, i) => (
                    <button
                        key={i}
                        className={`dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => goTo(i)}
                    />
                ))}
            </div>

            <Link to={`/recette/${recipe.id}`} className="btn-filled" style={{ marginTop: '0.5rem' }}>
                Voir la recette
            </Link>
        </div>
    );
}

export default RecipeSlider;
