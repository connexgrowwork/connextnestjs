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

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async addComment(createCommentDto: CreateCommentDto, response) {
    const createdComment = new this.commentModel(createCommentDto);
    const savedComment = await createdComment.save();

    const post = await this.postModel.findById(createCommentDto.postId);
    post.comments.push(savedComment._id);
    await post.save();

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

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
