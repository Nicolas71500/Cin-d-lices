import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../../../config';
import { IUser } from '../models';

export async function fetchUser() {
    try {
        const response = await axios.get(
            `${API_URL}/me`,
            {
                // cookies in the req
                withCredentials: true,
            },
        );
        toast.success(response.data.message);
        // handle error with a toast
        if (response.status === 404) {
            toast.error('Utilisateur non trouvé.');
        } else if (response.status === 401) {
            toast.error("Vous n'êtes pas connecté. Veuillez vous connecter.");
        } else {
            // Other errors
            toast.error('Une erreur est survenue. Veuillez réessayer.');
        }
        return response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des données utilisateur',
            error,
        );
    }
}

export async function updateUser(userUpdateData: IUser) {
    try {
        const response = await axios.put(
            `${API_URL}/me`,
            {
                // User data to update
                last_name: userUpdateData.last_name,
                first_name: userUpdateData.first_name,
                username: userUpdateData.username,
                email_address: userUpdateData.email_address,
            },
            {
                // include cookies
                withCredentials: true,
            },
        );
        if (response.status === 204) {
            toast.success('Vos informations ont été mises à jour avec succès.');
        }
        // handle error with a toast
        else if (response.status === 404) {
            toast.error('Utilisateur non trouvé.');
        } else if (response.status === 500) {
            toast.error('Erreur interne du serveur.');
        } else {
            // Other errors
            toast.error('Une erreur est survenue. Veuillez réessayer.');
        }
        return response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des données utilisateur',
            error,
        );
    }
}

export async function getUserRecipes() {
    try {
        const response = await axios.get(
            `${API_URL}/user/recipes`,
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        toast.error(
            'Une erreur est survenue lors de la récupération de vos données, veuillez revenir plus tard',
        );
        console.error(
            'Erreur lors de la récupération des données utilisateur',
            error,
        );
    }
}

export async function fetchDeleteRecipe(id: number): Promise<any> {
    try {
        const response = await axios.delete(
            `${API_URL}/recipes/${id}`,
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(
            'Une erreur est survenue lors de la suppression de votre recette',
        );
        console.error('Erreur lors de la suppression de la recette', error);
    }
}

export async function getUserLikedRecipes(userId: number) {
    try {
        const response = await axios.get(
            `${API_URL}/likes/user/${userId}`,
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes aimées', error);
        return [];
    }
}

export async function updatePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
): Promise<{ status: number; message: string } | undefined> {
    try {
        const response = await axios.put(
            `${API_URL}/update-password`,
            { oldPassword, newPassword, confirmPassword },
            {
                withCredentials: true, // Include cookies for authentication
            },
        );

        // Debug server response
        console.log('Réponse du serveur:', response);

        // Return the status and message in the response
        return { status: response.status, message: response.data.message };
    } catch (error) {
        // Type assertion to handle unknown error type
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const status = error.response?.status || 500;
            const message =
                error.response?.data.message ||
                'Erreur lors de la mise à jour du mot de passe';
            toast.error(message);
            return { status, message };
        } else {
            // Handle other errors
            toast.error('Erreur lors de la mise à jour du mot de passe');
            return {
                status: 500,
                message: 'Erreur lors de la mise à jour du mot de passe',
            };
        }
    }
}
