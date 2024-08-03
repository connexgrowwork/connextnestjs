/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsConfigService {
    constructor() { }

    getS3Client(): S3Client {
        return new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: 'AKIAQFC27PJOGYUHBMUT',
                secretAccessKey: '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',
            }
        });
    }
    
}
