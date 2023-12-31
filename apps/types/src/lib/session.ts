import { BaseEntityInterface } from './common';

export interface SessionInterface extends BaseEntityInterface {
  expiresAt: Date;
  userId: string;
}
