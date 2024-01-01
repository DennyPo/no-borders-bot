import { Controller, UseGuards } from '@nestjs/common';
import { sessions } from '@types';
import { GrpcAuthGuard } from '../guards/grpc-auth.guard';
import { SessionsService } from './sessions.service';

@Controller()
@sessions.SessionsServiceControllerMethods()
@UseGuards(GrpcAuthGuard)
export class SessionsController implements sessions.SessionsServiceController {
  constructor(private readonly sessionsService: SessionsService) {}

  findOrCreate(sessionDto: sessions.FindOrCreateSessionDto) {
    return this.sessionsService.findOrCreate(sessionDto);
  }
}
