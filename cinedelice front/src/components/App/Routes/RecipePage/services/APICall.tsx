import { toast } from 'react-toastify';
import {
    axiosGetInstance,
    axiosLoggedGetInstance,
    axiosLoggedPostInstance,
} from '../../../services/generalAxiosInstance';
import { IRecipe, IState } from '../models';

export function fetchRecipe(id: number): Promise<IRecipe | { error: string }> {
    return axiosGetInstance
        .get(`/Recipes/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return {
                error:
                    error.message ||
                    'Une erreur est survenue lors du chargement de la recette',
            };
        });
}

export function deleteRecipe(id: number) {
    return axiosLoggedGetInstance
        .delete(`/recipes/${id}`)
        .then((response) => {
            console.log('delete ok');

            console.log(response);
        })
        .catch((error) => {
            console.log('erreur!');

            console.log(error);
        });
}

export function updateRecipe(state: IState) {
    return axiosLoggedPostInstance
        .put(`/recipes/${state.id}`, state)
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                console.log('retour du back');
                return response.data;
            } else if (response.status === 404) {
                toast.error(
                    "Problème dans l'await du back (données envoyées pas bonnes?",
                );
                return;
            } else if (response.status === 500) {
                toast.error('Problème serveur');
            }
            return;
        });
}

export function fetchLikesNumber(id: number): Promise<number> {
    return axiosGetInstance
        .get(`/likes/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function putOneLike(recipeId: number, userId: number) {
    console.log('putOneLike déclenchée');

    return axiosLoggedPostInstance
        .post(`/likes/${recipeId}`, { userId: userId })
        .then((response) => {
            // console.log(response.status);

            return response.status;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function deleteOneLike(recipeId: number, userId: number) {
    console.log('deleteOneLike déclenchée');

    return axiosLoggedGetInstance
        .delete(`likes/${recipeId}/${userId}`)
        .then((response) => {
            // console.log(response.status);

            return response.status;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function checkUserLikedIt(
    recipeId: number,
    userId: number,
): Promise<{ userLikedIt: boolean }> {
    return axiosLoggedGetInstance
        .get(`/likes/${recipeId}/${userId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
