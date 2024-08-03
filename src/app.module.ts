/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WebinarModule } from './webinar/webinar.module';
import * as dotenv from 'dotenv';

dotenv.config();

// const mongoUri = process.env.MONGODB_URI;
// if (!mongoUri) {
//   throw new Error('MONGODB_URI is not defined in the environment variables');
// }

@Module({
  imports: [   
    MongooseModule.forRoot('mongodb+srv://connexgrow:Connex%401234@cluster0.mppg7du.mongodb.net/connexgrow', {}),

    UserModule,
    PostModule,
    CommentModule,
    WebinarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
