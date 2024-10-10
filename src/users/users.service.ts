import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  handleUserRegistry(user: UserDto) {
    return user;
  }
}
