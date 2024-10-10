import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { MongoService } from './mongodb.service';
import { config } from 'dotenv';

config();

@Global()
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL)],
  providers: [
    {
      provide: MongoClient,
      useFactory: async () => {
        const client = new MongoClient(process.env.MONGODB_URL); // Instantiate MongoClient with the connection URL
        try {
          await client.connect(); // Connect to MongoDB
        } catch {
          console.log('Erro ao conectar ao banco de dados');
          return null; // Return null or handle the error appropriately
        }
        return client;
      },
    },
    MongoService,
  ],
  exports: [MongooseModule, MongoClient],
})
export class MongoDBModule {}
