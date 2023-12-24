import { Body, Controller, Get, Inject, OnModuleInit, Post, Query } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { app } from '@types';

@Controller()
export class AppController implements OnModuleInit {
  private grpcService: app.AppServiceClient;

  constructor(@Inject('BACKEND_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcService = this.client.getService<app.AppServiceClient>(app.APP_SERVICE_NAME);
  }

  @Get()
  async getData() {
    console.log('====== TEST 111 ========');


    const response = await lastValueFrom(this.grpcService.getData({ id: 1 }));

    console.log('====== response ========', response);

    return response;
}
