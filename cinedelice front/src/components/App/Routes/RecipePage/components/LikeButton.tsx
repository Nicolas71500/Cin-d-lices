import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './LikeButton.scss';

interface LikeButtonProps {
    handleLikeRecipeButton: () => void;
    userLikedIt: boolean;
    isAuth: boolean;
}

function LikeButton({ handleLikeRecipeButton, userLikedIt, isAuth }: LikeButtonProps) {
    const [showHint, setShowHint] = useState(false);

    function handleClick() {
        if (!isAuth) {
            setShowHint(true);
            setTimeout(() => setShowHint(false), 3000);
            return;
        }
        handleLikeRecipeButton();
    }

    return (
        <div className="like-button-wrapper">
            <button
                className={`like-btn${userLikedIt ? ' like-btn--active' : ''}`}
                onClick={handleClick}
                title={userLikedIt ? "Retirer mon like" : "J'aime cette recette"}
            >
                <FontAwesomeIcon icon={faHeart} style={{ opacity: userLikedIt ? 1 : 0.4 }} />
                {userLikedIt ? "Je n'aime plus" : "J'aime"}
            </button>
            {showHint && (
                <span className="like-hint">Connectez-vous pour aimer cette recette.</span>
            )}
        </div>
    );
}

export default LikeButton;
