import { InterceptorOptions } from '@grpc/grpc-js';
import { InterceptingCallInterface } from '@grpc/grpc-js/build/src/client-interceptors';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProtobufPackageEnum } from '@types';
import { join } from 'path';
import { generalConfig } from '../config';
import { GrpcCallInterceptor } from '../interceptors';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: ProtobufPackageEnum.USERS,
        useFactory: async (grpcCallInterceptor: GrpcCallInterceptor) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: ProtobufPackageEnum.USERS,
              protoPath: join(__dirname, '../types/protos/users.proto'),
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
        inject: [GrpcCallInterceptor],
        extraProviders: [GrpcCallInterceptor],
      },
    ]),
  ],
})
export class UsersModule {}
