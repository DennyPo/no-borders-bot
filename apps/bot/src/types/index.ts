import { sessions, users } from '@types';
import { Context } from 'telegraf';

export interface ExtendedContext extends Context {
  user: users.User;
  session: sessions.Session;
}
