import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import generalConfig from '../config/general.config';
import { validationSchema } from '../config/schema';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
