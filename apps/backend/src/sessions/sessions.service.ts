import { Injectable } from '@nestjs/common';
import { SESSION_EXPIRES_IN, sessions } from '@types';
import { DateTime } from 'luxon';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOrCreate(sessionDto: sessions.FindOrCreateSessionDto) {
    const { userId } = sessionDto;

    const foundSession = await this.prismaService.session.findFirst({
      where: {
        userId,
        expiresAt: {
          gte: DateTime.now().toJSDate(),
        },
      },
    });

    if (foundSession) {
      return foundSession;
    }

    return this.prismaService.session.create({
      data: {
        userId,
        expiresAt: DateTime.now()
          .plus({ minutes: SESSION_EXPIRES_IN })
          .toJSDate(),
      },
    });
  }
}
