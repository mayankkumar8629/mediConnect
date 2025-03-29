// config/db.js
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

// Load environment variables from the .env file at the root
configDotenv({ path: "../.env" });

const MONGO_URL = process.env.MONGO_URL ;



mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
  .then(() => console.log(`✅ MongoDB Connected`))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

export default mongoose;
