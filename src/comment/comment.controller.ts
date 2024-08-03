/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Response,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CommentListDto,
  CreateCommentDto,
  NotificationListDto,
} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('add-comment')
  create(@Body() createCommentDto: CreateCommentDto, @Response() response) {
    return this.commentService.addComment(createCommentDto, response);
  }

  @Post('comment-list')
  findAll(@Body() commentListDto: CommentListDto, @Response() response) {
    return this.commentService.findAll(commentListDto, response);
  }

  @Post('all-notification-list/:userId')
  findAllList(
    @Body() commentListDto: NotificationListDto,
    @Response() response,
  ) {
    return this.commentService.findAllList(commentListDto, response);
  }
}
