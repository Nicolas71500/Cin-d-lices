import { ILogin } from '../Routes/LoginPage/models';

export interface IUserAuth {
    first_name: string | null;
    last_name: string | null;
    email_address: string | null;
    username: string | null;
    id: number | null;
    role_id: number;
}

export interface IAuthenticateContext {
    userAuth: IUserAuth | null;
    setUserAuth: React.Dispatch<React.SetStateAction<IUserAuth | null>>;
    handleLogin: (data: ILogin) => Promise<void>;
    handleLogout: () => Promise<void>;
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IAuthenticateContextProviderType {
    children: ReactNode;
}
