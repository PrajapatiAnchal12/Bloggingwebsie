import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // We use the URI from .env file, or a default local MongoDB URI
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogging_db';
        
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        console.error(`💡 TIP: Make sure your MongoDB service is running. If you are on Windows, open MongoDB Compass or check 'Services.msc' for MongoDB.`);
        process.exit(1); 
    }
};

export default connectDB;
