import { NestFactory } from '@nestjs/core';

import { Logger } from '@logger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
}

bootstrap();
