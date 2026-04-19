export interface IError {
    message: string;
}

export interface IValidation {
    isValid: boolean;
    message?: string;
}

export interface IForm {
    last_name: string;
    first_name: string;
    username: string;
    email_address: string;
    password: string;
    passwordConfirm: string;
    errorOnSubmit: string;
    message: string;
}

export interface IInputsForm {
    label: string;
    name: string;
    type: string;
    value: string;
    required: boolean;
    placeholder?: string;
}

export interface IInputsFormProps {
    input: IInputsForm;
    handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    password: string;
    passwordConfirm: string;
}

export type TFormAction =
    | { type: 'SET_FIELD'; field: string; value: string }
    | { type: 'SET_ERROR'; field: string; error: string };

export interface IDataForm {
    last_name: string | null;
    first_name: string | null;
    username: string;
    email_address: string;
    password: string;
}

export interface IInputRefs {
    usernameRef: React.MutableRefObject<HTMLInputElement | null>;
    emailRef: React.MutableRefObject<HTMLInputElement | null>;
    passwordRef: React.MutableRefObject<HTMLInputElement | null>;
    passwordConfirmRef: React.MutableRefObject<HTMLInputElement | null>;
}
