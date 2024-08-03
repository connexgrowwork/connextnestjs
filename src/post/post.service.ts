/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Post } from './schema/post.schema';
import { Notification } from 'src/user/schema/notification.schema';
import { AllMESSAGES } from 'src/utils/constants';
const AWS = require('aws-sdk');
require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const { fromEnv } = require('@aws-sdk/credential-provider-env');
import { fromEnv } from '@aws-sdk/credential-provider-env';

const someName = 'connexbucket';
@Injectable()
export class PostService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async create(createPostDto: CreatePostDto, file, response) {
    console.log('process.env.AWS_REGION', process.env.AWS_REGION);
    console.log('process.env.BucketName', process.env.BucketName);
    console.log('process.env', process.env);
    try {
      const findUser = await this.userModel.findOne({
        _id: createPostDto.userId,
      });

      if (!findUser) {
        return response.json({
          status: false,
          message: 'User not found',
        });
      }

      const s3 = new S3Client({
        region: 'eu-north-1',
        // region: process.env.AWS_REGION,
        credentials: fromEnv(),
      });

      if (file.length) {
        const uploadParams = {
          Bucket: 'connexbucket', // Ensure this is set correctly in your environment variables
          // Bucket: process.env.BucketName, // Ensure this is set correctly in your environment variables
          Key: `post/${Date.now()}_${file[0].originalname}`,
          Body: file[0].buffer,
          ContentType: file[0].mimetype,
        };
        const command = new PutObjectCommand(uploadParams);
        const data = await s3.send(command);
        const imageUrl = `https://${'connexbucket'}.s3.${'eu-north-1'}.amazonaws.com/${uploadParams.Key}`;

        const savepost = await this.postModel.create({
          content: createPostDto?.content || '',
          imageUrl: imageUrl,
          userId: createPostDto.userId,
        });

        return response.json({
          status: true,
          message: 'Post created successfully',
        });
      } else {
        const savepost = await this.postModel.create({
          content: createPostDto?.content || '',
          userId: createPostDto.userId,
          imageUrl: '',
        });

        return response.json({
          status: true,
          message: 'Post created successfully',
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      return response.status(500).json({
        status: false,
        message: 'Internal server error',
      });
    }
  }
  // async create(createPostDto: CreatePostDto, file, response) {
  //   const findUser = await this.userModel.findOne({
  //     _id: createPostDto.userId,
  //   });

  //   if (!findUser) {
  //     return response.json({
  //       status: false,
  //       message: 'User not found',
  //     });
  //   }

  //   AWS.config.update({
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //     region: process.env.AWS_REGION,
  //   });

  //   // const s3 = new AWS.S3();

  //   const s3 = new S3Client({
  //     region: process.env.AWS_REGION,
  //     credentials: fromEnv(),
  //     endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
  //   });
  //   console.log('Ssssssss', file);
  //   // const bucketName = process.env.BucketName;
  //   // if (!bucketName) {
  //   //   console.error('Bucket name is not defined in environment variables');
  //   //   return response.json({
  //   //     status: false,
  //   //     message: 'Internal server error',
  //   //   });
  //   // }
  //   // if (createPostDto.content == '') {

  //   // }
  //   if (file.length) {
  //     // const uploadParams = {
  //     //   Bucket: someName,
  //     //   Key: `post/${Date.now()}_${file[0].originalname}`,
  //     //   Body: file[0].buffer,
  //     //   // ACL: 'public-read', // Adjust based on your requirements
  //     //   ContentType: file[0].mimetype,
  //     // };
  //     const uploadParams = {
  //       Bucket: someName,
  //       Key: `post/${Date.now()}_${file[0].originalname}`,
  //       Body: file[0].buffer,
  //       ContentType: file[0].mimetype,
  //     };
  //     // const data = await s3.upload(uploadParams).promise();
  //     const command = new PutObjectCommand(uploadParams);
  //     const data = await s3.send(command);
  //     const imageUrl = `https://${someName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

  //     const savepost = await this.postModel.create({
  //       content: createPostDto?.content || '',
  //       imageUrl: imageUrl,
  //       userId: createPostDto.userId,
  //     });

  //     return response.json({
  //       status: true,
  //       message: 'Post created successfully',
  //     });
  //   } else {
  //     const savepost = await this.postModel.create({
  //       content: createPostDto?.content || '',
  //       userId: createPostDto.userId,
  //       imageUrl: '',
  //     });

  //     return response.json({
  //       status: true,
  //       message: 'Post created successfully',
  //     });
  //   }
  // }

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async getAllPostList(userId, postListDto, response) {
    console.log(userId);
    const limitNum = parseInt(postListDto.limit, 10) || 10;
    const page = postListDto.offset || 1;

    const offsetNum = (page - 1) * postListDto.limit || 0;

    const find = await this.postModel.find({
      userId: new Types.ObjectId(userId),
    });
    // Aggregate query to get posts with additional details
    const posts = await this.postModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
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
          from: 'users', // The collection name for User (to check follow status)
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
          likes: { $size: '$likes' }, // Count likes
          commentsCount: { $size: '$comments' }, // Count comments
          user: { username: 1, profilePic: 1 }, // Assuming User schema has username and profilePic
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
      // { $skip: offsetNum },
      // { $limit: limitNum },
    ]);
    // const { limit = '10', offset = '0', search = '' } = postListDto;

    // const userObjectId = new Types.ObjectId(userId);

    // const posts = await this.postModel.aggregate([
    //   // {
    //   //   $match: {
    //   //     ...(search ? { content: { $regex: search, $options: 'i' } } : {}),
    //   //   },
    //   // },
    //   {
    //     $lookup: {
    //       from: 'users', // Replace with the actual collection name
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'author',
    //     },
    //   },
    //   {
    //     $unwind: '$author',
    //   },
    //   {
    //     $addFields: {
    //       isFollowing: {
    //         $cond: {
    //           if: { $in: [userObjectId, '$author.followers'] },
    //           then: true,
    //           else: false,
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'comments', // Replace with the actual collection name
    //       localField: '_id',
    //       foreignField: 'postId',
    //       as: 'comments',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       commentCount: { $size: '$comments' },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'likes', // Replace with the actual collection name
    //       localField: '_id',
    //       foreignField: 'postId',
    //       as: 'likes',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       likeCount: { $size: '$likes' },
    //     },
    //   },
    //   {
    //     $project: {
    //       content: 1,
    //       imageUrl: 1,
    //       'author._id': 1,
    //       'author.username': 1,
    //       'author.profilePicture': 1,
    //       likeCount: 1,
    //       commentCount: 1,
    //       isFollowing: 1,
    //     },
    //   },
    //   // {
    //   //   $skip: parseInt(offset, 10),
    //   // },
    //   // {
    //   //   $limit: parseInt(limit, 10),
    //   // },
    // ]);
    console.log('postspostspostsposts ', posts);
    return response.json({
      status: true,
      data: posts,
    });
    return posts;
  }

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  async likeUnlikePost(likeDto, response) {
    const { isLike, PostId, userId } = likeDto;

    const post = await this.postModel.findById(PostId);
    if (!post) {
      return response.json({
        status: false,
        message: 'Post not found',
      });
    }

    const index = post.likes.indexOf(userId as unknown as Types.ObjectId);

    if (isLike) {
      if (index === -1) {
        post.likes.push(userId as unknown as Types.ObjectId);
      }

      const saveNotification = await this.notificationModel.create({
        text: AllMESSAGES.LIKE,
        userId: userId,
      });
    } else {
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
    // }
  }
}
