import { useState } from 'react';
import './LoginPage.scss';
import { IError } from './models';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';

function LoginPage() {
    const [error, setError] = useState<IError | null>(null);
    const { handleLogin } = useAuthContext();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const { email_address, password } = data;

        if (!email_address || !password) {
            setError({ message: 'Veuillez renseigner tous les champs obligatoires' });
            return;
        }
        setError(null);
        await handleLogin({
            email_address: email_address as string,
            password:      password as string,
        });
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <p className="auth-logo"><span>C</span>iné<span>D</span>élices</p>
                <p className="auth-eyebrow">Connexion à votre compte</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email_address">Adresse e-mail</label>
                        <input id="email_address" type="email" name="email_address" placeholder="votre@email.com" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" type="password" name="password" placeholder="••••••••" required />
                    </div>
                    {error && <div className="auth-error">{error.message}</div>}
                    <button type="submit" className="auth-submit btn-filled">Se connecter</button>
                </form>

                <div className="auth-footer">
                    Pas encore inscrit ?{' '}
                    <Link to="/inscription">Créer un compte</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
