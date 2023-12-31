import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProtobufPackageEnum } from '@types';
import { join } from 'path';
import { SessionsService } from './sessions.service';

@Module({
  providers: [SessionsService],
  exports: [SessionsService],
  imports: [
    ClientsModule.register([
      {
        name: ProtobufPackageEnum.SESSIONS,
        transport: Transport.GRPC,
        options: {
          package: ProtobufPackageEnum.SESSIONS,
          protoPath: join(__dirname, '../types/protos/sessions.proto'),
        },
      },
    ]),
  ],
})
export class SessionsModule {}
