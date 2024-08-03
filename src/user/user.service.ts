/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  ProfileDto,
  SocialSignupLoginDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AllMESSAGES } from 'src/utils/constants';
import { Notification } from './schema/notification.schema';
const AWS = require('aws-sdk');
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async create(createUserDto: CreateUserDto, response) {
    const { email, bio, name, socialId, designation, social_url } =
      createUserDto;

    const existingUser: any = await this.userModel.findOne({
      socialId: socialId,
    });
    if (!existingUser) {
      return response.json({
        status: false,
        message: 'Invalid user',
      });
    }

    await this.userModel.updateOne(
      { socialId: socialId },
      {
        email: email,
        bio: bio,
        username: name,
        designation: designation,
        isNew: 1,
      },
    );

    return response.json({
      status: true,
      message: 'User registered successfully',
      userId: existingUser.id,
    });
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // async loginFun(loginUserDto, response) {
  //   const { email, password } = loginUserDto;
  //   // Check if the email exists
  //   const user: any = await this.userModel.findOne({ email });
  //   if (!user) {
  //     return response.json({
  //       status: false,
  //       message: 'User not found',
  //     });
  //   }

  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid) {
  //     return response.json({
  //       status: false,
  //       message: 'Invalid credentials',
  //     });
  //   }

  //   const updateToken = await this.userModel.updateOne(
  //     { _id: user._id },
  //     { device_token: loginUserDto.deviceToken },
  //   );
  //   return response.json({
  //     status: true,
  //     userId: user._id,
  //     message: 'Login successful',
  //   });
  // }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async socialLoginSignup(socialLoginDto: SocialSignupLoginDto, response) {
    const { socialId, deviceToken } = socialLoginDto;
    if (!socialId) {
      return response.json({
        status: false,
        message: 'Social ID is required',
      });
    }

    let user: any = await this.userModel.findOne({ socialId: socialId });
    if (user) {
      return response.json({
        status: true,
        userId: user.id,
        isNew: user.isNew,
        socialId: socialId,
      });
      // return { userId: user.id };
    } else {
      // User not found, create a new account
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
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async profileUpdate(userId, profileDto: ProfileDto, file, response) {
    const findUser: any = await this.userModel.findOne({ _id: userId });

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
        // ACL: 'public-read', // Adjust based on your requirements
        ContentType: file[0].mimetype,
      };
      const data = await s3.upload(uploadParams).promise();
      await this.userModel.updateOne(
        { _id: userId },
        {
          image: file ? data?.Location || '' : findUser ? findUser?.image : '',
        },
      );
    }

    // console.log('ssssssss', data.Location);
    await this.userModel.updateOne(
      { _id: userId },
      {
        name: profileDto.name,
        bio: profileDto.bio,
        social_url: profileDto?.socialUrl || '',
        designation: profileDto?.designation || findUser?.designation,
      },
    );
    return response.json({
      status: true,
      message: 'Profile updated successfully',
    });
  }
  //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async getById(userId, response) {
    const result = await this.userModel.aggregate([
      { $match: { _id: new Types.ObjectId(userId) } },
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
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async userFollow(followUnFollowDTO, response) {
    const { userId, following } = followUnFollowDTO;

    if (userId === following) {
      return response.json({
        status: false,
        message: 'You cannot follow yourself',
      });
    }

    const user: any = await this.userModel.findById(userId);
    const followUser: any = await this.userModel.findById(following);

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
      text: AllMESSAGES.FOLLOW,
      userId: userId,
    });

    await user.save();
    await followUser.save();
    return response.json({
      status: true,
      message: user,
    });
    // const { userId, following } = followUnFollowDTO;

    // console.log(userId, following);
    // const user: any = await this.userModel.findById(userId);
    // const followUser: any = await this.userModel.findById(following);

    // if (!user || !followUser) {
    //   return response.json({
    //     status: false,
    //     message: 'User not found',
    //   });
    // }

    // if (user.following.includes(following)) {
    //   return response.json({
    //     status: false,
    //     message: 'You are already following this user',
    //   });
    // }

    // user.following.push(following);
    // followUser.followers.push(userId);

    // await user.save();
    // await followUser.save();

    // return response.json({
    //   status: true,
    //   message: user,
    // });

    // return response user;
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async userUnFollow(UnFollowDTO, response): Promise<User> {
    // userId: string, unfollowUserId: string
    const { userId, unFollowUserId } = UnFollowDTO;

    if (userId === unFollowUserId) {
      return response.json({
        status: false,
        message: 'You cannot unfollow yourself',
      });
      // throw new ConflictException('');
    }

    const user: any = await this.userModel.findById(userId);
    const unFollowUser: any = await this.userModel.findById(unFollowUserId);

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

    user.following = user.following.filter(
      (id) => id.toString() !== unFollowUserId,
    );
    unFollowUser.followers = unFollowUser.followers.filter(
      (id) => id.toString() !== userId,
    );

    await user.save();
    await unFollowUser.save();

    return response.json({
      status: true,
      data: user,
    });
    // return user;
  }
}
