import { useReducer, useState } from 'react';
import './UpdateRecipeModal.scss';
import { IInputsModal, IRecipe } from '../models';
import { getInputsRecipeForm } from '../services/modalUpdateRecipeFormFieldsConfig';
import UpdateModalComponent from './UpdateModalComponent';
import { recipeReducer } from '../services/RecipeReducer';
import { fetchRecipe, updateRecipe } from '../services/APICall';
import { toast } from 'react-toastify';

interface UpdateRecipeModalProps {
    recipeData: IRecipe;
    setDataFetch: React.Dispatch<React.SetStateAction<IRecipe | null>>;
}

function UpdateRecipeModal({
    recipeData,
    setDataFetch,
}: UpdateRecipeModalProps) {
    const [isUser, setIsUser] = useState(true);
    const [isRecipeOwner, setIsRecipeOwner] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [recipeOrFilm, setRecipeOrFilm] = useState<string>('');
    const { Ingredient, Preparations, Movie } = recipeData;

    const [state, dispatch] = useReducer(recipeReducer, recipeData);
    const InputsModal = getInputsRecipeForm(state);
    console.log(state);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function toggleRecipeOrFilmPart(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        if (event.currentTarget.id === 'recipe') {
            setRecipeOrFilm('recipe');
        }
        if (event.currentTarget.id === 'film') {
            setRecipeOrFilm('film');
        }
    }

    const handleChange =
        (actionType: string, index?: number | null) =>
        (
            event: React.ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >,
        ) => {
            const { name, value } = event.target;

            dispatch({
                actionType,
                field: name,
                value,
                index,
            });
        };

    function handleSubmit() {
        console.log(state);
        updateRecipe(state).then((response) => {
            console.log(response);
            fetchRecipe(state.id).then((data) => {
                console.log(data);
                // mettre en forme les données à set...
                setDataFetch(data);
                setIsOpen(false);
                toast.success('Recette modifiée avec succès!');
            });
        });
    }

    if (!recipeData) return <div>Chargement en cours ^^</div>;

    return (
        <div>
            {isUser && isRecipeOwner && !isOpen && (
                <button onClick={toggleModal}>Modifier ma recette</button>
            )}

            {isOpen && (
                //Black transparent background around modal
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* Background of modal */}
                    <div className="bg-skin rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto flex flex-col">
                        <h2 className="text-black">Modifier la recette</h2>
                        <div className="flex gap-2 justify-center">
                            <button
                                className="modal-button"
                                onClick={toggleRecipeOrFilmPart}
                                id="recipe"
                            >
                                Partie Recette
                            </button>

                            <button
                                className="modal-button"
                                onClick={toggleRecipeOrFilmPart}
                                id="film"
                            >
                                Partie Film
                            </button>
                        </div>
                        {/* Update Recipe Modal Part */}
                        {recipeOrFilm === 'recipe' && (
                            <div>
                                <div>
                                    {InputsModal.map((item: IInputsModal) => {
                                        return (
                                            <UpdateModalComponent
                                                key={item.name}
                                                item={item}
                                                handleChange={handleChange}
                                            />
                                        );
                                    })}
                                </div>
                                {/* Ingredients part */}
                                <div>
                                    {Ingredient &&
                                        Ingredient.map((item, index) => {
                                            return (
                                                <div
                                                    className="label-input-linked"
                                                    key={item.id}
                                                >
                                                    <label className="modal-label">
                                                        Ingrédient {index + 1}
                                                        <input
                                                            className="modal-input"
                                                            name={'name'}
                                                            type="text"
                                                            onChange={handleChange(
                                                                'UPDATE_INGREDIENT',
                                                                index,
                                                            )}
                                                            value={
                                                                state
                                                                    .Ingredient[
                                                                    index
                                                                ].name
                                                            }
                                                        />
                                                    </label>

                                                    <label className="modal-label">
                                                        {' '}
                                                        Quantité {index + 1}
                                                        <input
                                                            className="modal-input"
                                                            name={`quantity`}
                                                            type="text"
                                                            onChange={handleChange(
                                                                'UPDATE_INGREDIENT',
                                                                index,
                                                            )}
                                                            value={
                                                                state
                                                                    .Ingredient[
                                                                    index
                                                                ].quantity
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div>
                                    {Preparations &&
                                        Preparations.map((step, index) => {
                                            return (
                                                <div
                                                    key={step.id}
                                                    className="label-input-linked"
                                                >
                                                    <label className="modal-label">
                                                        Etape:
                                                        <input
                                                            className="modal-input"
                                                            name={`step_position`}
                                                            onChange={handleChange(
                                                                'UPDATE_PREPARATION',
                                                                index,
                                                            )}
                                                            type="number"
                                                            value={
                                                                state
                                                                    .Preparations[
                                                                    index
                                                                ].step_position
                                                            }
                                                        />
                                                    </label>
                                                    <label className="modal-label">
                                                        Description:
                                                        <textarea
                                                            className="modal-input text-input"
                                                            name={`description`}
                                                            onChange={handleChange(
                                                                'UPDATE_PREPARATION',
                                                                index,
                                                            )}
                                                            value={
                                                                state
                                                                    .Preparations[
                                                                    index
                                                                ].description
                                                            }
                                                        ></textarea>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                        {recipeOrFilm === 'film' && (
                            <div className="label-input-container">
                                <label className="modal-label">
                                    Titre
                                    <textarea
                                        className="modal-input"
                                        name="name"
                                        value={state.Movie.name}
                                        onChange={handleChange('UPDATE_MOVIE')}
                                    ></textarea>
                                </label>
                                <label className="modal-label">
                                    Catégorie
                                    <select
                                        className="modal-input"
                                        name="Category"
                                        value={state.Movie.Category.name}
                                        onChange={handleChange('UPDATE_MOVIE')}
                                    >
                                        <option value="Film" id="1">
                                            Film
                                        </option>
                                        <option value="Série" id="2">
                                            Série
                                        </option>
                                        <option value="Anime" id="3">
                                            Anime
                                        </option>
                                    </select>
                                </label>
                                <label className="modal-label">
                                    Image associée
                                    <input
                                        id="update_movie"
                                        name="picture"
                                        type="file"
                                    />
                                </label>
                            </div>
                        )}

                        <div className="flex justify-evenly">
                            <button onClick={toggleModal}>Annuler</button>
                            {recipeOrFilm !== '' && (
                                <button onClick={handleSubmit}>
                                    Soumettre
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateRecipeModal;
