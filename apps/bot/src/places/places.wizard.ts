import { UseInterceptors } from '@nestjs/common';
import { Action, Ctx, Message, On, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { AppUpdate } from '../app/app.update';
import { BUTTONS, MESSAGES } from '../constants';
import { ActionTypeEnum, SCENES, STEPS } from '../constants/actions';
import { AuthInterceptor, ErrorInterceptor } from '../interceptors';
import { ExtendedContext, TelegramMessage } from '../types';
import { PlacesService } from './places.service';

@Wizard(SCENES.REPORT)
@UseInterceptors(AuthInterceptor, ErrorInterceptor)
export class PlacesWizard {
  constructor(
    private readonly appUpdate: AppUpdate,
    private readonly placesService: PlacesService
  ) {}

  @WizardStep(STEPS.FIRST)
  async onSceneFirst(@Ctx() ctx: ExtendedContext) {
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
  async onSceneSecond(
    @Ctx() ctx: ExtendedContext,
    @Message() message: TelegramMessage
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
      ctx.scene.state = {
        ...ctx.wizard.state,
        ...message.location,
      };

      await ctx.reply(MESSAGES.SEND_DESCRIPTION, {
        parse_mode: 'MarkdownV2',
        reply_markup: inlineKeyboard,
      });
      ctx.wizard.next();
    }
  }

  @WizardStep(STEPS.THIRD)
  async onSceneThird(
    @Ctx() ctx: ExtendedContext,
    @Message() message: TelegramMessage
  ) {
    const commonButtons = [
      [Markup.button.callback(BUTTONS.GO_MENU, ActionTypeEnum.goMenu)],
    ];

    if (!message?.text) {
      await ctx.reply(MESSAGES.WAITING_FOR_DESCRIPTION, {
        parse_mode: 'MarkdownV2',
        reply_markup: Markup.inlineKeyboard(commonButtons).reply_markup,
      });
      return;
    } else {
      ctx.scene.state = {
        ...ctx.wizard.state,
        description: message.text,
      };

      commonButtons.unshift([
        Markup.button.callback(
          BUTTONS.REPORT.DONT_HAVE_PHOTO,
          ActionTypeEnum.dontHavePhoto
        ),
      ]);

      await ctx.reply(MESSAGES.SEND_PHOTO, {
        parse_mode: 'MarkdownV2',
        reply_markup: Markup.inlineKeyboard(commonButtons).reply_markup,
      });

      ctx.wizard.next();
    }
  }

  @WizardStep(STEPS.FOURTH)
  async onSceneFourth(
    @Ctx() ctx: ExtendedContext,
    @Message() message: TelegramMessage
  ) {
    const commonButtons = [
      [Markup.button.callback(BUTTONS.GO_MENU, ActionTypeEnum.goMenu)],
    ];

    if (!message?.photo) {
      commonButtons.unshift([
        Markup.button.callback(
          BUTTONS.REPORT.DONT_HAVE_PHOTO,
          ActionTypeEnum.dontHavePhoto
        ),
      ]);

      await ctx.reply(MESSAGES.WAITING_PHOTO, {
        parse_mode: 'MarkdownV2',
        reply_markup: Markup.inlineKeyboard(commonButtons).reply_markup,
      });

      return;
    } else {
      await this.placesService.create({
        userId: ctx.user.id,
        type: ctx.wizard.state.type,
        latitude: ctx.wizard.state.latitude,
        longitude: ctx.wizard.state.longitude,
        description: ctx.wizard.state.description,
        photos: message.photo.map((photo) => photo.file_id),
      });

      await ctx.reply(MESSAGES.THANKS_FOR_REPORT, {
        parse_mode: 'MarkdownV2',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback(BUTTONS.GO_MENU, ActionTypeEnum.goMenu)],
        ]).reply_markup,
      });

      await ctx.scene.leave();
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

  @Action(ActionTypeEnum.dontHavePhoto)
  async onDontHavePhoto(@Ctx() ctx: ExtendedContext) {
    const inlineKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback(BUTTONS.GO_MENU, ActionTypeEnum.goMenu)],
    ]).reply_markup;

    await ctx.answerCbQuery();
    await this.placesService.create({
      userId: ctx.user.id,
      type: ctx.wizard.state.type,
      latitude: ctx.wizard.state.latitude,
      longitude: ctx.wizard.state.longitude,
      description: ctx.wizard.state.description,
      photos: [],
    });

    await ctx.reply(MESSAGES.THANKS_FOR_REPORT, {
      parse_mode: 'MarkdownV2',
      reply_markup: inlineKeyboard,
    });
    await ctx.scene.leave();
  }

  @On('photo')
  onPhoto(@Ctx() ctx: ExtendedContext, @Message() message: TelegramMessage) {
    switch (ctx.wizard.cursor) {
      case STEPS.FIRST:
        return this.onSceneFirst(ctx);

      case STEPS.SECOND:
        return this.onSceneSecond(ctx, message);

      case STEPS.THIRD:
        return this.onSceneThird(ctx, message);

      case STEPS.FOURTH: {
        // TODO: known issue: when user send several photo, we should handle it, because media group invokes onPhoto several times
        // Think about interceptors
        return this.onSceneFourth(ctx, message);
      }

      default:
        return;
    }
  }
}
