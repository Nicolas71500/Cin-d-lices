import { IForm, IInputsForm } from '../models';

export const getInputsForm = (state: IForm): IInputsForm[] => [
    {
        label: 'Nom',
        name: 'last_name',
        type: 'text',
        value: state.last_name,
        required: false,
        placeholder: 'Dupont',
    },
    {
        label: 'Prénom',
        name: 'first_name',
        type: 'text',
        value: state.first_name,
        required: false,
        placeholder: 'Jean',
    },
    {
        label: "Nom d'utilisateur",
        name: 'username',
        type: 'text',
        value: state.username,
        required: true,
        placeholder: 'cinephile42',
    },
    {
        label: 'Adresse e-mail',
        name: 'email_address',
        type: 'email',
        value: state.email_address,
        required: true,
        placeholder: 'votre@email.com',
    },
    {
        label: 'Mot de passe',
        name: 'password',
        type: 'password',
        value: state.password,
        required: true,
        placeholder: '••••••••',
    },
    {
        label: 'Confirmer le mot de passe',
        name: 'passwordConfirm',
        type: 'password',
        value: state.passwordConfirm,
        required: true,
        placeholder: '••••••••',
    },
];
