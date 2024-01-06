export enum ProtobufPackageEnum {
  USERS = 'users',
  SESSIONS = 'sessions',
  PLACES = 'places',
}

export interface BaseEntityInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
}
