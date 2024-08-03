import { CommentService } from './comment.service';
import { CommentListDto, CreateCommentDto, NotificationListDto } from './dto/create-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, response: any): Promise<any>;
    findAll(commentListDto: CommentListDto, response: any): Promise<any>;
    findAllList(commentListDto: NotificationListDto, response: any): Promise<any>;
}
