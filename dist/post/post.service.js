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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const post_schema_1 = require("./schema/post.schema");
const notification_schema_1 = require("../user/schema/notification.schema");
const constants_1 = require("../utils/constants");
const AWS = require('aws-sdk');
let PostService = class PostService {
    constructor(userModel, postModel, notificationModel) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.notificationModel = notificationModel;
    }
    async create(createPostDto, file, response) {
        const findUser = await this.userModel.findOne({
            _id: createPostDto.userId,
        });
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
        const bucketName = process.env.BucketName;
        if (!bucketName) {
            console.error('Bucket name is not defined in environment variables');
            return response.json({
                status: false,
                message: 'Internal server error',
            });
        }
        if (file.length) {
            const uploadParams = {
                Bucket: bucketName,
                Key: `post/${Date.now()}_${file[0].originalname}`,
                Body: file[0].buffer,
                ContentType: file[0].mimetype,
            };
            const data = await s3.upload(uploadParams).promise();
            const savepost = await this.postModel.create({
                content: createPostDto?.content || '',
                imageUrl: data.Location,
                userId: createPostDto.userId,
            });
            return response.json({
                status: true,
                message: 'Post created successfully',
            });
        }
        else {
            const savepost = await this.postModel.create({
                content: createPostDto?.content || '',
                userId: createPostDto.userId,
            });
            return response.json({
                status: true,
                message: 'Post created successfully',
            });
        }
    }
    async getAllPostList(userId, postListDto, response) {
        console.log(userId);
        const limitNum = parseInt(postListDto.limit, 10) || 10;
        const page = postListDto.offset || 1;
        const offsetNum = (page - 1) * postListDto.limit || 0;
        const find = await this.postModel.find({
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        const posts = await this.postModel.aggregate([
            { $match: { userId: new mongoose_2.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'followUser',
                },
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    content: 1,
                    imageUrl: 1,
                    likes: { $size: '$likes' },
                    commentsCount: { $size: '$comments' },
                    user: { username: 1, profilePic: 1 },
                    isFollowing: {
                        $cond: {
                            if: {
                                $in: [userId, { $arrayElemAt: ['$followUser.followers', 0] }],
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
        ]);
        console.log('postspostspostsposts ', posts);
        return response.json({
            status: true,
            data: posts,
        });
        return posts;
    }
    async likeUnlikePost(likeDto, response) {
        const { isLike, PostId, userId } = likeDto;
        const post = await this.postModel.findById(PostId);
        if (!post) {
            return response.json({
                status: false,
                message: 'Post not found',
            });
        }
        const index = post.likes.indexOf(userId);
        if (isLike) {
            if (index === -1) {
                post.likes.push(userId);
            }
            const saveNotification = await this.notificationModel.create({
                text: constants_1.AllMESSAGES.LIKE,
                userId: userId,
            });
        }
        else {
            if (index !== -1) {
                post.likes.splice(index, 1);
            }
        }
        await post.save();
        return response.json({
            status: true,
            data: post,
        });
        return post;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(2, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PostService);
//# sourceMappingURL=post.service.js.map