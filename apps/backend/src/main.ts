import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ProtobufPackageEnum } from '@types';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('general.port');

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: ProtobufPackageEnum.APP,
      protoPath: join(__dirname, '../types/protos/app.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
