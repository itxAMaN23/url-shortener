import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns"; // 1. Import the DNS module

dotenv.config();
const mongoURI = process.env.MONGO_URI;
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
