import { CreatePostDto } from './dto/create-post.dto';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Post } from './schema/post.schema';
import { Notification } from 'src/user/schema/notification.schema';
import { AwsConfigService } from '../aws/aws.config';
export declare class PostService {
    private readonly awsConfigService;
    private userModel;
    private postModel;
    private notificationModel;
    [x: string]: any;
    constructor(awsConfigService: AwsConfigService, userModel: Model<User>, postModel: Model<Post>, notificationModel: Model<Notification>);
    uploadToS3(bucketName: string, key: string, data: Buffer): Promise<void>;
    create(createPostDto: CreatePostDto, file: any, response: any): Promise<any>;
    getAllPostList(userId: any, postListDto: any, response: any): Promise<any>;
    likeUnlikePost(likeDto: any, response: any): Promise<any>;
}
