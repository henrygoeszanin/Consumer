import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  handleOrderPlaced(order: OrderDto) {
    console.log('received a new order: ', order);
  }
}
