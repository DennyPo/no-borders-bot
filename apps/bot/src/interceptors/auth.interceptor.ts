import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionsService } from '../sessions/sessions.service';
import { ExtendedContext } from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuthInterceptor.name);

  constructor(
    private readonly userService: UsersService,
    private readonly sessionsService: SessionsService
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<unknown>> {
    const requestCtx: ExtendedContext = context.switchToHttp().getRequest();

    try {
      const user = await this.userService.findOrCreate({
        telegramId: requestCtx.from.id,
        lastName: requestCtx.from.last_name,
        firstName: requestCtx.from.first_name,
        username: requestCtx.from.username,
      });

      const session = await this.sessionsService.findOrCreate({
        userId: user.id,
      });

      requestCtx.user = user;
      requestCtx.session = session;

      return next.handle();
    } catch (error) {
      this.logger.error(error, error.stack);

      return next.handle();
    }
  }
}
