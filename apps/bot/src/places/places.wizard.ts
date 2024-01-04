import { UseInterceptors } from '@nestjs/common';
import { Action, Ctx, Message, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { AppUpdate } from '../app/app.update';
import { BUTTONS, MESSAGES } from '../constants';
import { ActionTypeEnum, SCENES, STEPS } from '../constants/actions';
import { AuthInterceptor, ErrorInterceptor } from '../interceptors';
import { ExtendedContext } from '../types';

@Wizard(SCENES.REPORT)
@UseInterceptors(AuthInterceptor, ErrorInterceptor)
export class PlacesWizard {
  constructor(private readonly appUpdate: AppUpdate) {}

  @WizardStep(STEPS.FIRST)
  async onStartReportingRestriction(@Ctx() ctx: ExtendedContext) {
    const inlineKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback(
          BUTTONS.REPORT.HOW_TO_SEND_LOCATION,
          ActionTypeEnum.goInstruction
        ),
      ],
      [Markup.button.callback(BUTTONS.GO_MENU, ActionTypeEnum.goMenu)],
    ]).reply_markup;

    await ctx.reply(MESSAGES.SEND_LOCATION, {
      parse_mode: 'MarkdownV2',
      reply_markup: inlineKeyboard,
    });
    ctx.wizard.next();
  }

  @WizardStep(STEPS.SECOND)
  async onScene(
    @Ctx() ctx: ExtendedContext,
    @Message() message: { location: { latitude: number; longitude: number } }
  ) {
    const inlineKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback(BUTTONS.GO_MENU, ActionTypeEnum.goMenu)],
    ]).reply_markup;

    if (!message?.location) {
      await ctx.reply(MESSAGES.WAITING_FOR_LOCATION, {
        parse_mode: 'MarkdownV2',
        reply_markup: inlineKeyboard,
      });
      return;
    } else {
      await ctx.reply('Надішліть фото');
      ctx.wizard.next();
    }
  }

  @Action(ActionTypeEnum.goInstruction)
  onInstruction(@Ctx() ctx: ExtendedContext) {
    return this.appUpdate.onInstruction(ctx);
  }

  @Action(ActionTypeEnum.goMenu)
  async onStart(@Ctx() ctx: ExtendedContext) {
    await ctx.scene.leave();
    return this.appUpdate.onStart(ctx);
  }
}
