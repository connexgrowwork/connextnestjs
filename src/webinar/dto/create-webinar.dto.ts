/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWebinarDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;
//   @ApiProperty()
//   @IsOptional()
//   image: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  startDate: string;

  @ApiProperty()
  @IsOptional()
  endDate: string;

  @ApiProperty()
  @IsOptional()
  paymentUrl: string;
}
