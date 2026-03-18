import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        // Mongoose will automatically create 'verity_db' when you save data
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

export default connectDB;