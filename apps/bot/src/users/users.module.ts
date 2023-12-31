import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProtobufPackageEnum } from '@types';
import { join } from 'path';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    ClientsModule.register([
      {
        name: ProtobufPackageEnum.USERS,
        transport: Transport.GRPC,
        options: {
          package: ProtobufPackageEnum.USERS,
          protoPath: join(__dirname, '../types/protos/users.proto'),
        },
      },
    ]),
  ],
})
export class UsersModule {}
