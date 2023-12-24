import { registerAs } from '@nestjs/config';

export interface GeneralConfiguration {
  env: string;
  port: number;
}

export default registerAs<GeneralConfiguration>('general', () => ({
  env: process.env.NODE_ENV,
  port: +process.env.PORT,
}));
