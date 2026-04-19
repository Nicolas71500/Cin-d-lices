import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilPage.scss';
import { getUserRecipes, updateUser } from './services';
import { IRecipe, IUser } from './models';
import RecepiesTab from './components/RecepiesTab';
import UserInfoForm from './components/UserInfoForm';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import { fetchDeleteRecipe } from './services';
import Encrage from '../Encrage/encrage';

function ProfilePage() {
    const navigate = useNavigate();
    const { userAuth } = useAuthContext();

    const [recipies, setRecipies]   = useState<IRecipe[]>([]);
    const [activeTab, setActiveTab] = useState<'recipes' | 'info'>('recipes');
    const [editForm, setEditForm]   = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]   = useState('');
    const [userName, setUserName]   = useState('');
    const [email, setEmail]         = useState('');

    useEffect(() => {
        if (userAuth?.first_name) {
            setFirstName(userAuth.first_name);
            setLastName(userAuth.last_name ?? '');
            setUserName(userAuth.username);
            setEmail(userAuth.email_address);
            getUserRecipes().then(setRecipies).catch(() => {});
        }
    }, [userAuth]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name === 'first_name')  setFirstName(value);
        if (name === 'last_name')   setLastName(value);
        if (name === 'username')    setUserName(value);
        if (name === 'email_adress') setEmail(value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement> | React.MouseEvent) {
        event.preventDefault?.();
        if (editForm && userAuth?.id) {
            const dataToSend: IUser = {
                id: userAuth.id,
                first_name: firstName,
                last_name: lastName,
                username: userName,
                email_address: email,
            };
            updateUser(dataToSend);
            setEditForm(false);
        }
    }

    function handleDeleteRecipe(recipeId: number) {
        fetchDeleteRecipe(recipeId)
            .then(() => getUserRecipes())
            .then(setRecipies)
            .catch(() => {});
    }

    if (!userAuth) {
        return (
            <div className="profile-unauthenticated">
                <p>Vous devez être connecté pour accéder à cette page.</p>
                <button onClick={() => navigate('/connexion')} className="btn-filled">
                    Se connecter
                </button>
            </div>
        );
    }

    const initials = (userAuth.first_name?.[0] ?? '') + (userAuth.last_name?.[0] ?? userAuth.username[0]);

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar">{initials.toUpperCase()}</div>
                <p className="profile-username">{userAuth.username}</p>
                <p className="profile-email">{userAuth.email_address}</p>
            </div>

            <div className="profile-tabs">
                <button
                    className={`tab-btn${activeTab === 'recipes' ? ' active' : ''}`}
                    onClick={() => setActiveTab('recipes')}
                >
                    Mes recettes
                </button>
                <button
                    className={`tab-btn${activeTab === 'info' ? ' active' : ''}`}
                    onClick={() => setActiveTab('info')}
                >
                    Mon profil
                </button>
            </div>

            {activeTab === 'recipes' && (
                <RecepiesTab
                    recipies={recipies}
                    handleDeleteRecipe={handleDeleteRecipe}
                    setRecipies={setRecipies}
                />
            )}

            {activeTab === 'info' && (
                <UserInfoForm
                    firstName={firstName}
                    lastName={lastName}
                    userName={userName}
                    email={email}
                    editForm={editForm}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit as any}
                    setEditForm={setEditForm}
                />
            )}

            <Encrage />
        </div>
    );
}

export default ProfilePage;
