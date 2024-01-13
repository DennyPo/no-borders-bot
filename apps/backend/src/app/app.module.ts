import { Module } from '@nestjs/common';

import { LoggerModule } from '@logger';
import { ConfigModule } from '@nestjs/config';
import { generalConfig, validationSchema } from '../config';
import { PlacesModule } from '../places/places.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotosModule } from '../photos/photos.module';

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
    PlacesModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
