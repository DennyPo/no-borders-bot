import { registerAs } from '@nestjs/config';

export interface TelegramConfiguration {
  token: string;
}

export const telegramConfig = registerAs<TelegramConfiguration>(
  'telegram',
  () => ({
    token: process.env.TELEGRAM_TOKEN,
  })
);
