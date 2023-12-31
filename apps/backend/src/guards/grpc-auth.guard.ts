import { Metadata } from '@grpc/grpc-js';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { API_KEY_FIELD } from '@types';
import { Observable } from 'rxjs';
import { generalConfig } from '../config';

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  constructor(
    @Inject(generalConfig.KEY)
    private readonly config: ConfigType<typeof generalConfig>
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const metadata = context.switchToRpc().getContext<Metadata>();
    const apiKey = metadata.get(API_KEY_FIELD)[0];

    return apiKey === this.config.apiKey;
  }
}
