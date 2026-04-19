import { ICommentCard, ICommentData } from '../Model/type';
import {
    axiosGetInstance,
    axiosLoggedPostInstance,
} from '../../../../../services/generalAxiosInstance';

//Fetch les commentaires de la recette
export function fetchComments(
    recipeId: number,
): Promise<ICommentCard[] | null> {
    return axiosGetInstance.get(`/comment/${recipeId}`).then((response) => {
        return response.data;
    });
}

export function postNewComment(data: ICommentData) {
    return axiosLoggedPostInstance.post('/comment', data).then((response) => {
        return response.data;
    });
}
