/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  bio: string;
}
export class LoginUserDto {
  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  password: string;
}
export class ProfileDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  bio: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;

//   @ApiProperty({ type: 'string', format: 'binary', required: false })
//   file: Express.Multer.File
}
 