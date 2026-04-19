import { useState } from 'react';
import { updatePassword } from '../services';
import InputField from './InputField';
import { toast } from 'react-toastify';

interface UpdatePasswordProps {
    seeModal: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ seeModal }) => {
    const [oldPassword, setOldPassword]         = useState('');
    const [newPassword, setNewPassword]         = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError]                     = useState('');

    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const response = await updatePassword(oldPassword, newPassword, confirmPassword);
            if (response?.status === 204) {
                setError('');
                toast.success('Mot de passe mis à jour avec succès.');
                seeModal();
            } else if (response?.status === 400) {
                toast.error('Ancien mot de passe incorrect.');
            } else if (response?.status === 404) {
                toast.error('Utilisateur non trouvé.');
            } else {
                toast.error('Une erreur est survenue. Veuillez réessayer.');
            }
        } catch {
            toast.error('Erreur lors de la mise à jour du mot de passe.');
        }
    };

    return (
        <div className="password-modal-overlay" onClick={seeModal}>
            <div className="password-modal-box" onClick={e => e.stopPropagation()}>
                <p className="password-modal-title">Modifier le mot de passe</p>

                <div className="password-fields">
                    <InputField
                        label="Ancien mot de passe"
                        type="password"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        disabled={false}
                    />
                    <InputField
                        label="Nouveau mot de passe"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        disabled={false}
                    />
                    <InputField
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        disabled={false}
                    />
                    {error && <span className="field-error">{error}</span>}
                </div>

                <div className="password-modal-actions">
                    <button className="btn-filled" onClick={handlePasswordUpdate}>Modifier</button>
                    <button onClick={seeModal}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
