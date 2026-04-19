import axios from 'axios';

// Déterminer l'URL de base selon l'environnement
const getBaseURL = () => {
    return import.meta.env.VITE_API_URL || 'http://localhost:3000/';
};

const BASE_URL = getBaseURL();

const axiosGetInstance = axios.create({ baseURL: BASE_URL });

const axiosLoggedGetInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const axiosLoggedPostInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export { axiosGetInstance, axiosLoggedPostInstance, axiosLoggedGetInstance };
