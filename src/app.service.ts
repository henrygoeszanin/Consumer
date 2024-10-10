import { Injectable } from '@nestjs/common';
import { OrderDto } from './orders/dto/order.dto';

@Injectable()
export class AppService {
  handleOrderPlaced(order: OrderDto) {
    console.log('received a new order: ', order);
  }
}
