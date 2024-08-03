/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Post } from 'src/post/schema/post.schema';
import { Comment } from './schema/comment.schema';
import { Notification } from 'src/user/schema/notification.schema';
import { AllMESSAGES } from 'src/utils/constants';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async addComment(createCommentDto: CreateCommentDto, response) {
    const createdComment = new this.commentModel(createCommentDto);
    const savedComment = await createdComment.save();

    const post = await this.postModel.findById(createCommentDto.postId);
    post.comments.push(savedComment._id);
    await post.save();

    // console.log(AllMESSAGES.LIKE);

    const saveNotification = await this.notificationModel.create({
      text: AllMESSAGES.COMMENT,
      userId: createCommentDto.userId,
    });

    return response.json({
      status: true,
      data: savedComment,
    });
  }

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
      // throw new NotFoundException('Post not found');
    }
    return response.json({
      status: true,
      data: post?.comments || [],
    });
  }

  async findAllList(commentListDto, response) {
    const { userId, limit = 10, offset = 0 } = commentListDto;

    // const findList = await this.notificationModel
    //   .find({ userId })
    //   .select('text createdAt')
    //   .limit(limit)
    //   .skip(offset)
    //   .exec();
    // const findList = await this.notificationModel
    //   .aggregate([
    //     { $match: { userId: new Types.ObjectId(userId) } },
    //     {
    //       $project: {
    //         text: 1,
    //         createdAt: 1,
    //         relativeTime: {
    //           $let: {
    //             vars: {
    //               diffInMillis: {
    //                 $dateDiff: {
    //                   startDate: '$createdAt',
    //                   endDate: '$$NOW',
    //                   unit: 'millisecond',
    //                 },
    //               },
    //             },
    //             in: {
    //               $switch: {
    //                 branches: [
    //                   {
    //                     case: { $lt: ['$$diffInMillis', 1000 * 60] },
    //                     then: 'just now',
    //                   },
    //                   {
    //                     case: { $lt: ['$$diffInMillis', 1000 * 60 * 60] },
    //                     then: {
    //                       $concat: [
    //                         {
    //                           $toString: {
    //                             $divide: ['$$diffInMillis', 1000 * 60],
    //                           },
    //                         },
    //                         ' minutes ago',
    //                       ],
    //                     },
    //                   },
    //                   {
    //                     case: { $lt: ['$$diffInMillis', 1000 * 60 * 60 * 24] },
    //                     then: {
    //                       $concat: [
    //                         {
    //                           $toString: {
    //                             $divide: ['$$diffInMillis', 1000 * 60 * 60],
    //                           },
    //                         },
    //                         ' hours ago',
    //                       ],
    //                     },
    //                   },
    //                   {
    //                     case: {
    //                       $lt: ['$$diffInMillis', 1000 * 60 * 60 * 24 * 7],
    //                     },
    //                     then: {
    //                       $concat: [
    //                         {
    //                           $toString: {
    //                             $divide: [
    //                               '$$diffInMillis',
    //                               1000 * 60 * 60 * 24,
    //                             ],
    //                           },
    //                         },
    //                         ' days ago',
    //                       ],
    //                     },
    //                   },
    //                 ],
    //                 default: {
    //                   $concat: [
    //                     {
    //                       $toString: {
    //                         $divide: [
    //                           '$$diffInMillis',
    //                           1000 * 60 * 60 * 24 * 7,
    //                         ],
    //                       },
    //                     },
    //                     ' weeks ago',
    //                   ],
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //     // { $limit: limit },
    //     // { $skip: offset }
    //   ])
      // .exec();
      const findList = await this.notificationModel
      .aggregate([
        { $match: { userId :new Types.ObjectId(userId) } },
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
        // { $limit: limit },
        // { $skip: offset }
      ])
      .exec();
    
    return response.json({
      status: true,
      data: findList,
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
