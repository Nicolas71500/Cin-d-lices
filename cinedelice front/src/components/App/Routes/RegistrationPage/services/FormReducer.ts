import { IForm, TFormAction } from '../models';

export const initialState: IForm = {
    last_name: '',
    first_name: '',
    username: '',
    email_address: '',
    password: '',
    passwordConfirm: '',

    errorOnSubmit: '',
    message: '',
};

export const formReducer = (state: IForm, action: TFormAction) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'SET_ERROR':
            return {
                ...state,
                [`${action.field}Error`]: action.error,
            };
        default:
            return state;
    }
};
