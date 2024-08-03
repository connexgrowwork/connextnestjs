import { WebinarService } from './webinar.service';
import { CreateWebinarDto } from './dto/create-webinar.dto';
export declare class WebinarController {
    private readonly webinarService;
    constructor(webinarService: WebinarService);
    create(createWebinarDto: CreateWebinarDto, files: any, response: any): Promise<any>;
    findAll(response: any): Promise<any>;
    deleteWebinar(webinarId: string, response: any): Promise<any>;
}
