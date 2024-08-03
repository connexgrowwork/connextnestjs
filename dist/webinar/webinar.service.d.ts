import { CreateWebinarDto } from './dto/create-webinar.dto';
import { Model } from 'mongoose';
import { Webinar } from './schema/webinar.schema';
export declare class WebinarService {
    private webinarModel;
    constructor(webinarModel: Model<Webinar>);
    create(createWebinarDto: CreateWebinarDto, file: any, response: any): Promise<any>;
    findAll(response: any): Promise<any>;
    deleteWebinar(webinarId: any, response: any): Promise<any>;
}
