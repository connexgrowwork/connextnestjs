export declare class CreateCommentDto {
    content: string;
    userId: string;
    postId: string;
}
export declare class CommentListDto {
    postId: string;
}
export declare class NotificationListDto {
    userId: string;
    limit: number;
    offset: number;
}
