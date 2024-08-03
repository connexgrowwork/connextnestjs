import { CreateUserDto, ProfileDto, SocialSignupLoginDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { Notification } from './schema/notification.schema';
export declare class UserService {
    private userModel;
    private notificationModel;
    constructor(userModel: Model<User>, notificationModel: Model<Notification>);
    create(createUserDto: CreateUserDto, response: any): Promise<any>;
    socialLoginSignup(socialLoginDto: SocialSignupLoginDto, response: any): Promise<any>;
    profileUpdate(userId: any, profileDto: ProfileDto, file: any, response: any): Promise<any>;
    getById(userId: any, response: any): Promise<any>;
    userFollow(followUnFollowDTO: any, response: any): Promise<any>;
    userUnFollow(UnFollowDTO: any, response: any): Promise<User>;
}
