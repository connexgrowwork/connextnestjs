import mongoose, { ObjectId } from 'mongoose';
export type CommentDocument = Comment & Document;
export declare class Comment {
    postId: ObjectId;
    userId: ObjectId;
    content: string;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Comment & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & mongoose.FlatRecord<Comment> & {
    _id: Types.ObjectId;
}>;
