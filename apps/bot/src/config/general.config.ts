import { registerAs } from '@nestjs/config';

export interface GeneralConfiguration {
  env: string;
  port: number;
  backendApiKey: string;
  ownerId: number;
}

export const generalConfig = registerAs<GeneralConfiguration>(
  'general',
  () => ({
    env: process.env.NODE_ENV,
    port: +process.env.PORT,
    backendApiKey: process.env.BACKEND_API_KEY,
    ownerId: Number.parseInt(process.env.OWNER_ID),
  })
);
