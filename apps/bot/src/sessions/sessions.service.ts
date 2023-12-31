import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ProtobufPackageEnum, sessions } from '@types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SessionsService implements OnModuleInit {
  private sessionsService: sessions.SessionsServiceClient;

  constructor(
    @Inject(ProtobufPackageEnum.SESSIONS) private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.sessionsService =
      this.client.getService<sessions.SessionsServiceClient>(
        sessions.SESSIONS_SERVICE_NAME
      );
  }

  findOrCreate(
    sessionDto: sessions.FindOrCreateSessionDto
  ): Promise<sessions.Session> {
    return lastValueFrom(this.sessionsService.findOrCreate(sessionDto));
  }
}
