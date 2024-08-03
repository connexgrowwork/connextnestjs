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
import { WebinarService } from './webinar.service';
import { CreateWebinarDto } from './dto/create-webinar.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@ApiTags('Webinar')
@Controller('webinar')
export class WebinarController {
  constructor(private readonly webinarService: WebinarService) {}

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: memoryStorage(),
    }),
  )
  @ApiBody({ type: CreateWebinarDto })
  create(
    @Body() createWebinarDto: CreateWebinarDto,
    @UploadedFiles() files,
    @Response() response,
  ) {
    return this.webinarService.create(createWebinarDto, files, response);
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  @Post('list')
  findAll(@Response() response) {
    return this.webinarService.findAll(response);
  }

  @Post('delete/:webinarId')
  deleteWebinar(@Param('webinarId') webinarId: string, @Response() response) {
    return this.webinarService.deleteWebinar(webinarId, response);
  }
}
