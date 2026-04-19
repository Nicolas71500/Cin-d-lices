import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CommentCard from '../CommentPart/CommentCard';
import { useAuthContext } from '../../../../Context/Authentification/useAuthContext';
import { ICommentCard } from './Model/type';
import { fetchComments, postNewComment } from './services/APIcall';
import StarRatings from 'react-star-ratings';
import './CommentComponent.scss';

interface CommentComponentProps {
    recipeId: number;
}

function CommentComponent({ recipeId }: CommentComponentProps) {
    const [commentContent, setCommentContent] = useState('');
    const [commentNote, setCommentNote]       = useState(0);
    const [commentData, setCommentData]       = useState<ICommentCard[] | null>(null);
    const [error, setError]                   = useState<string | null>(null);
    const [starsClicked, setStarsClicked]     = useState(false);
    const { userAuth, isAuth } = useAuthContext();

    useEffect(() => {
        fetchComments(recipeId).then(setCommentData);
    }, [recipeId]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!userAuth?.id) return;

        if (!commentNote || !commentContent.trim()) {
            setError('Attribuez une note et écrivez votre commentaire.');
            return;
        }
        setError(null);

        postNewComment({ content: commentContent, note: commentNote, user_id: userAuth.id, recipe_id: recipeId })
            .then(() => {
                setCommentContent('');
                setCommentNote(0);
                return fetchComments(recipeId);
            })
            .then(setCommentData);
    }

    function handleClickStars() {
        if (isAuth) return;
        setStarsClicked(true);
        setTimeout(() => setStarsClicked(false), 3000);
    }

    if (!commentData) return null;

    return (
        <section className="comments-section">
            <p className="comments-section-title">Commentaires ({commentData.length})</p>

            {commentData.length === 0 && (
                <p className="comments-empty">Soyez le premier à commenter cette recette.</p>
            )}

            {commentData.map(comment => (
                <CommentCard key={comment.id} comment={comment} />
            ))}

            <p className="comment-form-title">Laisser un commentaire</p>
            <form className="comment-form" onSubmit={handleSubmit}>
                <div className="star-wrapper" onClick={handleClickStars}>
                    <StarRatings
                        name="note"
                        rating={commentNote}
                        starRatedColor="#d4a843"
                        starHoverColor="#d4a843"
                        numberOfStars={5}
                        starDimension="28px"
                        starSpacing="2px"
                        changeRating={isAuth && userAuth ? setCommentNote : undefined}
                    />
                    {!isAuth && starsClicked && (
                        <span className="error-message-stars">
                            Connectez-vous pour laisser un avis.
                        </span>
                    )}
                </div>

                <textarea
                    placeholder={isAuth ? 'Écrivez votre commentaire…' : 'Connectez-vous pour laisser un commentaire.'}
                    value={commentContent}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentContent(e.target.value)}
                    disabled={!isAuth || !userAuth}
                />

                {error && <span className="comment-error">{error}</span>}

                {isAuth && userAuth && (
                    <div>
                        <button type="submit" className="btn-filled" style={{ fontSize: '0.82rem' }}>
                            Publier
                        </button>
                    </div>
                )}
            </form>
        </section>
    );
}

export default CommentComponent;
