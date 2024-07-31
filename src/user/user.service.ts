/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto, ProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model ,Types} from 'mongoose';
import * as bcrypt from 'bcryptjs';
const AWS = require('aws-sdk');
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async create(createUserDto: CreateUserDto, response) {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      return response.json({
        status: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return response.json({
      status: true,
      message: 'User created successfully',
      userId: newUser.id,
    });
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async loginFun(loginUserDto, response) {
    const { email, password } = loginUserDto;
    // Check if the email exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return response.json({
        status: false,
        message: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.json({
        status: false,
        message: 'Invalid credentials',
      });
    }
    return response.json({
      status: true,
      userId: user._id,
      message: 'Login successful',
    });
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
    console.log("Ssssssss",file);
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
      { name: profileDto.name, bio: profileDto.bio },
    );
    return response.json({
      status: true,
      message: 'Profile updated successfully',
    });
  }
  // async profileUpdate(userId, profileDto: ProfileDto, file, response) {
  //   const findUserPromise = this.userModel.findOne({ _id: userId }).exec();

  //   AWS.config.update({
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //     region: process.env.AWS_REGION,
  //   });

  //   const s3 = new AWS.S3();
  //   let uploadPromise = Promise.resolve(null);

  //   if (file && file[0]) {
  //     const uploadParams = {
  //       Bucket: process.env.BucketName,
  //       Key: `images/${Date.now()}_${file[0].originalname}`,
  //       Body: file[0].buffer,
  //       ContentType: file[0].mimetype,
  //     };
  //     uploadPromise = s3.upload(uploadParams).promise();
  //   }

  //   const [findUser, uploadData] = await Promise.all([
  //     findUserPromise,
  //     uploadPromise,
  //   ]);

  //   if (!findUser) {
  //     return response.json({
  //       status: false,
  //       message: 'User not found',
  //     });
  //   }

  //   const updateFields: any = {
  //     name: profileDto.name,
  //     bio: profileDto.bio,
  //   };

  //   if (file && uploadData) {
  //     updateFields.image = uploadData.Location;
  //   } else {
  //     updateFields.image = findUser.image; // Use the existing image if no new file is provided
  //   }

  //   await this.userModel.updateOne({ _id: userId }, updateFields).exec();

  //   return response.json({
  //     status: true,
  //     message: 'Profile updated successfully',
  //   });
  // }
 
 
  async getById(userId, response) {
    // const objectId = new Types.ObjectId(userId);

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

}
