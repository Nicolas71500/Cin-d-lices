import { useEffect, useReducer, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegistrationPage.scss';
import { handleRegistration } from './services/handleRegistration';
import { formOnSubmitValidation } from './services/formValidation';
import { formReducer, initialState } from './services/FormReducer';
import InputComponent from './component/InputComponent';
import { IInputsForm } from './models';
import { getInputsForm } from './services/formFieldsConfig';
import { toast } from 'react-toastify';

function RegistrationPage() {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const inputsForm = getInputsForm(state);
    const navigate = useNavigate();
    const inputFocusRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputFocusRef.current) inputFocusRef.current.focus();
    }, []);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: 'SET_FIELD', field: event.target.name, value: event.target.value });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!formOnSubmitValidation(state, dispatch)) {
            toast.error("Vérifiez les informations fournies.");
            return;
        }

        try {
            const response = await handleRegistration({
                first_name: state.first_name,
                last_name: state.last_name,
                username: state.username,
                email_address: state.email_address,
                password: state.password,
            });
            if (response.status === 201) navigate('/connexion');
        } catch {
            dispatch({ type: 'SET_FIELD', field: 'errorOnSubmit', value: 'Erreur lors de l\'inscription, réessayez plus tard.' });
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card auth-card--wide">
                <p className="auth-logo"><span>C</span>iné<span>D</span>élices</p>
                <p className="auth-eyebrow">Créer un compte</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {inputsForm.map((input: IInputsForm) => (
                        <InputComponent
                            key={input.name}
                            input={input}
                            handleChangeInput={handleChangeInput}
                            password={state.password}
                            passwordConfirm={state.passwordConfirm}
                        />
                    ))}
                    {state.errorOnSubmit && (
                        <div className="auth-error">{state.errorOnSubmit}</div>
                    )}
                    <button type="submit" className="auth-submit btn-filled">S'inscrire</button>
                </form>

                <div className="auth-footer">
                    Déjà inscrit ?{' '}
                    <Link to="/connexion">Se connecter</Link>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
