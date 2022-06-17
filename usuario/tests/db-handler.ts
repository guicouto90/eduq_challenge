import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
 export const connect = async (): Promise<any> => {
  const uri = await mongod.getUri();
  await mongoose.createConnection(uri);
}

/**
 * Drop database, close the connection and stop mongod.
 */
 export const closeDatabase = async (): Promise<any> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async (): Promise<any> => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany;
  }
}

// REF: https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np