import { Injectable, Inject } from '@nestjs/common';
import { MongoService } from '../../databases/mongodb/mongodb.service';
import { config } from 'dotenv';
import { UserDto } from './dto/users.dto';

config();

@Injectable()
export class UsersMongoDBService {
  constructor(
    @Inject(MongoService) private readonly mongooseService: MongoService,
  ) {}

  async saveNewUser(user: UserDto) {
    const userCollection = await this.mongooseService.getCompanyDb(
      'empresa1',
      'users',
    );

    await userCollection.insertOne({
      user: user,
    });
  }
}
