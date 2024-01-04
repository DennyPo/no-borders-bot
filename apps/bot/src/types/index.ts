import { sessions, users } from '@types';
import { Scenes } from 'telegraf';

export interface ExtendedContext extends Scenes.WizardContext {
  user: users.User;
  dbSession: sessions.Session;
}
