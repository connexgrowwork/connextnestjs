/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsConfigService {
    constructor() { }

    getS3Client(): S3Client {
        return new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        }); 
    }
    
  //   AWS.config.update({
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //     region: process.env.AWS_REGION,
  //   });
}
