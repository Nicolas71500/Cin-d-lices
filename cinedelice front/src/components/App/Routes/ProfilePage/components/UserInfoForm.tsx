import React, { useState } from 'react';
import { UserInfoFormProps } from '../models';
import InputField from './InputField';
import UpdatePassword from './UpdatePassword';

const UserInfoForm: React.FC<UserInfoFormProps> = ({
    firstName, lastName, userName, email,
    editForm, onChange, onSubmit, setEditForm,
}) => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!editForm) {
            setEditForm(true);
        } else {
            onSubmit(e as any);
        }
    };

    return (
        <>
            <form className="profile-form-card" onSubmit={onSubmit}>
                <p className="profile-section-title">Informations personnelles</p>

                <div className="profile-fields">
                    <InputField label="Prénom" type="text" name="first_name" value={firstName} onChange={onChange} disabled={!editForm} />
                    <InputField label="Nom" type="text" name="last_name" value={lastName} onChange={onChange} disabled={!editForm} />
                    <InputField label="Pseudo" type="text" name="username" value={userName} onChange={onChange} disabled={!editForm} />
                    <InputField label="Adresse e-mail" type="email" name="email_adress" value={email} onChange={onChange} disabled={!editForm} />
                </div>

                <div className="profile-form-actions">
                    <button type="button" className={editForm ? 'btn-filled' : ''} onClick={handleClick}>
                        {editForm ? 'Enregistrer les modifications' : 'Modifier mes informations'}
                    </button>
                    <button type="button" className="btn-danger" onClick={() => setShowPasswordModal(true)}>
                        Modifier mon mot de passe
                    </button>
                </div>
            </form>

            {showPasswordModal && <UpdatePassword seeModal={() => setShowPasswordModal(false)} />}
        </>
    );
};

export default UserInfoForm;
