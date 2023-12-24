import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import grpcConfig from '../config/grpc.config';
import { APP_PACKAGE_NAME, APP_SERVICE_NAME } from '../../../backend/src/assets/app';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'BACKEND_SERVICE',
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: APP_PACKAGE_NAME,
              protoPath: join(__dirname, 'assets/app.proto'),
              // url: 'localhost:50051',
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
