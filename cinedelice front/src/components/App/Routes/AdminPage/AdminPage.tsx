import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../config';
import './AdminPage.scss';
import {
    fetchAdminData,
    fetchRecipeFull,
    deleteUserAdmin,
    updateUserRoleAdmin,
    deleteRecipeAdmin,
    updateRecipeAdmin,
    deleteMovieAdmin,
    updateMovieAdmin,
    addIngredientToDB,
    IAdminData,
    IAdminUser,
    IAdminRecipe,
    IAdminMovie,
    IRecipeUpdatePayload,
    IMovieUpdatePayload,
} from './services/adminAPI';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import { toast } from 'react-toastify';
import { INGREDIENTS_FR } from '../../../../data/ingredients-fr';

type Tab = 'users' | 'recipes' | 'movies';

interface ConfirmState {
    type: 'user' | 'recipe' | 'movie';
    id: number;
    label: string;
}

interface PrepRow { description: string; }
interface IngRow  { name: string; quantity: string; }

function AdminPage() {
    const { userAuth, isAuth } = useAuthContext();
    const [data, setData]           = useState<IAdminData | null>(null);
    const [loading, setLoading]     = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('users');
    const [confirm, setConfirm]     = useState<ConfirmState | null>(null);
    const [pendingRoles, setPendingRoles] = useState<Record<number, number>>({});


    // Edit recipe modal
    const [editRecipe, setEditRecipe] = useState<IAdminRecipe | null>(null);
    const [recipeForm, setRecipeForm] = useState<IRecipeUpdatePayload>({
        name: '', difficulty: 'Facile', anecdote: '', total_duration: 0,
        dish_types_id: 1, movie_id: 1,
    });
    const [editPreps, setEditPreps]             = useState<PrepRow[]>([]);
    const [editIngredients, setEditIngredients] = useState<IngRow[]>([]);
    const [loadingFullRecipe, setLoadingFullRecipe] = useState(false);

    // Edit movie modal
    const [editMovie, setEditMovie] = useState<IAdminMovie | null>(null);
    const [movieForm, setMovieForm] = useState<IMovieUpdatePayload>({ name: '', category_id: 1 });

    // Add ingredient to DB modal
    const [showAddIngredient, setShowAddIngredient] = useState(false);
    const [newIngName, setNewIngName] = useState('');
    const [newIngQty, setNewIngQty]   = useState('');

    const isAdmin = isAuth && userAuth?.role_id === 1;

    useEffect(() => {
        if (!isAdmin) return;
        fetchAdminData()
            .then(setData)
            .catch(() => toast.error('Erreur lors du chargement des données admin.'))
            .finally(() => setLoading(false));
    }, [isAdmin]);

    // ─── Confirm delete ──────────────────────────────────────────────────────
    async function handleConfirm() {
        if (!confirm) return;
        try {
            if (confirm.type === 'user') {
                await deleteUserAdmin(confirm.id);
                setData(prev => prev ? { ...prev, users: prev.users.filter(u => u.id !== confirm.id) } : prev);
                toast.success('Utilisateur supprimé.');
            }
            if (confirm.type === 'recipe') {
                await deleteRecipeAdmin(confirm.id);
                setData(prev => prev ? { ...prev, recipes: prev.recipes.filter(r => r.id !== confirm.id) } : prev);
                toast.success('Recette supprimée.');
            }
            if (confirm.type === 'movie') {
                await deleteMovieAdmin(confirm.id);
                setData(prev => prev ? { ...prev, movies: prev.movies.filter(m => m.id !== confirm.id) } : prev);
                toast.success('Film supprimé.');
            }
        } catch {
            toast.error('Erreur lors de la suppression.');
        } finally {
            setConfirm(null);
        }
    }

    // ─── Role change ─────────────────────────────────────────────────────────
    async function handleRoleChange(user: IAdminUser, newRoleId: number) {
        setPendingRoles(prev => ({ ...prev, [user.id]: newRoleId }));
        try {
            const updated = await updateUserRoleAdmin(user.id, newRoleId);
            setData(prev => prev ? {
                ...prev,
                users: prev.users.map(u => u.id === user.id ? { ...u, role_id: updated.role_id } : u),
            } : prev);
            toast.success(`Rôle de ${user.username} mis à jour.`);
        } catch {
            toast.error('Erreur lors de la mise à jour du rôle.');
        } finally {
            setPendingRoles(prev => { const n = { ...prev }; delete n[user.id]; return n; });
        }
    }

    // ─── Open recipe edit ────────────────────────────────────────────────────
    async function openEditRecipe(recipe: IAdminRecipe) {
        setEditRecipe(recipe);
        setRecipeForm({
            name:           recipe.name,
            difficulty:     recipe.difficulty,
            anecdote:       recipe.anecdote ?? '',
            total_duration: recipe.total_duration,
            dish_types_id:  recipe.DishType?.id ?? recipe.dish_types_id,
            movie_id:       recipe.Movie?.id    ?? recipe.movie_id,
        });
        setEditPreps([]);
        setEditIngredients([]);
        setLoadingFullRecipe(true);
        try {
            const full = await fetchRecipeFull(recipe.id);
            const preps = [...(full.Preparations ?? [])].sort((a, b) => a.step_position - b.step_position);
            setEditPreps(preps.map(p => ({ description: p.description })));
            setEditIngredients((full.Ingredient ?? []).map(i => ({ name: i.name, quantity: i.quantity ?? '' })));
        } catch {
            // silently fail — basic fields are still editable
        } finally {
            setLoadingFullRecipe(false);
        }
    }

    async function handleSaveRecipe() {
        if (!editRecipe) return;
        try {
            const updated = await updateRecipeAdmin(editRecipe.id, {
                ...recipeForm,
                preparations: editPreps.filter(p => p.description.trim()),
                ingredients:  editIngredients.filter(i => i.name.trim()),
            });
            setData(prev => prev ? {
                ...prev,
                recipes: prev.recipes.map(r => r.id === editRecipe.id ? { ...r, ...updated } : r),
            } : prev);
            toast.success(`Recette « ${updated.name} » mise à jour.`);
            setEditRecipe(null);
        } catch {
            toast.error('Erreur lors de la mise à jour.');
        }
    }

    // ─── Open movie edit ─────────────────────────────────────────────────────
    function openEditMovie(movie: IAdminMovie) {
        setEditMovie(movie);
        setMovieForm({
            name:        movie.name,
            category_id: movie.Category?.id ?? movie.category_id,
        });
    }

    async function handleSaveMovie() {
        if (!editMovie) return;
        try {
            const updated = await updateMovieAdmin(editMovie.id, movieForm);
            setData(prev => prev ? {
                ...prev,
                movies: prev.movies.map(m => m.id === editMovie.id ? { ...m, ...updated } : m),
            } : prev);
            toast.success(`Film « ${updated.name} » mis à jour.`);
            setEditMovie(null);
        } catch {
            toast.error('Erreur lors de la mise à jour.');
        }
    }

    // ─── Add ingredient to DB ─────────────────────────────────────────────────
    async function handleAddIngredientToDB() {
        if (!newIngName.trim()) return;
        try {
            await addIngredientToDB(newIngName.trim(), newIngQty.trim());
            toast.success(`Ingrédient « ${newIngName} » ajouté.`);
            setShowAddIngredient(false);
            setNewIngName('');
            setNewIngQty('');
        } catch {
            toast.error("Erreur lors de l'ajout de l'ingrédient.");
        }
    }

    // ─── Guards ──────────────────────────────────────────────────────────────
    if (!isAuth) {
        return <div className="admin-forbidden"><p>Vous devez être connecté pour accéder à cette page.</p></div>;
    }
    if (!isAdmin) {
        return (
            <div className="admin-forbidden">
                <p>Accès réservé aux administrateurs.</p>
                <Link to="/" className="button-link">Retour à l'accueil</Link>
            </div>
        );
    }
    if (loading || !data) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-skin-muted)', fontFamily: 'Cinzel, serif', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                Chargement du panneau admin…
            </div>
        );
    }

    return (
        <div className="admin-page">
            {/* Header */}
            <div className="admin-header">
                <h1 className="admin-title">Panneau d'administration</h1>
                <span className="admin-badge">Admin</span>
            </div>

            {/* Stats */}
            <div className="admin-stats">
                {[
                    { n: data.users.length,   l: 'Utilisateurs' },
                    { n: data.recipes.length, l: 'Recettes' },
                    { n: data.movies.length,  l: 'Films' },
                    { n: data.roles.length,   l: 'Rôles' },
                ].map(({ n, l }) => (
                    <div className="admin-stat-card" key={l}>
                        <p className="stat-number">{n}</p>
                        <p className="stat-label">{l}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                {(['users', 'recipes', 'movies'] as Tab[]).map(tab => (
                    <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                        {tab === 'users' ? 'Utilisateurs' : tab === 'recipes' ? 'Recettes' : 'Films'}
                    </button>
                ))}
            </div>

            {/* ── Users tab ─────────────────────────────────────────────────────── */}
            {activeTab === 'users' && (
                <>
                    <p className="admin-section-title">Gestion des utilisateurs</p>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Pseudo</th><th>Email</th><th>Nom complet</th><th>Rôle</th><th className="th-actions">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td className="td-strong">{user.username}</td>
                                        <td>{user.email_address}</td>
                                        <td>{[user.first_name, user.last_name].filter(Boolean).join(' ') || '—'}</td>
                                        <td>
                                            <select
                                                className="role-select"
                                                value={pendingRoles[user.id] ?? user.role_id}
                                                onChange={e => handleRoleChange(user, Number(e.target.value))}
                                                disabled={user.id === userAuth?.id}
                                            >
                                                {data.roles.map(role => (
                                                    <option key={role.id} value={role.id}>{role.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <div className="td-actions">
                                                {user.id !== userAuth?.id && (
                                                    <button className="btn-sm btn-sm-danger"
                                                        onClick={() => setConfirm({ type: 'user', id: user.id, label: user.username })}>
                                                        Supprimer
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* ── Recipes tab ───────────────────────────────────────────────────── */}
            {activeTab === 'recipes' && (
                <>
                    <div className="admin-section-bar">
                        <p className="admin-section-title">Gestion des recettes</p>
                        <button className="btn-sm" onClick={() => setShowAddIngredient(true)}>+ Ajouter un ingrédient</button>
                    </div>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th><th>Recette</th><th>Film</th><th>Auteur</th><th>Type</th><th>Difficulté</th><th>Durée</th><th className="th-actions">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recipes.map(recipe => (
                                    <tr key={recipe.id}>
                                        <td>
                                            <img className="recipe-thumb" src={`${API_URL}/recipes/${recipe.picture}`} alt={recipe.name} />
                                        </td>
                                        <td className="td-strong">
                                            <Link to={`/recette/${recipe.id}`} style={{ color: 'inherit' }}>{recipe.name}</Link>
                                        </td>
                                        <td>{recipe.Movie?.name ?? '—'}</td>
                                        <td>{recipe.User?.username ?? '—'}</td>
                                        <td>{recipe.DishType?.name ?? '—'}</td>
                                        <td>{recipe.difficulty}</td>
                                        <td>{recipe.total_duration} min</td>
                                        <td>
                                            <div className="td-actions">
                                                <button className="btn-sm" onClick={() => openEditRecipe(recipe)}>Modifier</button>
                                                <button className="btn-sm btn-sm-danger"
                                                    onClick={() => setConfirm({ type: 'recipe', id: recipe.id, label: recipe.name })}>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* ── Movies tab ────────────────────────────────────────────────────── */}
            {activeTab === 'movies' && (
                <>
                    <p className="admin-section-title">Gestion des films</p>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th><th>Titre</th><th>Catégorie</th><th className="th-actions">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.movies.map(movie => (
                                    <tr key={movie.id}>
                                        <td>
                                            <img className="recipe-thumb" src={`${API_URL}/movies/${movie.picture}`} alt={movie.name} />
                                        </td>
                                        <td className="td-strong">{movie.name}</td>
                                        <td>{movie.Category?.name ?? '—'}</td>
                                        <td>
                                            <div className="td-actions">
                                                <button className="btn-sm" onClick={() => openEditMovie(movie)}>Modifier</button>
                                                <button className="btn-sm btn-sm-danger"
                                                    onClick={() => setConfirm({ type: 'movie', id: movie.id, label: movie.name })}>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* ── Edit Recipe Modal ─────────────────────────────────────────────── */}
            {editRecipe && (
                <div className="admin-edit-overlay" onClick={() => setEditRecipe(null)}>
                    <div className="admin-edit-box" onClick={e => e.stopPropagation()}>
                        <p className="admin-edit-title">Modifier la recette</p>

                        <div className="admin-edit-fields">
                            {/* Basic fields */}
                            <div className="form-group">
                                <label>Nom de la recette</label>
                                <input type="text" value={recipeForm.name}
                                    onChange={e => setRecipeForm(p => ({ ...p, name: e.target.value }))} />
                            </div>

                            <div className="form-group">
                                <label>Difficulté</label>
                                <select value={recipeForm.difficulty}
                                    onChange={e => setRecipeForm(p => ({ ...p, difficulty: e.target.value }))}>
                                    <option>Facile</option>
                                    <option>Moyen</option>
                                    <option>Difficile</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Type de plat</label>
                                <select value={recipeForm.dish_types_id}
                                    onChange={e => setRecipeForm(p => ({ ...p, dish_types_id: Number(e.target.value) }))}>
                                    {data.dishTypes.map(dt => (
                                        <option key={dt.id} value={dt.id}>{dt.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Film associé</label>
                                <select value={recipeForm.movie_id}
                                    onChange={e => setRecipeForm(p => ({ ...p, movie_id: Number(e.target.value) }))}>
                                    {data.movies.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Durée (minutes)</label>
                                <input type="number" min="1" value={recipeForm.total_duration}
                                    onChange={e => setRecipeForm(p => ({ ...p, total_duration: Number(e.target.value) }))} />
                            </div>

                            <div className="form-group">
                                <label>Anecdote</label>
                                <textarea value={recipeForm.anecdote} rows={3}
                                    onChange={e => setRecipeForm(p => ({ ...p, anecdote: e.target.value }))} />
                            </div>

                            {/* Préparation */}
                            <div className="admin-edit-subsection">
                                <p className="admin-edit-subsection-title">Étapes de préparation</p>
                                {loadingFullRecipe ? (
                                    <p className="admin-edit-loading">Chargement…</p>
                                ) : (
                                    <>
                                        {editPreps.map((prep, idx) => (
                                            <div key={idx} className="admin-edit-step-row">
                                                <span className="admin-edit-step-num">{idx + 1}</span>
                                                <textarea
                                                    className="admin-edit-textarea admin-edit-step-input"
                                                    value={prep.description}
                                                    rows={2}
                                                    onChange={e => {
                                                        const copy = [...editPreps];
                                                        copy[idx] = { description: e.target.value };
                                                        setEditPreps(copy);
                                                    }}
                                                />
                                                <button className="admin-edit-remove-btn"
                                                    onClick={() => setEditPreps(editPreps.filter((_, i) => i !== idx))}
                                                    title="Supprimer">×</button>
                                            </div>
                                        ))}
                                        <button className="btn-sm" style={{ marginTop: '0.5rem' }}
                                            onClick={() => setEditPreps([...editPreps, { description: '' }])}>
                                            + Étape
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Ingrédients */}
                            <div className="admin-edit-subsection">
                                <p className="admin-edit-subsection-title">Ingrédients</p>
                                {loadingFullRecipe ? null : (
                                    <>
                                        <datalist id="mealdb-recipe-ings">
                                            {INGREDIENTS_FR.map(name => <option key={name} value={name} />)}
                                        </datalist>
                                        {editIngredients.map((ing, idx) => (
                                            <div key={idx} className="admin-edit-ing-row">
                                                <input
                                                    list="mealdb-recipe-ings"
                                                    className="admin-edit-ing-name"
                                                    placeholder="Nom"
                                                    value={ing.name}
                                                    onChange={e => {
                                                        const copy = [...editIngredients];
                                                        copy[idx] = { ...copy[idx], name: e.target.value };
                                                        setEditIngredients(copy);
                                                    }}
                                                />
                                                <input
                                                    className="admin-edit-ing-qty"
                                                    placeholder="Quantité"
                                                    value={ing.quantity}
                                                    onChange={e => {
                                                        const copy = [...editIngredients];
                                                        copy[idx] = { ...copy[idx], quantity: e.target.value };
                                                        setEditIngredients(copy);
                                                    }}
                                                />
                                                <button className="admin-edit-remove-btn"
                                                    onClick={() => setEditIngredients(editIngredients.filter((_, i) => i !== idx))}
                                                    title="Supprimer">×</button>
                                            </div>
                                        ))}
                                        <button className="btn-sm" style={{ marginTop: '0.5rem' }}
                                            onClick={() => setEditIngredients([...editIngredients, { name: '', quantity: '' }])}>
                                            + Ingrédient
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="admin-edit-actions">
                            <button className="btn-filled" onClick={handleSaveRecipe}>Enregistrer</button>
                            <button onClick={() => setEditRecipe(null)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Edit Movie Modal ──────────────────────────────────────────────── */}
            {editMovie && (
                <div className="admin-edit-overlay" onClick={() => setEditMovie(null)}>
                    <div className="admin-edit-box" onClick={e => e.stopPropagation()}>
                        <p className="admin-edit-title">Modifier le film</p>

                        <div className="admin-edit-fields">
                            <div className="form-group">
                                <label>Titre du film</label>
                                <input type="text" value={movieForm.name}
                                    onChange={e => setMovieForm(p => ({ ...p, name: e.target.value }))} />
                            </div>

                            <div className="form-group">
                                <label>Catégorie</label>
                                <select value={movieForm.category_id}
                                    onChange={e => setMovieForm(p => ({ ...p, category_id: Number(e.target.value) }))}>
                                    {data.categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="admin-edit-actions">
                            <button className="btn-filled" onClick={handleSaveMovie}>Enregistrer</button>
                            <button onClick={() => setEditMovie(null)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Add Ingredient to DB Modal ────────────────────────────────────── */}
            {showAddIngredient && (
                <div className="admin-edit-overlay" onClick={() => setShowAddIngredient(false)}>
                    <div className="admin-edit-box" style={{ maxWidth: '380px' }} onClick={e => e.stopPropagation()}>
                        <p className="admin-edit-title">Ajouter un ingrédient</p>
                        <div className="admin-edit-fields">
                            <datalist id="mealdb-add-ing">
                                {INGREDIENTS_FR.map(name => <option key={name} value={name} />)}
                            </datalist>
                            <div className="form-group">
                                <label>Nom de l'ingrédient</label>
                                <input
                                    list="mealdb-add-ing"
                                    value={newIngName}
                                    placeholder="ex: Poulet, Farine…"
                                    onChange={e => setNewIngName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Quantité (optionnel)</label>
                                <input
                                    value={newIngQty}
                                    placeholder="ex: 200g, 2 c. à soupe…"
                                    onChange={e => setNewIngQty(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="admin-edit-actions">
                            <button className="btn-filled" onClick={handleAddIngredientToDB}>Ajouter</button>
                            <button onClick={() => { setShowAddIngredient(false); setNewIngName(''); setNewIngQty(''); }}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Confirm delete modal ──────────────────────────────────────────── */}
            {confirm && (
                <div className="admin-confirm-overlay" onClick={() => setConfirm(null)}>
                    <div className="admin-confirm-box" onClick={e => e.stopPropagation()}>
                        <p>Supprimer définitivement <strong style={{ color: 'var(--color-skin)' }}>« {confirm.label} »</strong> ?<br />Cette action est irréversible.</p>
                        <div className="admin-confirm-actions">
                            <button className="btn-danger" onClick={handleConfirm}>Supprimer</button>
                            <button onClick={() => setConfirm(null)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
