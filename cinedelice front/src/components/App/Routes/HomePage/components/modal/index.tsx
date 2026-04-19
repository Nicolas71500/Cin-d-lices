import { useState } from 'react';
import { API_URL } from '../../../../../../config';

const AddRecipeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        {
            /* Inverse l'état pour ouvrir/fermer la modale*/
        }
        setIsOpen(!isOpen);
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);
        console.log(data);

        try {
            const response = await fetch(
                `${API_URL}/recipes`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                throw new Error('Failed to save recipe');
            }

            toggleModal(); // Fermer la modale après soumission
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recette:", error);
        }
    };

    return (
        <>
            {/* Bouton pour ouvrir la modale, au clic la fonction toggleModal est appelée, c'est alors ici que le useState est inversé */}
            <button onClick={toggleModal}>Ajouter une recette</button>

            {/* Si l'utilisateur clique sur le bouton, alors isOpen  est TRUE, donc on affiche la modale */}
            {/* Dans le cas où  isOpen est false, on ne montre pas la modale */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Ajouter une recette
                        </h2>
                        <form method="POST" onSubmit={submitForm}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nom de la recette
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nom de la recette"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image de la recette
                                    </label>
                                    <input
                                        name="picture"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="URL de l'image"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Film de la recette
                                    </label>
                                    <input
                                        name="movies.name"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nom du film"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image du film de la recette
                                    </label>
                                    <input
                                        name="movies.picture"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="URL de l'image du film"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Type de recette
                                    </label>
                                    <select
                                        name="dish_types_id"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    >
                                        <option value="1">Boisson</option>
                                        <option value="4">Entrée</option>
                                        <option value="2">Plat</option>
                                        <option value="3">Dessert</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Difficulté de la recette
                                    </label>
                                    <select
                                        name="difficulty"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    >
                                        <option>Facile</option>
                                        <option>Moyen</option>
                                        <option>Difficile</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ingrédients de la recette
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="3"
                                        placeholder="Liste des ingrédients"
                                    ></textarea>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Préparation de la recette
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="4"
                                        placeholder="Détails de la préparation"
                                    ></textarea>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Anecdote
                                    </label>
                                    <textarea
                                        name="anecdote"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="2"
                                        placeholder="Anecdote liée à la recette"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                {/* Ici on appelle toggleModal pour fermer la modale, on iverse l'état */}
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="bg-gray-500 text-white font-medium py-2 px-4 rounded"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white font-medium py-2 px-4 rounded"
                                >
                                    Valider
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddRecipeModal;
