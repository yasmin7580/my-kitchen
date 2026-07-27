import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not configured.");
}

const client = globalForMongo.__myKitchenMongoClient ?? new MongoClient(process.env.MONGODB_URI);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__myKitchenMongoClient = client;
}

export const myKitchenDb = client.db("my-kitchen");
