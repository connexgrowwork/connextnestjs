export declare class CreatePostDto {
    content: string;
    userId: string;
    image: Express.Multer.File;
}
export declare class PostListDto {
    limit: string;
    offset: string;
    search: string;
}
export declare class LikeDto {
    isLike: number;
    PostId: string;
    userId: string;
}
