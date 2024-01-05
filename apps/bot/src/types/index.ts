import { sessions, users } from '@types';
import { Scenes } from 'telegraf';
import { PhotoSize } from 'telegraf/typings/core/types/typegram';

export interface ExtendedContext extends Scenes.WizardContext {
  user: users.User;
  dbSession: sessions.Session;
}

export interface TelegramMessage {
  location?: {
    latitude: number;
    longitude: number;
  };
  text?: string;
  photo?: PhotoSize[];
}
