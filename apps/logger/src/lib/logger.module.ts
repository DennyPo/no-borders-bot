import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        name: process.env.NX_TASK_TARGET_PROJECT,
        level:
          process.env.LOG_LEVEL ||
          (process.env.NODE_ENV !== 'production' ? 'debug' : 'info'),
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  ignore: 'pid,hostname',
                  translateTime: 'SYS:standard',
                },
              }
            : undefined,
        autoLogging: false,
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class LoggerModule {}

export * from 'nestjs-pino';
