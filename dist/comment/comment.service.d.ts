import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Post } from 'src/post/schema/post.schema';
import { Comment } from './schema/comment.schema';
import { Notification } from 'src/user/schema/notification.schema';
export declare class CommentService {
    private userModel;
    private postModel;
    private commentModel;
    private notificationModel;
    constructor(userModel: Model<User>, postModel: Model<Post>, commentModel: Model<Comment>, notificationModel: Model<Notification>);
    addComment(createCommentDto: CreateCommentDto, response: any): Promise<any>;
    findAll(commentListDto: any, response: any): Promise<any>;
    findAllList(commentListDto: any, response: any): Promise<any>;
    update(id: number, updateCommentDto: UpdateCommentDto): string;
    remove(id: number): string;
}
