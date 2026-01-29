import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

async function start() {
  await connectDB(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

start();
