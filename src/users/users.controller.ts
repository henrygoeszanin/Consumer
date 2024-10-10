import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserDto } from './dto/users.dto';
import { UsersMongoDBService } from './users.mongodb.service';

@Controller()
export class UsersController {
  constructor(
    private readonly ordersService: UsersService,
    private readonly usersMongoDBService: UsersMongoDBService,
  ) {}

  @EventPattern('user-created')
  async handleOrderPlaced(@Payload() order: UserDto) {
    const user = this.ordersService.handleUserRegistry(order);

    await this.usersMongoDBService.saveNewUser(user);
  }
}
