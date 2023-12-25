import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProtobufPackageEnum } from '@types';
import { join } from 'path';
import grpcConfig from '../config/grpc.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: ProtobufPackageEnum.APP,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: ProtobufPackageEnum.APP,
              protoPath: join(__dirname, '../types/protos/app.proto'),
            },
          };
        },
        imports: [ConfigModule.forFeature(grpcConfig)],
        inject: [ConfigService],
      },
    ]),
  ],
})
export class AppModule {}
