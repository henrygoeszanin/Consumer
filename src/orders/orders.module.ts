import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {
  static configureQueue(app) {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'orders-queue',
      },
    });

    app.startAllMicroservices();
  }
}
