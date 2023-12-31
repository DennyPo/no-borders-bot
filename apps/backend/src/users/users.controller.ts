import { Controller } from '@nestjs/common';
import { users } from '@types';
import { UsersService } from './users.service';

@Controller()
@users.UsersServiceControllerMethods()
export class UsersController implements users.UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  findOrCreate(findOrCreateUserDto: users.FindOrCreateUserDto) {
    return this.usersService.findOrCreate(findOrCreateUserDto);
  }
}
