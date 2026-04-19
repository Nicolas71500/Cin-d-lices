import { IForm, IInputsForm, TFormAction } from '../models';

export function formOnSubmitValidation(
    state: IForm,
    dispatch: React.Dispatch<TFormAction>,
): boolean {
    let isValid = true;

    if (state.username.trim().length < 2 || state.username.trim() === '') {
        dispatch({
            type: 'SET_ERROR',
            field: 'username',
            error: "Veuillez entrer un nom d'utilisateur d'au moins deux caractères",
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'username',
            error: '',
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(state.email_address) || state.email_address === '') {
        dispatch({
            type: 'SET_ERROR',
            field: 'email_address',
            error: 'Veuillez entrer une adresse mail valide',
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'email_address',
            error: '',
        });
    }
    if (state.password.trim().length < 6 || state.password === '') {
        dispatch({
            type: 'SET_ERROR',
            field: 'password',
            error: "Veuillez entrer un mot de passe d'au moins six caractères",
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'password',
            error: '',
        });
    }
    if (state.passwordConfirm !== state.password) {
        dispatch({
            type: 'SET_ERROR',
            field: 'passwordConfirm',
            error: 'Veuillez entrer des mots de passe identiques',
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'passwordConfirm',
            error: '',
        });
    }
    return isValid;
}

export function validateForm(
    input: IInputsForm,
    password: string,
    passwordConfirm: string,
) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        input.name === 'username' &&
        input.value.length > 0 &&
        input.value.length < 2
    ) {
        return "Le nom d'utilisateur doit comporter au moins 2 caractères";
    }
    if (
        input.name === 'email_address' &&
        input.value.length > 0 &&
        !emailRegex.test(input.value)
    ) {
        return "L'adresse mail doit être dans un format valide";
    }
    if (
        input.name === 'password' &&
        input.value.length > 0 &&
        input.value.length < 6
    ) {
        return 'Le mot de passe doit comporter au moins 6 caractères';
    }

    if (
        input.name === 'passwordConfirm' &&
        input.value.length > 0 &&
        password !== passwordConfirm
    ) {
        return 'Les mots de passent doivent correspondre';
    }

    return null;
}
