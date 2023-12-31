import { BaseEntityInterface } from './common';

export interface FindOrCreateUserInterface {
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
}

export interface UserInterface
  extends BaseEntityInterface,
    FindOrCreateUserInterface {}
