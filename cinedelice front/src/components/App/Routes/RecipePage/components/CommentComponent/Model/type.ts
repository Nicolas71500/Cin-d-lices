export interface ICommentCard {
    id: number;
    content: string;
    note: number;
    recipe_id: number;
    user_id: number;
    commentUser: IUserComment;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUserComment {
    id: number;
    username: string;
}

export interface ICommentData {
    content: string;
    note: number;
    user_id: number;
    recipe_id: number;
}
