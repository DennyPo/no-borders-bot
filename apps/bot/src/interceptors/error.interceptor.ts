import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable, catchError } from 'rxjs';
import { generalConfig } from '../config';
import { MESSAGES } from '../constants';
import { ExtendedContext } from '../types';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  constructor(
    @Inject(generalConfig.KEY)
    private readonly config: ConfigType<typeof generalConfig>
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<unknown>> {
    const requestCtx: ExtendedContext = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError(async (error) => {
        this.logger.error(error, error.stack);

        await requestCtx.reply(MESSAGES.SOMETHING_WENT_WRONG);
        await requestCtx.telegram.sendMessage(
          this.config.ownerId,
          MESSAGES.ERROR_MESSAGE_FOR_OWNER
        );
      })
    );
  }
}
