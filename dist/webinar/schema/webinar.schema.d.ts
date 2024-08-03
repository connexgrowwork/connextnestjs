import mongoose from 'mongoose';
export declare class Webinar {
    fullName: string;
    isActive: number;
    description: string;
    startDate: string;
    image: string;
    endDate?: string;
    paymentUrl?: string;
}
export declare const WebinarSchema: mongoose.Schema<Webinar, mongoose.Model<Webinar, any, any, any, mongoose.Document<unknown, any, Webinar> & Webinar & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Webinar, mongoose.Document<unknown, {}, mongoose.FlatRecord<Webinar>> & mongoose.FlatRecord<Webinar> & {
    _id: Types.ObjectId;
}>;
