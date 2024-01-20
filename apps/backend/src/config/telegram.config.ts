import { registerAs } from '@nestjs/config';

export interface TelegramConfiguration {
  token: string;
  fileStoragePath: string;
}

export const telegramConfig = registerAs<TelegramConfiguration>(
  'telegram',
  () => ({
    token: process.env.TELEGRAM_TOKEN,
    fileStoragePath: 'https://api.telegram.org/file/bot',
  })
);
