import { UserService } from './user.service';
import { CreateUserDto, FollowDTO, ProfileDto, SocialSignupLoginDto, UnFollowDTO } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, response: any): Promise<any>;
    socialLoginSignup(socialLoginDto: SocialSignupLoginDto, response: any): Promise<any>;
    profileUpdate(userId: string, profileDto: ProfileDto, files: any, response: any): Promise<any>;
    getById(userId: string, response: any): Promise<any>;
    userFollow(followUnFollowDTO: FollowDTO, response: any): Promise<any>;
    userUnFollow(unFollowDTO: UnFollowDTO, response: any): Promise<import("./schema/user.schema").User>;
}
