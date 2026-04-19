import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { ICommentCard } from '../CommentComponent/Model/type';
import '../CommentComponent/CommentComponent.scss';
import { useAuthContext } from '../../../../Context/Authentification/useAuthContext';
import { axiosLoggedPostInstance } from '../../../../services/generalAxiosInstance';

interface ICommentCardProps {
    comment: ICommentCard;
    recipeId: number;
    onRefresh: () => void;
}

function CommentCard({ comment, recipeId, onRefresh }: ICommentCardProps) {
    const { userAuth, isAuth } = useAuthContext();
    const [isOwner, setIsOwner] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        if (isAuth && userAuth?.id) setIsOwner(userAuth.id === comment.user_id);
    }, [isAuth, userAuth, comment.user_id]);

    async function handleDelete() {
        await fetch(`/comment/${comment.id}`, { method: 'DELETE', credentials: 'include' });
        onRefresh();
    }

    async function handleReply(e: React.FormEvent) {
        e.preventDefault();
        if (!replyContent.trim() || !userAuth?.id) return;
        await axiosLoggedPostInstance.post('/comment', {
            content: replyContent,
            note: comment.note,
            user_id: userAuth.id,
            recipe_id: recipeId,
            parent_id: comment.id,
        });
        setReplyContent('');
        setShowReplyForm(false);
        onRefresh();
    }

    return (
        <div className="comment-card">
            <div className="comment-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Link to={`/profil/${comment.user_id}`} className="comment-author">
                        {comment.commentUser.username}
                    </Link>
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

            <div className="comment-actions">
                {isAuth && (
                    <button className="btn-sm" style={{ fontSize: '0.62rem' }} onClick={() => setShowReplyForm(v => !v)}>
                        Répondre
                    </button>
                )}
                {isOwner && (
                    <button className="btn-sm btn-sm-danger" style={{ fontSize: '0.62rem' }} onClick={handleDelete}>
                        Supprimer
                    </button>
                )}
            </div>

            {showReplyForm && (
                <form className="reply-form" onSubmit={handleReply}>
                    <textarea
                        placeholder="Votre réponse…"
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        rows={2}
                    />
                    <button type="submit" className="btn-sm">Publier</button>
                </form>
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div className="comment-replies">
                    {comment.replies.map(reply => (
                        <div key={reply.id} className="comment-reply">
                            <div className="comment-header">
                                <Link to={`/profil/${reply.user_id}`} className="comment-author" style={{ fontSize: '0.8rem' }}>
                                    {reply.commentUser.username}
                                </Link>
                                <span className="comment-date">
                                    {new Date(reply.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <p className="comment-content" style={{ fontSize: '0.88rem' }}>{reply.content}</p>
                            {isAuth && userAuth?.id === reply.user_id && (
                                <div className="comment-actions">
                                    <button className="btn-sm btn-sm-danger" style={{ fontSize: '0.62rem' }}
                                        onClick={async () => {
                                            await fetch(`/comment/${reply.id}`, { method: 'DELETE', credentials: 'include' });
                                            onRefresh();
                                        }}>
                                        Supprimer
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentCard;
