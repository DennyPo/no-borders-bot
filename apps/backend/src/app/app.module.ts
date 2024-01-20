import { Module } from '@nestjs/common';

import { LoggerModule } from '@logger';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from '../aws/s3/s3.module';
import { generalConfig, telegramConfig, validationSchema } from '../config';
import { PhotosModule } from '../photos/photos.module';
import { PlacesModule } from '../places/places.module';
import { PrismaModule } from '../prisma';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [generalConfig, telegramConfig],
      validationSchema,
    }),
    PrismaModule,
    UsersModule,
    SessionsModule,
    LoggerModule,
    PlacesModule,
    PhotosModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
