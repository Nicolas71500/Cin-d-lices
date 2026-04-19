import axios from 'axios';
import { IUserAuth } from '../../@types/authenticate';
import { NavigateFunction } from 'react-router-dom';
import { API_URL } from '../../../../config';

export function getUserData(
    navigate: NavigateFunction,
): Promise<IUserAuth | null> {
    return axios
        .get(`${API_URL}/me`, {
            withCredentials: true,
        })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            navigate('/login');
            return error;
        });
    //End of checkAuth
}
