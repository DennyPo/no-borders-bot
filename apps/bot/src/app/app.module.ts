import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { generalConfig, telegramConfig, validationSchema } from '../config';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { AppUpdate } from './app.update';

@Module({
  providers: [AppUpdate],
  imports: [
    UsersModule,
    SessionsModule,
    ConfigModule.forRoot({
      cache: true,
      load: [generalConfig, telegramConfig],
      validationSchema,
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(telegramConfig)],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN'),
        middlewares: [session()],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
