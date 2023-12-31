import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ProtobufPackageEnum, users } from '@types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: users.UsersServiceClient;

  constructor(
    @Inject(ProtobufPackageEnum.USERS) private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.usersService = this.client.getService<users.UsersServiceClient>(
      users.USERS_SERVICE_NAME
    );
  }

  findOrCreate(user: users.FindOrCreateUserDto): Promise<users.User> {
    return lastValueFrom(this.usersService.findOrCreate(user));
  }
}
