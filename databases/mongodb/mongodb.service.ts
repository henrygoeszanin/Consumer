import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';

@Injectable()
export class MongoService {
  constructor(private readonly mongoClient: MongoClient) {}
  private mongoClients: Map<string, MongoClient> = new Map();

  async getCompanyDb(
    companyId: string,
    collectionName: string,
  ): Promise<Collection<any> | null> {
    try {
      // Initialize companyDbUri with a valid URI string
      const companyDbUri = `${process.env.MONGODB_URL}/${companyId}`;

      let mongoClient: MongoClient;

      if (this.mongoClients.has(companyDbUri)) {
        mongoClient = this.mongoClients.get(companyDbUri);
      } else {
        mongoClient = new MongoClient(companyDbUri);
        await mongoClient.connect(); // Ensure the connection is established
        this.mongoClients.set(companyDbUri, mongoClient);
      }

      const db: Db = mongoClient.db(companyId);
      const collection = db.collection(collectionName);
      return collection;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
