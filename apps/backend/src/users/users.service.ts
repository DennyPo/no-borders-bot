import { Injectable } from '@nestjs/common';
import { users } from '@types';
import { PrismaService } from '../prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOrCreate(user: users.FindOrCreateUserDto) {
    const { telegramId, username, firstName, lastName } = user;

    const foundUser = await this.prismaService.user.findUnique({
      where: { telegramId },
    });

    if (foundUser) {
      return foundUser;
    }

    return this.prismaService.user.create({
      data: {
        telegramId,
        username,
        firstName,
        lastName,
      },
    });
  }
}
