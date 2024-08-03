import mongoose, { ObjectId } from 'mongoose';
export declare class Notification {
    text: string;
    isActive: number;
    userId: ObjectId;
}
export declare const NotificationSchema: mongoose.Schema<Notification, mongoose.Model<Notification, any, any, any, mongoose.Document<unknown, any, Notification> & Notification & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Notification, mongoose.Document<unknown, {}, mongoose.FlatRecord<Notification>> & mongoose.FlatRecord<Notification> & {
    _id: Types.ObjectId;
}>;
