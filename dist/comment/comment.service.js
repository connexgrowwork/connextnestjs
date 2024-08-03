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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const post_schema_1 = require("../post/schema/post.schema");
const comment_schema_1 = require("./schema/comment.schema");
const notification_schema_1 = require("../user/schema/notification.schema");
const constants_1 = require("../utils/constants");
let CommentService = class CommentService {
    constructor(userModel, postModel, commentModel, notificationModel) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.commentModel = commentModel;
        this.notificationModel = notificationModel;
    }
    async addComment(createCommentDto, response) {
        const createdComment = new this.commentModel(createCommentDto);
        const savedComment = await createdComment.save();
        const post = await this.postModel.findById(createCommentDto.postId);
        post.comments.push(savedComment._id);
        await post.save();
        const saveNotification = await this.notificationModel.create({
            text: constants_1.AllMESSAGES.COMMENT,
            userId: createCommentDto.userId,
        });
        return response.json({
            status: true,
            data: savedComment,
        });
    }
    async findAll(commentListDto, response) {
        const { postId } = commentListDto;
        const limit = 2;
        const offset = 0;
        const post = await this.postModel
            .findById(postId)
            .populate({
            path: 'comments',
            options: {
                limit: limit,
                skip: offset,
            },
            populate: {
                path: 'userId',
                select: 'username image',
            },
        })
            .exec();
        if (!post) {
            return response.json({
                status: false,
                data: [],
                message: 'No record found',
            });
        }
        return response.json({
            status: true,
            data: post?.comments || [],
        });
    }
    async findAllList(commentListDto, response) {
        const { userId, limit = 10, offset = 0 } = commentListDto;
        const findList = await this.notificationModel
            .aggregate([
            { $match: { userId: new mongoose_2.Types.ObjectId(userId) } },
            {
                $project: {
                    text: 1,
                    createdAt: 1,
                    relativeTime: {
                        $let: {
                            vars: {
                                diffInMillis: {
                                    $dateDiff: {
                                        startDate: '$createdAt',
                                        endDate: '$$NOW',
                                        unit: 'millisecond'
                                    }
                                }
                            },
                            in: {
                                $switch: {
                                    branches: [
                                        {
                                            case: { $lt: ['$$diffInMillis', 1000 * 60] },
                                            then: 'just now'
                                        },
                                        {
                                            case: { $lt: ['$$diffInMillis', 1000 * 60 * 60] },
                                            then: {
                                                $concat: [
                                                    { $toString: { $trunc: { $divide: ['$$diffInMillis', 1000 * 60] } } },
                                                    ' minutes ago'
                                                ]
                                            }
                                        },
                                        {
                                            case: { $lt: ['$$diffInMillis', 1000 * 60 * 60 * 24] },
                                            then: {
                                                $concat: [
                                                    { $toString: { $trunc: { $divide: ['$$diffInMillis', 1000 * 60 * 60] } } },
                                                    ' hours ago'
                                                ]
                                            }
                                        },
                                        {
                                            case: { $lt: ['$$diffInMillis', 1000 * 60 * 60 * 24 * 7] },
                                            then: {
                                                $concat: [
                                                    { $toString: { $trunc: { $divide: ['$$diffInMillis', 1000 * 60 * 60 * 24] } } },
                                                    ' days ago'
                                                ]
                                            }
                                        }
                                    ],
                                    default: {
                                        $concat: [
                                            { $toString: { $trunc: { $divide: ['$$diffInMillis', 1000 * 60 * 60 * 24 * 7] } } },
                                            ' weeks ago'
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            },
        ])
            .exec();
        return response.json({
            status: true,
            data: findList,
        });
    }
    update(id, updateCommentDto) {
        return `This action updates a #${id} comment`;
    }
    remove(id) {
        return `This action removes a #${id} comment`;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(2, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(3, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CommentService);
//# sourceMappingURL=comment.service.js.map