/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { PostSchema } from './schema/post.schema';
import { CommentSchema } from 'src/comment/schema/comment.schema';
import { NotificationSchema } from 'src/user/schema/notification.schema';
import { AwsConfigService } from 'src/aws/aws.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Notification', schema: NotificationSchema },
    ]),
  ],

  controllers: [PostController],
  providers: [PostService, AwsConfigService],
})
export class PostModule {}
