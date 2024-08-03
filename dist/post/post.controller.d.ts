import { PostService } from './post.service';
import { CreatePostDto, LikeDto, PostListDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, files: any, response: any): Promise<any>;
    getAllPostList(userId: string, postListDto: PostListDto, response: any): Promise<any>;
    likeUnlikePost(likeDto: LikeDto, response: any): Promise<any>;
}
