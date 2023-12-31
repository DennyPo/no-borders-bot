import { Controller } from '@nestjs/common';
import { sessions } from '@types';
import { SessionsService } from './sessions.service';

@Controller()
@sessions.SessionsServiceControllerMethods()
export class SessionsController implements sessions.SessionsServiceController {
  constructor(private readonly sessionsService: SessionsService) {}

  findOrCreate(sessionDto: sessions.FindOrCreateSessionDto) {
    return this.sessionsService.findOrCreate(sessionDto);
  }
}
