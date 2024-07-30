/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto, ProfileDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

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
    // console.log('profileDto', profileDto);
    // console.log('dddddd', file);

    const findUser: any = await this.userModel.findOne({ _id: userId });

    if (!findUser) {
      return response.json({
        status: false,
        message: 'User not found',
      });
    }

    await this.userModel.updateOne(
      { _id: userId },
      {
        name: profileDto.name,
        image: file ? file?.path : findUser ? findUser?.image : '',
        bio: profileDto.bio,
      },
    );
    return response.json({
      status: true,
      message: 'Profile updated successfully',
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
