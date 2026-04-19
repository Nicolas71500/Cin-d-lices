import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../../../../../config';
import './index.scss';
import { useAuthContext } from '../../../../Context/Authentification/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { INGREDIENTS_FR } from '../../../../../../data/ingredients-fr';

interface AddRecipeModalProps {
    onAddRecipe: (newRecipe: any) => void;
}

const AddRecipeModal = ({ onAddRecipe }: AddRecipeModalProps) => {
    const [isOpen, setIsOpen]       = useState(false);
    const [error, setError]         = useState<string | null>(null);
    const [recipeImageB64, setRecipeImageB64] = useState<string | null>(null);
    const [movieImageB64,  setMovieImageB64]  = useState<string | null>(null);
    const [recipeFileOk,   setRecipeFileOk]   = useState<boolean | null>(null);
    const [movieFileOk,    setMovieFileOk]    = useState<boolean | null>(null);
    const [ingredients, setIngredients]       = useState([{ name: '', quantity: '' }]);
    const [steps, setSteps]                   = useState([{ step: '', step_position: 1 }]);

    const { isAuth } = useAuthContext();
    const navigate   = useNavigate();

    const toBase64 = (file: File, cb: (r: string | null) => void) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => cb(reader.result as string);
        reader.onerror   = () => cb(null);
    };

    const handleRecipeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setRecipeFileOk(!!file);
        if (file) toBase64(file, setRecipeImageB64);
    };

    const handleMovieFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setMovieFileOk(!!file);
        if (file) toBase64(file, setMovieImageB64);
    };

    const updateIngredient = (i: number, field: string, val: string) =>
        setIngredients(prev => prev.map((ing, idx) => idx === i ? { ...ing, [field]: val } : ing));

    const updateStep = (i: number, field: string, val: string) =>
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const el = e.currentTarget.elements as any;

        try {
            const response = await axios.post(`${API_URL}/recipes`, {
                name:          el.name.value,
                movie_name:    el.movie_name.value,
                dish_types_id: el.dish_types_id.value,
                category_id:   el.category_id.value,
                difficulty:    el.difficulty.value,
                total_duration: el.total_duration.value,
                anecdote:      el.anecdote.value,
                picture:       recipeImageB64,
                movie_picture: movieImageB64,
                ingredients:   ingredients.map(i => `${i.name} (${i.quantity})`).join('\n'),
                preparation:   steps.map(s => s.step).join('\n'),
            }, { withCredentials: true });

            onAddRecipe(response.data);
            setIsOpen(false);
        } catch {
            setError("Une erreur est survenue lors de l'ajout de la recette.");
        }
    };

    return (
        <>
            <button className="btn-filled" onClick={() => setIsOpen(true)}>
                Ajouter une recette
            </button>

            {isOpen && !isAuth && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <h2>Connexion requise</h2>
                        <p style={{ textAlign: 'center', color: 'var(--color-skin-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            Vous devez être connecté pour ajouter une recette.
                        </p>
                        <div className="modal-actions">
                            <button onClick={() => setIsOpen(false)}>Retour</button>
                            <button onClick={() => navigate('/inscription')}>S'inscrire</button>
                            <button className="btn-filled" onClick={() => navigate('/connexion')}>Se connecter</button>
                        </div>
                    </div>
                </div>
            )}

            {isOpen && isAuth && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <h2>Ajouter une recette</h2>

                        {error && <div className="auth-error" style={{ marginBottom: '1rem' }}>{error}</div>}

                        <form onSubmit={submitForm}>
                            <div className="recipe-modal-grid">
                                {/* Nom recette */}
                                <div>
                                    <label className="recipe-modal-label">Nom de la recette *</label>
                                    <input name="name" type="text" className="recipe-modal-input" placeholder="Ex: Ramen de Naruto" required />
                                </div>

                                {/* Image recette */}
                                <div>
                                    <label className="recipe-modal-label">Image de la recette *</label>
                                    <input type="file" accept="image/*" className="recipe-modal-input" onChange={handleRecipeFile} required />
                                    {recipeFileOk !== null && (
                                        <span className={`modal-file-status modal-file-status--${recipeFileOk ? 'ok' : 'err'}`}>
                                            {recipeFileOk ? '✓ Image sélectionnée' : '✗ Aucune image'}
                                        </span>
                                    )}
                                </div>

                                {/* Nom film */}
                                <div>
                                    <label className="recipe-modal-label">Film associé *</label>
                                    <input name="movie_name" type="text" className="recipe-modal-input" placeholder="Ex: Spirited Away" required />
                                </div>

                                {/* Image film */}
                                <div>
                                    <label className="recipe-modal-label">Image du film *</label>
                                    <input type="file" accept="image/*" className="recipe-modal-input" onChange={handleMovieFile} required />
                                    {movieFileOk !== null && (
                                        <span className={`modal-file-status modal-file-status--${movieFileOk ? 'ok' : 'err'}`}>
                                            {movieFileOk ? '✓ Image sélectionnée' : '✗ Aucune image'}
                                        </span>
                                    )}
                                </div>

                                {/* Catégorie */}
                                <div className="col-span-2">
                                    <label className="recipe-modal-label">Catégorie *</label>
                                    <select name="category_id" className="recipe-modal-input" required>
                                        <option value="1">Film</option>
                                        <option value="2">Série</option>
                                        <option value="3">Animé</option>
                                    </select>
                                </div>

                                {/* Type de plat */}
                                <div>
                                    <label className="recipe-modal-label">Type de plat *</label>
                                    <select name="dish_types_id" className="recipe-modal-input" required>
                                        <option value="1">Boisson</option>
                                        <option value="2">Plat</option>
                                        <option value="3">Dessert</option>
                                    </select>
                                </div>

                                {/* Difficulté */}
                                <div>
                                    <label className="recipe-modal-label">Difficulté *</label>
                                    <select name="difficulty" className="recipe-modal-input" required>
                                        <option>Facile</option>
                                        <option>Moyen</option>
                                        <option>Difficile</option>
                                    </select>
                                </div>

                                {/* Durée */}
                                <div className="col-span-2">
                                    <label className="recipe-modal-label">Durée totale (minutes)</label>
                                    <input name="total_duration" type="number" min="1" className="recipe-modal-input" placeholder="Ex: 45" />
                                </div>

                                {/* Anecdote */}
                                <div className="col-span-2">
                                    <label className="recipe-modal-label">Anecdote</label>
                                    <textarea name="anecdote" className="recipe-modal-input" placeholder="Une anecdote sur la recette ou le film…" rows={2} />
                                </div>

                                {/* Ingrédients */}
                                <div className="col-span-2">
                                    <label className="recipe-modal-label">Ingrédients *</label>
                                    <datalist id="ingredients-fr-list">
                                        {INGREDIENTS_FR.map(name => <option key={name} value={name} />)}
                                    </datalist>
                                    {ingredients.map((ing, i) => (
                                        <div className="modal-ingredient-row" key={i}>
                                            <input
                                                list="ingredients-fr-list"
                                                type="text" className="recipe-modal-input"
                                                value={ing.name} placeholder="Nom"
                                                onChange={e => updateIngredient(i, 'name', e.target.value)} required
                                            />
                                            <input
                                                type="text" className="recipe-modal-input"
                                                value={ing.quantity} placeholder="Quantité"
                                                onChange={e => updateIngredient(i, 'quantity', e.target.value)} required
                                            />
                                            {ingredients.length > 1 && (
                                                <button type="button" className="modal-remove-btn"
                                                    onClick={() => setIngredients(prev => prev.filter((_, idx) => idx !== i))}>
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" className="modal-add-btn"
                                        onClick={() => setIngredients(prev => [...prev, { name: '', quantity: '' }])}>
                                        + Ajouter un ingrédient
                                    </button>
                                </div>

                                {/* Étapes */}
                                <div className="col-span-2">
                                    <label className="recipe-modal-label">Étapes de préparation *</label>
                                    {steps.map((s, i) => (
                                        <div className="modal-step-row" key={i}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontFamily: 'Cinzel, serif', flexShrink: 0 }}>
                                                {i + 1}.
                                            </span>
                                            <input
                                                type="text" className="recipe-modal-input"
                                                value={s.step} placeholder={`Étape ${i + 1}`}
                                                onChange={e => updateStep(i, 'step', e.target.value)} required
                                            />
                                            {steps.length > 1 && (
                                                <button type="button" className="modal-remove-btn"
                                                    onClick={() => setSteps(prev => prev.filter((_, idx) => idx !== i))}>
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" className="modal-add-btn"
                                        onClick={() => setSteps(prev => [...prev, { step: '', step_position: prev.length + 1 }])}>
                                        + Ajouter une étape
                                    </button>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsOpen(false)}>Annuler</button>
                                <button type="submit" className="btn-filled">Valider la recette</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddRecipeModal;
