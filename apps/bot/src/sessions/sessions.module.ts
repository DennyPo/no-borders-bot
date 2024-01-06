import { InterceptorOptions } from '@grpc/grpc-js';
import { InterceptingCallInterface } from '@grpc/grpc-js/build/src/client-interceptors';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProtobufPackageEnum } from '@types';
import { join } from 'path';
import { generalConfig } from '../config';
import { GrpcCallInterceptor } from '../interceptors';
import { SessionsService } from './sessions.service';

@Module({
  providers: [SessionsService],
  exports: [SessionsService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: ProtobufPackageEnum.SESSIONS,
        useFactory: (
          configService: ConfigService,
          grpcCallInterceptor: GrpcCallInterceptor
        ) => {
          return {
            transport: Transport.GRPC,
            options: {
              url: configService.get<string>('general.backendGrpcUrl'),
              package: ProtobufPackageEnum.SESSIONS,
              protoPath: join(__dirname, '../types/protos/sessions.proto'),
              channelOptions: {
                interceptors: [
                  (
                    options: InterceptorOptions,
                    nextCall: (
                      args: InterceptorOptions
                    ) => InterceptingCallInterface
                  ) => grpcCallInterceptor.intercept(options, nextCall),
                ],
              },
            },
          };
        },
        imports: [ConfigModule.forFeature(generalConfig)],
        inject: [ConfigService, GrpcCallInterceptor],
        extraProviders: [GrpcCallInterceptor],
      },
    ]),
  ],
})
export class SessionsModule {}
