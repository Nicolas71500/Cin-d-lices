import axios from 'axios';
import { API_URL } from '../../../../../config';

export function fetchOneRandom() {
    return axios
        .get(`${API_URL}/recipes/randomOne`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
