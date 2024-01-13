import { InterceptorOptions } from '@grpc/grpc-js';
import { InterceptingCallInterface } from '@grpc/grpc-js/build/src/client-interceptors';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BACKEND_CONSUMER_GROUP_ID, BACKEND_KAFKA_TOKEN, BOT_KAFKA_CLIENT_ID, ProtobufPackageEnum } from '@types';
import { join } from 'path';
import { AppUpdate } from '../app/app.update';
import { generalConfig } from '../config';
import { GrpcCallInterceptor } from '../interceptors';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { PlacesService } from './places.service';
import { PlacesWizard } from './places.wizard';

@Module({
  providers: [PlacesWizard, AppUpdate, PlacesService],
  imports: [
    UsersModule,
    SessionsModule,
    ConfigModule.forFeature(generalConfig),
    ClientsModule.registerAsync([
      {
        name: ProtobufPackageEnum.PLACES,
        useFactory: (
          configService: ConfigService,
          grpcCallInterceptor: GrpcCallInterceptor
        ) => {
          return {
            transport: Transport.GRPC,
            options: {
              url: configService.get<string>('general.backendGrpcUrl'),
              package: ProtobufPackageEnum.PLACES,
              protoPath: join(__dirname, '../types/protos/places.proto'),
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
      {
        name: BACKEND_KAFKA_TOKEN,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: BOT_KAFKA_CLIENT_ID,
                brokers: [configService.get<string>('general.kafkaUrl')],
              },
              consumer: {
                groupId: BACKEND_CONSUMER_GROUP_ID,
              },
            },
          };
        },
        imports: [ConfigModule.forFeature(generalConfig)],
        inject: [ConfigService],
      },
    ]),
  ],
})
export class PlacesModule {}
