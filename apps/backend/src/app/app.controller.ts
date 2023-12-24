import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { app } from '@types';


@Controller()
@app.AppServiceControllerMethods()
export class AppController implements app.AppServiceController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health() {
    return this.appService.health();
  }

  getData(data: app.DataRequest) {
    console.log('====== TEST 222 ========', data);

    return {
      id: 1,
      name: 'test',
      email: 'test@mail.com',
    };
  }
}
