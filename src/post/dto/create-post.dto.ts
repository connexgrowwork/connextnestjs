/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;
}
export class PostListDto {
    @ApiProperty()
    @IsOptional()
    limit: string;
  
    @ApiProperty()
    @IsOptional()
    offset: string;
  
    @ApiProperty()
    @IsOptional()
    search: string;
  }

  export class LikeDto {
    @ApiProperty()
    @IsNotEmpty()
    isLike: number;
  
    @ApiProperty()
    @IsNotEmpty()
    PostId: string;
  
    @ApiProperty()
    @IsNotEmpty()
    userId: string;
  }