export enum ProtobufPackageEnum {
  USERS = 'users',
  SESSIONS = 'sessions',
}

export interface BaseEntityInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
}
