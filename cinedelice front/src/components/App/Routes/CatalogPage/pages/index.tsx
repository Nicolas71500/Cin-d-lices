import { useEffect, useState } from 'react';
import { Movies, Recipes } from '../models';
import './index.scss';
import { Link } from 'react-router-dom';
import AddRecipeModal from '../components/modal';
import axios from 'axios';
import Encrage from '../../Encrage/encrage';
import { API_URL } from '../../../../../config';

const DIFFICULTIES = ['Facile', 'Moyen', 'Difficile'];
const DISH_TYPES = [
    { id: 1, label: 'Boisson' },
    { id: 2, label: 'Plat' },
    { id: 3, label: 'Dessert' },
    { id: 4, label: 'Entrée' },
];

export const Catalog = () => {
    const [recipes, setRecipes]                   = useState<Recipes>([]);
    const [movies, setMovies]                     = useState<Movies>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedDishType, setSelectedDishType] = useState<number | null>(null);
    const [currentPage, setCurrentPage]           = useState(1);
    const recipesPerPage = 12;

    const resetFilters = () => {
        setSelectedDifficulty(null);
        setSelectedDishType(null);
        setCurrentPage(1);
    };

    const handleDifficultyChange = (d: string) => {
        setSelectedDishType(null);
        setSelectedDifficulty(prev => prev === d ? null : d);
        setCurrentPage(1);
    };

    const handleDishTypeChange = (id: number) => {
        setSelectedDifficulty(null);
        setSelectedDishType(prev => prev === id ? null : id);
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = `${API_URL}/recipes`;
                if (selectedDishType) url = `${API_URL}/Recipes/DishTypes/${selectedDishType}`;
                if (selectedDifficulty) url += `${url.includes('?') ? '&' : '?'}difficulty=${selectedDifficulty}`;

                const [recipesRes, moviesRes] = await Promise.all([
                    axios.get(url),
                    axios.get(`${API_URL}/movies`),
                ]);
                setRecipes(recipesRes.data);
                setMovies(moviesRes.data);
            } catch {}
        };
        fetchData();
    }, [selectedDifficulty, selectedDishType]);

    const total            = recipes.length;
    const indexOfLast      = currentPage * recipesPerPage;
    const indexOfFirst     = indexOfLast - recipesPerPage;
    const currentRecipes   = recipes.slice(indexOfFirst, indexOfLast);
    const totalPages       = Math.ceil(total / recipesPerPage);

    return (
        <div className="catalog-page">
            {/* Header */}
            <div className="catalog-header">
                <h1 className="catalog-title" onClick={resetFilters}>Catalogue</h1>
                <p className="catalog-subtitle">{total} recette{total > 1 ? 's' : ''} disponible{total > 1 ? 's' : ''}</p>
            </div>

            {/* Filters */}
            <div className="catalog-filters">
                {DIFFICULTIES.map(d => (
                    <button
                        key={d}
                        className={`filter-pill ${selectedDifficulty === d ? 'active' : ''}`}
                        onClick={() => handleDifficultyChange(d)}
                    >
                        {d}
                    </button>
                ))}
                {DISH_TYPES.map(t => (
                    <button
                        key={t.id}
                        className={`filter-pill ${selectedDishType === t.id ? 'active' : ''}`}
                        onClick={() => handleDishTypeChange(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
                <AddRecipeModal onAddRecipe={(r) => setRecipes(prev => [...prev, r])} />
            </div>

            {/* Grid */}
            <div className="catalog-grid">
                {currentRecipes.length === 0 ? (
                    <p className="catalog-empty">Aucune recette trouvée</p>
                ) : (
                    currentRecipes.map(recipe => {
                        const movie = movies.find(m => m.id === recipe.movie_id);
                        return (
                            <Link to={`/recette/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none' }}>
                                <div className="recipe-card">
                                    <div className="card-images">
                                        <img
                                            className="card-img"
                                            src={`${API_URL}/recipes/${recipe.picture}`}
                                            alt={recipe.name}
                                        />
                                        {movie && (
                                            <img
                                                className="card-img-movie"
                                                src={`${API_URL}/movies/${movie.picture}`}
                                                alt={movie.name}
                                            />
                                        )}
                                    </div>
                                    <div className="card-body">
                                        {movie && <p className="card-movie-name">{movie.name}</p>}
                                        <button className="card-recipe-btn">{recipe.name}</button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="catalog-pagination">
                    <button
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Précédent
                    </button>
                    <span className="page-info">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        Suivant →
                    </button>
                </div>
            )}

            <Encrage />
        </div>
    );
};
