import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generalConfig } from '../config';
import { PrismaService } from '../prisma';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, PrismaService],
  imports: [ConfigModule.forFeature(generalConfig)],
})
export class SessionsModule {}
