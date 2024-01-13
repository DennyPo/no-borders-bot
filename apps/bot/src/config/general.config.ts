import { registerAs } from '@nestjs/config';
import process from 'process';

export interface GeneralConfiguration {
  env: string;
  port: number;
  backendApiKey: string;
  ownerId: number;
  backendGrpcUrl: string;
  kafkaUrl: string;
}

export const generalConfig = registerAs<GeneralConfiguration>(
  'general',
  () => ({
    env: process.env.NODE_ENV,
    port: +process.env.PORT,
    backendApiKey: process.env.BACKEND_API_KEY,
    ownerId: Number.parseInt(process.env.OWNER_ID),
    backendGrpcUrl: process.env.BACKEND_GRPC_URL,
    kafkaUrl: process.env.KAFKA_URL,
  })
);
