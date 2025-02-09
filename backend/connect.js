import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/url-shortener';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;