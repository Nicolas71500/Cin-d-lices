import { useContext } from 'react';
import { AuthenticateContext } from './Authentification';

export const useAuthContext = () => useContext(AuthenticateContext);
