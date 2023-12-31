import { Module } from '@nestjs/common';

import { LoggerModule } from '@logger';
import { ConfigModule } from '@nestjs/config';
import { generalConfig, validationSchema } from '../config';
import { PrismaModule } from '../prisma/prisma.module';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [generalConfig],
      validationSchema,
    }),
    PrismaModule,
    UsersModule,
    SessionsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
