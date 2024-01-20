import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generalConfig } from '../config';
import { PrismaService } from '../prisma';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, PrismaService],
  imports: [ConfigModule.forFeature(generalConfig)],
  exports: [PlacesService],
})
export class PlacesModule {}
