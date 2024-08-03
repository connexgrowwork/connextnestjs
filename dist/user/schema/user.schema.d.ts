import mongoose, { Types } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    username: string;
    email: string;
    password: string;
    socialId: string;
    social_url: string;
    isNew: number;
    device_token: string;
    designation: string;
    bio: string;
    image: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    posts: Types.ObjectId[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, never, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, never>;
