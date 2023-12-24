import { registerAs } from '@nestjs/config';

export interface GrpcConfiguration {
  env: string;
  port: number;
}

export default registerAs<GrpcConfiguration>('grpc', () => ({
  env: process.env.NODE_ENV,
  port: +process.env.PORT,
}));
