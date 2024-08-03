import { CreatePostDto } from './dto/create-post.dto';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Post } from './schema/post.schema';
import { Notification } from 'src/user/schema/notification.schema';
export declare class PostService {
    private userModel;
    private postModel;
    private notificationModel;
    constructor(userModel: Model<User>, postModel: Model<Post>, notificationModel: Model<Notification>);
    create(createPostDto: CreatePostDto, file: any, response: any): Promise<any>;
    getAllPostList(userId: any, postListDto: any, response: any): Promise<any>;
    likeUnlikePost(likeDto: any, response: any): Promise<any>;
}
