import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { ICommentCard } from '../CommentComponent/Model/type';
import '../CommentComponent/CommentComponent.scss';
import { useAuthContext } from '../../../../Context/Authentification/useAuthContext';

interface ICommentCardProps {
    comment: ICommentCard;
}

function CommentCard({ comment }: ICommentCardProps) {
    const { userAuth, isAuth } = useAuthContext();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (isAuth && userAuth?.id) {
            setIsOwner(userAuth.id === comment.user_id);
        }
    }, [isAuth, userAuth, comment.user_id]);

    return (
        <div className="comment-card">
            <div className="comment-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="comment-author">{comment.commentUser.username}</span>
                    <StarRatings
                        rating={comment.note}
                        starRatedColor="#d4a843"
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="1px"
                    />
                </div>
                <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
            </div>

            <p className="comment-content">{comment.content}</p>

            {isOwner && (
                <div className="comment-actions">
                    <button className="btn-sm btn-sm-danger" style={{ fontSize: '0.65rem' }}>Supprimer</button>
                </div>
            )}
        </div>
    );
}

export default CommentCard;
