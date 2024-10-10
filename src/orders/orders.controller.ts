import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('order-placed')
  handleOrderPlaced(@Payload() order: OrderDto) {
    return this.ordersService.handleOrderPlaced(order);
  }
}
