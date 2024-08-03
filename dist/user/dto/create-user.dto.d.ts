export declare class CreateUserDto {
    name: string;
    email: string;
    social_url: string;
    designation: string;
    socialId: string;
    bio: string;
}
export declare class LoginUserDto {
    email: string;
    deviceToken: string;
    password: string;
}
export declare class ProfileDto {
    name: string;
    bio: string;
    designation: string;
    socialUrl: string;
    image: Express.Multer.File;
}
export declare class SocialSignupLoginDto {
    socialId: string;
    deviceToken: string;
}
export declare class FollowDTO {
    userId: string;
    following: string;
}
export declare class UnFollowDTO {
    userId: string;
    unFollowUserId: string;
}
