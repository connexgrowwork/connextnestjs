/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/post/schema/post.schema';
import { UserSchema } from 'src/user/schema/user.schema';
import { CommentSchema } from './schema/comment.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Post', schema: PostSchema },
    { name: 'Comment', schema: CommentSchema },
  ])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
