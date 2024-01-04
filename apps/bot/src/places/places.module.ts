import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppUpdate } from '../app/app.update';
import { generalConfig } from '../config';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { PlacesWizard } from './places.wizard';

@Module({
  providers: [PlacesWizard, AppUpdate],
  imports: [
    UsersModule,
    SessionsModule,
    ConfigModule.forFeature(generalConfig),
  ],
})
export class PlacesModule {}
