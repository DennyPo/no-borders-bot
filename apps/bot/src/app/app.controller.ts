import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { app, ProtobufPackageEnum } from '@types';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  private grpcService: app.AppServiceClient;

  constructor(
    @Inject(ProtobufPackageEnum.APP) private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.grpcService = this.client.getService<app.AppServiceClient>(
      app.APP_SERVICE_NAME
    );
  }

  @Get()
  async getData() {
    console.log('====== TEST 111 ========');

    const response = await lastValueFrom(this.grpcService.getData({ id: 1 }));

    console.log('====== response ========', response);

    return response;
  }
}
