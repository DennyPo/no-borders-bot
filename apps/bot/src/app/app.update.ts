import { UseInterceptors } from '@nestjs/common';
import { places } from '@types';
import { Action, Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { ATTACHMENTS, BUTTONS, MESSAGES } from '../constants';
import { ActionTypeEnum, SCENES } from '../constants/actions';
import { AuthInterceptor, ErrorInterceptor } from '../interceptors';
import { ExtendedContext, TelegramMessage } from '../types';

@Update()
@UseInterceptors(AuthInterceptor, ErrorInterceptor)
export class AppUpdate {
  @Start()
  @Action(ActionTypeEnum.goMenu)
  async onStart(@Ctx() ctx: ExtendedContext) {
    const inlineKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback(
          BUTTONS.MAIN_MENU.GO_REPORT_MENU,
          ActionTypeEnum.goReportMenu
        ),
      ],
      [
        Markup.button.callback(
          BUTTONS.MAIN_MENU.HOW_IT_WORKS,
          ActionTypeEnum.goHowItWorks
        ),
      ],
    ]).reply_markup;

    if (ctx.updateType === 'message') {
      await ctx.reply(MESSAGES.MAIN_MENU, {
        parse_mode: 'MarkdownV2',
        reply_markup: inlineKeyboard,
      });
    } else {
      await ctx.editMessageText(MESSAGES.MAIN_MENU, {
        parse_mode: 'MarkdownV2',
        reply_markup: inlineKeyboard,
      });
    }
  }

  @Action(ActionTypeEnum.goHowItWorks)
  async onHowItWorks(@Ctx() ctx: ExtendedContext) {
    const inlineKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback(
          BUTTONS.MAIN_MENU.GO_INSTRUCTION,
          ActionTypeEnum.goInstruction
        ),
      ],
      [Markup.button.callback(BUTTONS.GO_BACK, ActionTypeEnum.goMenu)],
    ]).reply_markup;

    await ctx.editMessageText(MESSAGES.HOW_IT_WORKS, {
      parse_mode: 'MarkdownV2',
      reply_markup: inlineKeyboard,
    });
  }

  @Action(ActionTypeEnum.goInstruction)
  async onInstruction(@Ctx() ctx: ExtendedContext) {
    await ctx.reply(MESSAGES.INSTRUCTION, {
      parse_mode: 'MarkdownV2',
    });

    await ctx.replyWithMediaGroup([
      {
        type: 'photo',
        media: ATTACHMENTS.INSTRUCTION.PHOTO_1,
      },
      {
        type: 'photo',
        media: ATTACHMENTS.INSTRUCTION.PHOTO_2,
      },
    ]);
    await ctx.answerCbQuery();
  }

  @Action(ActionTypeEnum.goReportMenu)
  async onReportMenu(@Ctx() ctx: ExtendedContext) {
    const inlineKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback(
          BUTTONS.REPORT_MENU.REPORT_RESTRICTION,
          ActionTypeEnum.reportRestriction
        ),
      ],
      [
        Markup.button.callback(
          BUTTONS.REPORT_MENU.REPORT_CONVENIENCE,
          ActionTypeEnum.reportConvenience
        ),
      ],
      [Markup.button.callback(BUTTONS.GO_BACK, ActionTypeEnum.goMenu)],
    ]).reply_markup;

    await ctx.editMessageText(MESSAGES.REPORT_MENU, {
      parse_mode: 'MarkdownV2',
      reply_markup: inlineKeyboard,
    });
  }

  @Action(ActionTypeEnum.reportRestriction)
  async onReportRestriction(@Ctx() ctx: ExtendedContext) {
    await ctx.scene.enter(SCENES.REPORT, {
      type: places.PlaceTypeEnum.restriction,
    });
    await ctx.answerCbQuery();
  }

  @Action(ActionTypeEnum.reportConvenience)
  async onReportConvenience(@Ctx() ctx: ExtendedContext) {
    await ctx.scene.enter(SCENES.REPORT, {
      type: places.PlaceTypeEnum.convenience,
    });
    await ctx.answerCbQuery();
  }

  //   test

  @On('message')
  onMessage(@Ctx() ctx: ExtendedContext, @Message() message: TelegramMessage) {
    // @ts-ignore
    console.log('====== message ========', message);
    console.log('====== ctx ========', ctx);
  }
}
