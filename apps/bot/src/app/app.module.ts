import { Module } from '@nestjs/common';

import { LoggerModule } from '@logger';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import mediaGroup from 'telegraf-media-group';
import { generalConfig, telegramConfig, validationSchema } from '../config';
import { PlacesModule } from '../places/places.module';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { AppUpdate } from './app.update';

@Module({
  providers: [AppUpdate],
  imports: [
    LoggerModule,
    UsersModule,
    SessionsModule,
    PlacesModule,
    ConfigModule.forRoot({
      cache: true,
      load: [generalConfig, telegramConfig],
      validationSchema,
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(telegramConfig)],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN'),
        middlewares: [session(), mediaGroup()],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
