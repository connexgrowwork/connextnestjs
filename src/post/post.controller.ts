/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, LikeDto, PostListDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: memoryStorage(),
    }),
  )
  @ApiBody({ type: CreatePostDto })
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files,
    @Response() response,
  ) {
    return this.postService.create(createPostDto, files, response);
  }

  @Post('all-post-list/:userId')
  getAllPostList(
    @Param('userId') userId: string,
    @Body() postListDto: PostListDto,
    @Response() response,
  ) {
    return this.postService.getAllPostList(userId, postListDto, response);
  }
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

@Post('like-unlike')
likeUnlikePost(
  @Body() likeDto: LikeDto,
  @Response() response,
) {
  return this.postService.likeUnlikePost( likeDto, response);
} 

}
