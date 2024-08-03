"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const constants_1 = require("../utils/constants");
const notification_schema_1 = require("./schema/notification.schema");
const AWS = require('aws-sdk');
let UserService = class UserService {
    constructor(userModel, notificationModel) {
        this.userModel = userModel;
        this.notificationModel = notificationModel;
    }
    async create(createUserDto, response) {
        const { email, bio, name, socialId, designation, social_url } = createUserDto;
        const existingUser = await this.userModel.findOne({
            socialId: socialId,
        });
        if (!existingUser) {
            return response.json({
                status: false,
                message: 'Invalid user',
            });
        }
        await this.userModel.updateOne({ socialId: socialId }, {
            email: email,
            bio: bio,
            username: name,
            designation: designation,
            isNew: 1,
        });
        return response.json({
            status: true,
            message: 'User registered successfully',
            userId: existingUser.id,
        });
    }
    async socialLoginSignup(socialLoginDto, response) {
        const { socialId, deviceToken } = socialLoginDto;
        if (!socialId) {
            return response.json({
                status: false,
                message: 'Social ID is required',
            });
        }
        let user = await this.userModel.findOne({ socialId: socialId });
        if (user) {
            return response.json({
                status: true,
                userId: user.id,
                isNew: user.isNew,
                socialId: socialId,
            });
        }
        else {
            user = await this.userModel.create({
                socialId: socialId,
                device_token: deviceToken,
            });
            return response.json({
                status: true,
                userId: user.id,
                isNew: user.isNew,
                socialId: socialId,
            });
        }
    }
    async profileUpdate(userId, profileDto, file, response) {
        const findUser = await this.userModel.findOne({ _id: userId });
        if (!findUser) {
            return response.json({
                status: false,
                message: 'User not found',
            });
        }
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        const s3 = new AWS.S3();
        console.log('Ssssssss', file);
        if (file.length) {
            const uploadParams = {
                Bucket: process.env.BucketName,
                Key: `images/${Date.now()}_${file[0].originalname}`,
                Body: file[0].buffer,
                ContentType: file[0].mimetype,
            };
            const data = await s3.upload(uploadParams).promise();
            await this.userModel.updateOne({ _id: userId }, {
                image: file ? data?.Location || '' : findUser ? findUser?.image : '',
            });
        }
        await this.userModel.updateOne({ _id: userId }, {
            name: profileDto.name,
            bio: profileDto.bio,
            social_url: profileDto?.socialUrl || '',
            designation: profileDto?.designation || findUser?.designation,
        });
        return response.json({
            status: true,
            message: 'Profile updated successfully',
        });
    }
    async getById(userId, response) {
        const result = await this.userModel.aggregate([
            { $match: { _id: new mongoose_2.Types.ObjectId(userId) } },
            {
                $project: {
                    username: { $ifNull: ['$username', ''] },
                    email: { $ifNull: ['$email', ''] },
                    bio: { $ifNull: ['$bio', ''] },
                    image: { $ifNull: ['$image', ''] },
                    followersCount: { $ifNull: [{ $size: '$followers' }, 0] },
                    followingCount: { $ifNull: [{ $size: '$following' }, 0] },
                    postsCount: { $ifNull: [{ $size: '$posts' }, 0] },
                },
            },
        ]);
        if (result.length === 0) {
            return response.json({
                status: false,
                message: 'User not found',
            });
        }
        return response.json({
            status: true,
            data: result,
        });
    }
    async userFollow(followUnFollowDTO, response) {
        const { userId, following } = followUnFollowDTO;
        if (userId === following) {
            return response.json({
                status: false,
                message: 'You cannot follow yourself',
            });
        }
        const user = await this.userModel.findById(userId);
        const followUser = await this.userModel.findById(following);
        if (!user || !followUser) {
            return response.json({
                status: false,
                message: 'User not found',
            });
        }
        if (user.following.includes(following)) {
            return response.json({
                status: false,
                message: 'You are already following this user',
            });
        }
        user.following.push(following);
        followUser.followers.push(userId);
        const saveNotification = await this.notificationModel.create({
            text: constants_1.AllMESSAGES.FOLLOW,
            userId: userId,
        });
        await user.save();
        await followUser.save();
        return response.json({
            status: true,
            message: user,
        });
    }
    async userUnFollow(UnFollowDTO, response) {
        const { userId, unFollowUserId } = UnFollowDTO;
        if (userId === unFollowUserId) {
            return response.json({
                status: false,
                message: 'You cannot unfollow yourself',
            });
        }
        const user = await this.userModel.findById(userId);
        const unFollowUser = await this.userModel.findById(unFollowUserId);
        if (!user || !unFollowUser) {
            return response.json({
                status: false,
                message: 'User not found',
            });
        }
        if (!user.following.includes(unFollowUserId)) {
            return response.json({
                status: false,
                message: 'You are not following this user',
            });
        }
        user.following = user.following.filter((id) => id.toString() !== unFollowUserId);
        unFollowUser.followers = unFollowUser.followers.filter((id) => id.toString() !== userId);
        await user.save();
        await unFollowUser.save();
        return response.json({
            status: true,
            data: user,
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map