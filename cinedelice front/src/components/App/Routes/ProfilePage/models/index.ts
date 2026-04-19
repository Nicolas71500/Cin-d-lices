export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email_address: string;
}
export interface IPassword {
    password: string;
}

export interface IRecipe {
    id: number;
    name: string;
    picture: string | undefined;
    total_duration: number;
    anecdote: string | null;
    difficulty: string;
    is_checked: boolean;
    Movie: IMovie;
    User: IUser;
    getUserRecipes: () => void;
}

export interface IMovie {
    id: number;
    name: string;
    picture: string;
}

export interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    error?: string;
}

export interface UserInfoFormProps {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    // password: string;
    editForm: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}
