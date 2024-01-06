import { places, sessions, users } from '@types';
import { Scenes } from 'telegraf';
import { PhotoSize } from 'telegraf/typings/core/types/typegram';

export interface ExtendedWizard
  extends Scenes.WizardContextWizard<Scenes.WizardContext> {
  state: Partial<places.CreatePlaceDto>;
}

export interface ExtendedContext extends Scenes.WizardContext {
  user: users.User;
  dbSession: sessions.Session;
  wizard: ExtendedWizard;
}

export interface TelegramMessage {
  location?: {
    latitude: number;
    longitude: number;
  };
  text?: string;
  photo?: PhotoSize[];
}
