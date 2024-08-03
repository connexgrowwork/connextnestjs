/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
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
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  FollowDTO,
  LoginUserDto,
  ProfileDto,
  SocialSignupLoginDto,
  UnFollowDTO,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  create(@Body() createUserDto: CreateUserDto, @Response() response) {
    return this.userService.create(createUserDto, response);
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // @Post('login')
  // loginFun(@Body() loginUserDto: LoginUserDto, @Response() response) {
  //   return this.userService.loginFun(loginUserDto, response);
  // }

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  @Post('social-login-signup')
  socialLoginSignup(
    @Body() socialLoginDto: SocialSignupLoginDto,
    @Response() response,
  ) {
    return this.userService.socialLoginSignup(socialLoginDto, response);
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  @Post('profile-update/:userId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: memoryStorage(),
    }),
  )
  @ApiBody({ type: ProfileDto })
  profileUpdate(
    @Param('userId') userId: string,
    @Body() profileDto: ProfileDto,
    @UploadedFiles() files,
    @Response() response,
  ) {
    return this.userService.profileUpdate(userId, profileDto, files, response);
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  @Get('get-user-data-by-id/:userId')
  getById(@Param('userId') userId: string, @Response() response) {
    return this.userService.getById(userId, response);
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  @Post('follow-user')
  userFollow(
    @Body() followUnFollowDTO: FollowDTO,
    @Response() response,
  ) {
    return this.userService.userFollow(followUnFollowDTO, response);
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  @Post('un-follow-user')
  userUnFollow(
    @Body() unFollowDTO: UnFollowDTO,
    @Response() response,
  ) {
    return this.userService.userUnFollow(unFollowDTO, response);
  }
}
