import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Transport } from '@nestjs/microservices';
import { UsersMongoDBService } from './users.mongodb.service';
import { MongoService } from 'databases/mongodb/mongodb.service';
import { MongoDBModule } from 'databases/mongodb/mongodb.module';

@Module({
  imports: [MongoDBModule],
  controllers: [UsersController],
  providers: [UsersService, UsersMongoDBService, MongoService],
})
export class UsersModule {
  static configureQueue(app) {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'users-queue',
      },
    });
    app.startAllMicroservices();
  }
}
