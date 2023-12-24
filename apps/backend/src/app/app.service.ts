import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async health(): Promise<{ message: string }> {
    const count = await this.prismaService.user.count();

    return { message: `Test count is ${count}. Server is healthy!` };
  }
}
