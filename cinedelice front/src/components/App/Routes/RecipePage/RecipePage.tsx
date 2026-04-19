import { Link, useNavigate, useParams } from 'react-router-dom';
import './RecipePage.scss';
import { API_URL } from '../../../../config';
import { useEffect, useState } from 'react';
import { IIngredientsList, IRecipe } from './models';
import { extractNumber } from './services/numberExtraction';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import LikeButton from './components/LikeButton';
import {
    checkUserLikedIt,
    deleteOneLike,
    deleteRecipe,
    fetchLikesNumber,
    fetchRecipe,
    putOneLike,
} from './services/APICall';
import CommentComponent from './components/CommentComponent/CommentComponent';
import { toast } from 'react-toastify';
import Encrage from '../Encrage/encrage';

function RecipePage() {
    const { id } = useParams();
    const [dataFetch, setDataFetch]           = useState<IRecipe | null>(null);
    const [errorMessage, setErrorMessage]     = useState<string | null>(null);
    const [count, setCount]                   = useState(1);
    const [ingredientsList, setIngredientsList] = useState<IIngredientsList[] | null>(null);
    const [isRecipeOwner, setIsRecipeOwner]   = useState(false);
    const [userLikedIt, setUserLikedIt]       = useState(false);
    const [likesNumber, setLikesNumber]       = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { isAuth, userAuth } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipe(Number(id))
            .then(data => {
                if ('error' in data) setErrorMessage(data.error);
                else setDataFetch(data);
            })
            .catch(() => {});
    }, [id]);

    useEffect(() => {
        if (dataFetch?.Ingredient) {
            setIngredientsList(
                dataFetch.Ingredient.map(item => ({
                    ...item,
                    quantity: extractNumber(item.quantity),
                }))
            );
        }
    }, [dataFetch]);

    useEffect(() => {
        if (isAuth && userAuth?.id && dataFetch) {
            setIsRecipeOwner(userAuth.id === dataFetch.user_id);
            checkUserLikedIt(dataFetch.id, userAuth.id)
                .then(r => setUserLikedIt(r.userLikedIt));
        }
    }, [isAuth, userAuth, dataFetch]);

    useEffect(() => {
        if (dataFetch?.id) {
            fetchLikesNumber(dataFetch.id).then(setLikesNumber).catch(() => {});
        }
    }, [dataFetch, userLikedIt]);

    function handleLike() {
        if (!isAuth || !userAuth?.id || !dataFetch?.id) return;
        if (!userLikedIt) {
            putOneLike(dataFetch.id, userAuth.id).then(r => { if (r === 201) setUserLikedIt(true); });
        } else {
            deleteOneLike(dataFetch.id, userAuth.id).then(r => { if (r === 204) setUserLikedIt(false); });
        }
    }

    function handleDelete() {
        if (!userAuth || !dataFetch || dataFetch.user_id !== userAuth.id) return;
        deleteRecipe(dataFetch.id).then(() => {
            toast.success(`Recette '${dataFetch.name}' supprimée avec succès.`);
            navigate('/catalogue');
        });
    }

    if (errorMessage) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--skin-muted)' }}>{errorMessage}</div>;
    if (!dataFetch)   return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--skin-muted)', fontFamily: 'Cinzel, serif', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Le plat finit de mijoter…</div>;

    return (
        <div className="recipe-page">
            {/* ── Header ─────────────────────────────────── */}
            <div className="recipe-header">
                <h1 className="recipe-title">{dataFetch.name}</h1>
                <p className="recipe-film-label">Inspirée du film · {dataFetch.Movie.name}</p>

                <div className="recipe-meta-row">
                    {likesNumber > 0 && (
                        <span className="recipe-likes">
                            ❤ {likesNumber} {likesNumber > 1 ? 'personnes aiment' : 'personne aime'}
                        </span>
                    )}
                    <span className="recipe-author">Par {dataFetch.User.username}</span>
                </div>
            </div>

            {/* ── Images ─────────────────────────────────── */}
            <div className="recipe-images">
                <img
                    className="recipe-img"
                    src={`${API_URL}/recipes/${dataFetch.picture}`}
                    alt={dataFetch.name}
                />
                <img
                    className="recipe-img"
                    src={`${API_URL}/movies/${dataFetch.Movie.picture}`}
                    alt={dataFetch.Movie.name}
                />
            </div>

            {/* ── Tags ───────────────────────────────────── */}
            <div className="recipe-tags">
                <span className="recipe-tag">{dataFetch.Movie.Category.name}</span>
                <span className="recipe-tag">{dataFetch.DishType.name}</span>
                <span className="recipe-tag">{dataFetch.difficulty}</span>
                <span className="recipe-tag recipe-tag-duration">⏱ {dataFetch.total_duration} min</span>
            </div>

            {/* ── Ingrédients + Préparation ──────────────── */}
            <div className="recipe-main">
                <div>
                    <p className="recipe-section-title">Ingrédients</p>
                    <div className="recipe-servings">
                        <button className="counter-button" onClick={() => setCount(c => Math.max(1, c - 1))}>−</button>
                        <span>{count} {count > 1 ? 'personnes' : 'personne'}</span>
                        <button className="counter-button" onClick={() => setCount(c => c + 1)}>+</button>
                    </div>
                    <ul className="ingredients-list">
                        {ingredientsList?.map(ing => (
                            <li key={ing.id}>
                                {ing.quantity?.numberPart
                                    ? `${ing.quantity.numberPart * count} ${ing.quantity.textPart ?? ''}`
                                    : ''}{' '}
                                {ing.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="recipe-section-title">Préparation</p>
                    <ul className="preparation-list">
                        {dataFetch.Preparations.map(step => (
                            <li key={step.id}>
                                <span className="step-number">{step.step_position}</span>
                                <span className="step-text">{step.description}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── Anecdote ───────────────────────────────── */}
            {dataFetch.anecdote && (
                <div className="recipe-anecdote">
                    <span className="anecdote-label">Anecdote</span>
                    <p>{dataFetch.anecdote}</p>
                </div>
            )}

            {/* ── Actions ────────────────────────────────── */}
            <div className="recipe-actions">
                <LikeButton
                    userLikedIt={userLikedIt}
                    handleLikeRecipeButton={handleLike}
                    isAuth={isAuth}
                />
                {isAuth && isRecipeOwner && (
                    <button className="btn-danger" onClick={() => setShowDeleteModal(true)}>
                        Supprimer la recette
                    </button>
                )}
            </div>

            {/* ── Commentaires ───────────────────────────── */}
            <CommentComponent recipeId={dataFetch.id} />

            {/* ── Delete modal ───────────────────────────── */}
            {showDeleteModal && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal-box">
                        <p>Êtes-vous sûr de vouloir supprimer définitivement cette recette ?</p>
                        <div className="delete-modal-actions">
                            <button onClick={handleDelete}>Supprimer</button>
                            <button onClick={() => setShowDeleteModal(false)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            <Encrage />
        </div>
    );
}

export default RecipePage;
