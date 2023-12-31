import { Controller, UseGuards } from '@nestjs/common';
import { users } from '@types';
import { GrpcAuthGuard } from '../guards/grpc-auth.guard';
import { UsersService } from './users.service';

@Controller()
@users.UsersServiceControllerMethods()
@UseGuards(GrpcAuthGuard)
export class UsersController implements users.UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  findOrCreate(findOrCreateUserDto: users.FindOrCreateUserDto) {
    return this.usersService.findOrCreate(findOrCreateUserDto);
  }
}
