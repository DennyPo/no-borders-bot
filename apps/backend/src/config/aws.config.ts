import { registerAs } from '@nestjs/config';

export interface AwsConfiguration {
  keyId: string;
  secretKey: string;
  region: string;
  bucket: string;
}

export const awsConfig = registerAs<AwsConfiguration>('aws', () => ({
  keyId: process.env.AWS_ACCESS_KEY_ID,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.S3_BUCKET,
}));
