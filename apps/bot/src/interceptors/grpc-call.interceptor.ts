import {
  InterceptingCall,
  InterceptingListener,
  InterceptorOptions,
  Listener,
  Metadata,
  RequesterBuilder,
} from '@grpc/grpc-js';
import { InterceptingCallInterface } from '@grpc/grpc-js/build/src/client-interceptors';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { API_KEY_FIELD } from '@types';
import { generalConfig } from '../config';

@Injectable()
export class GrpcCallInterceptor {
  constructor(
    @Inject(generalConfig.KEY)
    private readonly config: ConfigType<typeof generalConfig>
  ) {}

  intercept(
    options: InterceptorOptions,
    nextCall: (args: InterceptorOptions) => InterceptingCallInterface
  ) {
    const metadataRequester = (
      metadata: Metadata,
      listener: InterceptingListener,
      next: (
        metadata: Metadata,
        listener: InterceptingListener | Listener
      ) => void
    ) => {
      metadata.add(API_KEY_FIELD, this.config.backendApiKey);

      next(metadata, listener);
    };

    const requester = new RequesterBuilder()
      .withStart(metadataRequester)
      .build();

    return new InterceptingCall(nextCall(options), requester);
  }
}
