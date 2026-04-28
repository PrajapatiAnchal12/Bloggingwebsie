import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an express app
const app = express();

// Middleware (This tells our server to accept JSON data and allow frontend to connect)
app.use(express.json()); 
app.use(cors());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Basic Route (To test if server is working)
app.get('/', (req, res) => {
    res.send("Hello Backend is Running!");
});

// Define PORT (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running beautifully on port ${PORT}`);
});
