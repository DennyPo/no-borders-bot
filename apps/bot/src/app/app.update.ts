import { UseInterceptors } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { AuthInterceptor } from '../interceptors';
import { ExtendedContext } from '../types';

@Update()
@UseInterceptors(AuthInterceptor)
export class AppUpdate {
  @Start()
  async onStart(@Ctx() ctx: ExtendedContext) {
    console.log('====== ctx ========', ctx.user);
    console.log('====== session ========', ctx.session);
    console.log('start messaging');
  }
}
