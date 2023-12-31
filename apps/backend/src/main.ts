import { NestFactory } from '@nestjs/core';

import { Logger } from '@logger';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ProtobufPackageEnum } from '@types';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const globalPrefix = 'api';

  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();

  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('general.port');

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: [ProtobufPackageEnum.USERS, ProtobufPackageEnum.SESSIONS],
      protoPath: [
        join(__dirname, '../types/protos/users.proto'),
        join(__dirname, '../types/protos/sessions.proto'),
      ],
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
