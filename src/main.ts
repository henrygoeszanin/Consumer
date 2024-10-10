import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar as filas RabbitMQ para serem ouvidas
  OrdersModule.configureQueue(app);
  UsersModule.configureQueue(app);

  await app.listen(4001);
}
bootstrap();
