import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface GeneralConfiguration {
  env: string;
  port: number;
  apiKey: string;
  grpcUrl: string;
  kafkaUrl: string;
}

export const generalConfig = registerAs<GeneralConfiguration>(
  'general',
  () => ({
    env: process.env.NODE_ENV,
    port: +process.env.PORT,
    apiKey: process.env.API_KEY,
    grpcUrl: process.env.GRPC_URL,
    kafkaUrl: process.env.KAFKA_URL,
  })
);
