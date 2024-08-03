/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateWebinarDto } from './dto/create-webinar.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Webinar } from './schema/webinar.schema';
const AWS = require('aws-sdk');

@Injectable()
export class WebinarService {
  constructor(
    @InjectModel(Webinar.name) private webinarModel: Model<Webinar>,
  ) {}
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async create(createWebinarDto: CreateWebinarDto, file, response) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    const s3 = new AWS.S3();

    if (file.length) {
      const uploadParams = {
        Bucket: process.env.BucketName,
        Key: `webinar/${Date.now()}_${file[0].originalname}`,
        Body: file[0].buffer,
        // ACL: 'public-read', // Adjust based on your requirements
        ContentType: file[0].mimetype,
      };
      const data = await s3.upload(uploadParams).promise();

      const saveWebinar = await this.webinarModel.create({
        fullName: createWebinarDto.name || '',
        image: data.Location || '',
        description: createWebinarDto.description || '',
        startDate: createWebinarDto.startDate || '',
        endDate: createWebinarDto.endDate || '',
        paymentUrl: createWebinarDto.paymentUrl || '',
      });

      return response.json({
        status: true,
        message: 'Webinar created successfully',
      });
    }
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async findAll(response) {
    const finList = await this.webinarModel.find({ isActive: 0 });

    return response.send({
      status: true,
      data: finList,
    });
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  async deleteWebinar(webinarId, response) {
    const remove = await this.webinarModel.updateOne(
      { _id: webinarId },
      {
        isActive: 1,
      },
    );

    return response.send({
      status: true,
      message: 'Webinar deleted successfully',
    });
  }
}
