import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connectDB(uri) {
  if (!uri) throw Object.assign(new Error("MONGODB_URI not set"), { status: 500 });
  mongoose.set("strictQuery", true);
  if (process.env.USE_INMEMORY_DB === "true" || uri === "memory") {
    const mongod = await MongoMemoryServer.create();
    const memUri = mongod.getUri();
    await mongoose.connect(memUri);
    console.log("MongoDB connected (in-memory)");
    return;
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
