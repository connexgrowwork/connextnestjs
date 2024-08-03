import { S3Client } from '@aws-sdk/client-s3';
export declare class AwsConfigService {
    constructor();
    getS3Client(): S3Client;
}
