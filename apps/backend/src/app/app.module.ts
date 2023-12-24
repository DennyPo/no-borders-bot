import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import generalConfig from '../config/general.config';
import { validationSchema } from '../config/schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [generalConfig],
      validationSchema,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
