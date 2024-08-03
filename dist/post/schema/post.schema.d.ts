import mongoose, { Types } from 'mongoose';
export declare class Post {
    userId: Types.ObjectId[];
    content: string;
    imageUrl?: string;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, mongoose.Document<unknown, any, Post> & Post & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, mongoose.Document<unknown, {}, mongoose.FlatRecord<Post>> & mongoose.FlatRecord<Post> & {
    _id: Types.ObjectId;
}>;
