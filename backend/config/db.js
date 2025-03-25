// config/db.js
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

// Load environment variables from the .env file at the root
configDotenv({ path: "../.env" });

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://mayankkumarverma306:14102003@cluster0.vzu4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

console.log(MONGO_URL);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Optionally disable buffering to get immediate errors:
  // bufferCommands: false,
})
  .then(() => console.log(`✅ MongoDB Connected`))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

export default mongoose;
