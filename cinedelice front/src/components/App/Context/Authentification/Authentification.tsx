//contexte authentification ici

import axios from 'axios';
import { API_URL } from '../../../../config';
import { createContext, useEffect, useState } from 'react';
import { ILogin } from '../../Routes/LoginPage/models';
import {
    IAuthenticateContext,
    IAuthenticateContextProviderType,
    IUserAuth,
} from '../../@types/authenticate';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../services/AuthAPI';
import { toast } from 'react-toastify';
import { axiosLoggedPostInstance } from '../../services/generalAxiosInstance';

const defaultAuth: IUserAuth = {
    first_name: null,
    last_name: null,
    username: null,
    email_address: null,
    id: null,
    role_id: 3,
};

const defaultContext: IAuthenticateContext = {
    userAuth: defaultAuth,
    setUserAuth: () => {},
    isAuth: false,
    setIsAuth: () => {},
    handleLogin: async () => {},
    handleLogout: async () => {},
};

export const AuthenticateContext =
    createContext<IAuthenticateContext>(defaultContext);

// state
export const AuthProvider = ({
    children,
}: IAuthenticateContextProviderType) => {
    const [userAuth, setUserAuth] = useState<IUserAuth | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const navigate = useNavigate();
    //  Check if user is authitified in a loading or reloading of a page
    useEffect(() => {
        const storedIsAuth = sessionStorage.getItem('isAuth');
        if (storedIsAuth === 'true') {
            getUserData(navigate)
                .then((data) => {
                    setUserAuth(data);
                    setIsAuth(true);
                })
                .catch((error) => {
                    setIsAuth(false);
                    setUserAuth(null);
                    sessionStorage.removeItem('isAuth');
                    navigate('/login');
                    return error;
                });
        }
    }, []);

    // set the isAuth state true
    console.log(userAuth);

    async function handleLogin(data: ILogin) {
        return axiosLoggedPostInstance
            .post('/login', data)
            .then((response) => {
                console.log(response);

                setIsAuth(true);
                sessionStorage.setItem('isAuth', 'true');
                return getUserData(navigate);
            })
            .then((data) => {
                if (data) {
                    setUserAuth(data);
                    toast.success(`Connexion réussie, bienvenue!`);
                    navigate('/catalogue');
                }
            })
            .catch((error) => {
                console.log(error);
                console.log('dans le catch');

                console.log(error.response.data.message);
                if (error.status === 401) {
                    toast.error(error.response.data.message);
                }
                if (error.status === 500) {
                    console.log('500 ici');

                    toast.error(error.response.data.message);
                }
            });

        //End of handeLogin
    }

    /* logout */

    async function handleLogout(): Promise<void> {
        return axios
            .post(
                `${API_URL}/logout`,
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    setUserAuth(null);
                    setIsAuth(false);
                    sessionStorage.removeItem('isAuth');
                    return response.data;
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                toast.success(`Vous êtes déconnecté!`);
                navigate('/');
            });
    }

    return (
        <AuthenticateContext.Provider
            value={{
                userAuth,
                setUserAuth,
                handleLogin,
                handleLogout,
                isAuth,
                setIsAuth,
            }}
        >
            {children}
        </AuthenticateContext.Provider>
    );
};
