import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from '../aws/s3/s3.module';
import { telegramConfig } from '../config';
import { PlacesModule } from '../places/places.module';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [
    S3Module,
    HttpModule,
    PlacesModule,
    ConfigModule.forFeature(telegramConfig),
  ],
})
export class PhotosModule {}
