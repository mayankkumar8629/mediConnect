import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });


const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URL; // Use environment variables for configuration
   
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // additional options can go here
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;